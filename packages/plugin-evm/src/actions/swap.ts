import type { HandlerCallback, IAgentRuntime, Memory, State } from '@elizaos/core';
import { ModelType, composePromptFromState, elizaLogger, parseKeyValueXml } from '@elizaos/core';
import { type Address, type Hex } from 'viem';
import { type WalletProvider, initWalletProvider } from '../providers/wallet';
import { swapTemplate } from '../templates';
import type { SwapParams, Transaction } from '../types';

// Goat SDK imports
import { getOnChainTools } from '@goat-sdk/core';
import { viem } from '@goat-sdk/wallet-viem';
import { sendETH, erc20, uniswap } from '@goat-sdk/plugin-uniswap';

export { swapTemplate };

const CELO_SUPPORTED_CHAINS = ['celo', 'alfajores'];

// Define Celo tokens
const CELO = {
  symbol: 'CELO',
  name: 'Celo',
  decimals: 18,
  address: '0x471EcE3750Da237f93B8E339c536989b8978a438', // CELO token address on Celo
};

const cUSD = {
  symbol: 'cUSD',
  name: 'Celo Dollar',
  decimals: 18,
  address: '0x765DE816845861e75A25fCA122bb6898B8B1282a', // cUSD token address on Celo
};

export class SwapAction {
  constructor(private walletProvider: WalletProvider) {}

  private async getOnChainTools(chain: string) {
    const walletClient = this.walletProvider.getWalletClient(chain);
    
    // Get your onchain tools for your wallet
    const tools = await getOnChainTools({
      wallet: viem(walletClient),
      plugins: [
        sendETH(), // Enable CELO transfers (native token)
        erc20({ tokens: [cUSD, CELO] }), // Enable Celo token operations
        uniswap({
          baseUrl: process.env.UNISWAP_BASE_URL as string,
          apiKey: process.env.UNISWAP_API_KEY as string,
        }),
      ],
    });

    return tools;
  }

  private getTokenConfig(tokenSymbolOrAddress: string) {
    const symbol = tokenSymbolOrAddress.toLowerCase();
    
    // Check if it's already an address
    if (tokenSymbolOrAddress.startsWith('0x') && tokenSymbolOrAddress.length === 42) {
      // Try to match known tokens by address
      if (tokenSymbolOrAddress.toLowerCase() === CELO.address.toLowerCase()) {
        return CELO;
      }
      if (tokenSymbolOrAddress.toLowerCase() === cUSD.address.toLowerCase()) {
        return cUSD;
      }
      // Return a generic token config for unknown addresses
      return {
        symbol: 'UNKNOWN',
        name: 'Unknown Token',
        decimals: 18,
        address: tokenSymbolOrAddress,
      };
    }
    
    // Handle native CELO
    if (symbol === 'celo') {
      return {
        symbol: 'CELO',
        name: 'Celo Native',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000', // Native token
      };
    }
    
    // Handle known tokens
    if (symbol === 'cusd') {
      return cUSD;
    }
    
    throw new Error(`Token ${tokenSymbolOrAddress} not supported. Supported tokens: CELO, cUSD`);
  }

  async swap(params: SwapParams): Promise<Transaction> {
    const { chain, fromToken, toToken, amount } = params;
    
    if (!CELO_SUPPORTED_CHAINS.includes(chain)) {
      throw new Error('Only Celo mainnet and Alfajores testnet are supported for swaps.');
    }

    const walletClient = this.walletProvider.getWalletClient(chain);
    const [fromAddress] = await walletClient.getAddresses();

    // Get token configurations
    const fromTokenConfig = this.getTokenConfig(fromToken);
    const toTokenConfig = this.getTokenConfig(toToken);

    // Get onchain tools
    const tools = await this.getOnChainTools(chain);

    try {
      // Find the appropriate swap tool
      const swapTool = tools.find(tool => 
        tool.name === 'swap_tokens' || 
        tool.name === 'uniswap_swap' ||
        tool.name.includes('swap')
      );

      if (!swapTool) {
        throw new Error('Swap tool not found in available tools');
      }

      // Prepare swap parameters based on the tool's expected format
      const swapParams = {
        tokenIn: fromTokenConfig.address === '0x0000000000000000000000000000000000000000' 
          ? 'ETH' // For native CELO
          : fromTokenConfig.address,
        tokenOut: toTokenConfig.address === '0x0000000000000000000000000000000000000000'
          ? 'ETH' // For native CELO
          : toTokenConfig.address,
        amountIn: amount,
        recipient: fromAddress,
        slippageTolerancePercentage: 0.5, // 0.5% slippage tolerance
      };

      elizaLogger.info('Executing swap with params:', swapParams);

      // Execute the swap using the tool
      const result = await swapTool.execute(swapParams);

      if (!result.success) {
        throw new Error(`Swap failed: ${result.error || 'Unknown error'}`);
      }

      // Extract transaction details from result
      const txHash = result.transactionHash || result.hash;
      
      if (!txHash) {
        throw new Error('No transaction hash returned from swap');
      }

      return {
        hash: txHash,
        from: fromAddress,
        to: result.to as Address,
        value: BigInt(result.value || '0'),
        data: result.data as Hex,
        chainId: walletClient.chain.id,
      };

    } catch (error) {
      elizaLogger.error('Swap execution failed:', error);
      throw error;
    }
  }
}

const buildSwapDetails = async (
  state: State,
  _message: Memory,
  runtime: IAgentRuntime,
  wp: WalletProvider
): Promise<SwapParams> => {
  const chains = wp.getSupportedChains();
  const balances = await wp.getWalletBalances();
  
  state = await runtime.composeState(_message, ['RECENT_MESSAGES'], true);
  state.supportedChains = chains.join(' | ');
  state.chainBalances = Object.entries(balances)
    .map(([chain, balance]) => {
      const chainConfig = wp.getChainConfigs(chain as any);
      return `${chain}: ${balance} ${chainConfig.nativeCurrency.symbol}`;
    })
    .join(', ');

  const context = composePromptFromState({
    state,
    template: swapTemplate,
  });

  const xmlResponse = await runtime.useModel(ModelType.TEXT_LARGE, {
    prompt: context,
  });

  const parsedXml = parseKeyValueXml(xmlResponse);
  
  if (!parsedXml) {
    throw new Error('Failed to parse XML response from LLM for swap details.');
  }

  let swapDetails: SwapParams = {
    fromToken: parsedXml.inputToken,
    toToken: parsedXml.outputToken,
    amount: parsedXml.amount,
    chain: parsedXml.chain,
  };

  // Normalize chain name
  if (swapDetails.chain) {
    const normalizedChainName = swapDetails.chain.toLowerCase();
    if (!CELO_SUPPORTED_CHAINS.includes(normalizedChainName)) {
      throw new Error('Only Celo mainnet and Alfajores testnet are supported for swaps.');
    }
    swapDetails.chain = normalizedChainName as any;
  }

  return swapDetails;
};

export const swapAction = {
  name: 'CELO_SWAP_TOKENS',
  description: 'Swap tokens on Celo mainnet or Alfajores testnet using Uniswap via Goat SDK',
  handler: async (
    runtime: IAgentRuntime,
    _message: Memory,
    state?: State,
    _options?: any,
    callback?: HandlerCallback
  ) => {
    const walletProvider = await initWalletProvider(runtime);
    const action = new SwapAction(walletProvider);

    try {
      if (!state) {
        state = await runtime.composeState(_message);
      }

      const swapOptions = await buildSwapDetails(state, _message, runtime, walletProvider);
      const swapResp = await action.swap(swapOptions);

      if (callback) {
        callback({
          text: `Successfully swapped ${swapOptions.amount} ${swapOptions.fromToken} for ${swapOptions.toToken} on ${swapOptions.chain}\nTransaction Hash: ${swapResp.hash}`,
          content: {
            success: true,
            hash: swapResp.hash,
            chain: swapOptions.chain,
            fromToken: swapOptions.fromToken,
            toToken: swapOptions.toToken,
            amount: swapOptions.amount,
          },
        });
      }

      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      elizaLogger.error('Swap action failed:', errorMessage);
      
      if (callback) {
        callback({
          text: `Swap failed: ${errorMessage}`,
          content: { success: false, error: errorMessage },
        });
      }

      return false;
    }
  },
  template: swapTemplate,
  validate: async (runtime: IAgentRuntime) => {
    const privateKey = runtime.getSetting('EVM_PRIVATE_KEY');
    const uniswapApiKey = runtime.getSetting('UNISWAP_API_KEY');
    const uniswapBaseUrl = runtime.getSetting('UNISWAP_BASE_URL');
    
    return (
      typeof privateKey === 'string' && 
      privateKey.startsWith('0x') &&
      typeof uniswapApiKey === 'string' &&
      typeof uniswapBaseUrl === 'string'
    );
  },
  examples: [
    [
      {
        name: 'user',
        user: 'user',
        content: {
          text: 'Swap 1 cUSD for CELO on Celo',
          action: 'TOKEN_SWAP',
        },
      },
    ],
    [
      {
        name: 'user',
        user: 'user',
        content: {
          text: 'Exchange 0.5 CELO for cUSD on Alfajores',
          action: 'TOKEN_SWAP',
        },
      },
    ],
  ],
  similes: ['TOKEN_SWAP', 'EXCHANGE_TOKENS', 'TRADE_TOKENS'],
};