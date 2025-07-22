import {
  type Action,
  type HandlerCallback,
  type IAgentRuntime,
  type Memory,
  ModelType,
  type State,
  parseKeyValueXml,
  composePromptFromState,
  elizaLogger,
} from '@elizaos/core';
import {
  type Hex,
  formatEther,
  parseEther,
  parseAbi,
  encodeFunctionData,
  parseUnits,
  type Address,
} from 'viem';
import { type WalletProvider, initWalletProvider } from '../providers/wallet';
import { transferTemplate } from '../templates';
import type { Transaction, TransferParams } from '../types';

// Goat SDK imports (TODO: update with actual API)
// import { ERC20Plugin } from '@goat-sdk/plugin-erc20';

const CELO_SUPPORTED_CHAINS = ['celo', 'alfajores'];

export class TransferAction {
  constructor(private walletProvider: WalletProvider) {}

  private async resolveTokenAddress(tokenSymbolOrAddress: string, chain: string): Promise<string> {
    // Use Goat SDK ERC20Plugin to resolve token address (TODO: update with actual API)
    if (tokenSymbolOrAddress.startsWith('0x') && tokenSymbolOrAddress.length === 42) {
      return tokenSymbolOrAddress;
    }
    // Native CELO
    if (tokenSymbolOrAddress.toLowerCase() === 'celo') {
      return '0x0000000000000000000000000000000000000000';
    }
    // cUSD or other ERC20
    // TODO: Replace with Goat SDK call
    // const token = await ERC20Plugin.resolveToken({ symbol: tokenSymbolOrAddress, chain });
    // if (!token?.address) {
    //   throw new Error(`Token ${tokenSymbolOrAddress} not found on ${chain}`);
    // }
    // return token.address;
    throw new Error('Token resolution via Goat SDK not implemented.');
  }

  async transfer(params: TransferParams): Promise<Transaction> {
    const { fromChain, toAddress, amount, token } = params;
    if (!CELO_SUPPORTED_CHAINS.includes(fromChain)) {
      throw new Error('Only Celo mainnet and Alfajores testnet are supported for transfers.');
    }
    const walletClient = this.walletProvider.getWalletClient(fromChain);
    if (!walletClient.account) {
      throw new Error('Wallet account is not available');
    }
    // Native or ERC20 transfer
    let to: Address;
    let value: bigint;
    let data: Hex;
    if (
      token &&
      token !== 'null' &&
      token.toLowerCase() !== 'celo' &&
      token !== '0x0000000000000000000000000000000000000000'
    ) {
      // ERC20 transfer
      // TODO: Use Goat SDK to resolve token address and decimals
      const tokenAddress = await this.resolveTokenAddress(token, fromChain);
      // TODO: Use Goat SDK to get decimals
      const decimals = 18;
      const amountInTokenUnits = parseUnits(amount, decimals);
      const transferData = encodeFunctionData({
        abi: parseAbi(['function transfer(address to, uint256 amount)']),
        functionName: 'transfer',
        args: [toAddress, amountInTokenUnits],
      });
      to = tokenAddress as Address;
      value = 0n;
      data = transferData;
    } else {
      // Native CELO transfer
      to = toAddress;
      value = parseEther(amount);
      data = params.data || ('0x' as Hex);
    }
    // Send transaction
    const hash = await walletClient.sendTransaction({
      account: walletClient.account,
      to,
      value,
      data,
      chain: walletClient.chain,
    });
    return {
      hash,
      from: walletClient.account.address,
      to: toAddress,
      value: value,
      data: data,
    };
  }
}

const buildTransferDetails = async (
  state: State,
  _message: Memory,
  runtime: IAgentRuntime,
  wp: WalletProvider
): Promise<TransferParams> => {
  const chains = wp.getSupportedChains();
  const balances = await wp.getWalletBalances();
  state.chainBalances = Object.entries(balances)
    .map(([chain, balance]) => {
      const chainConfig = wp.getChainConfigs(chain as any);
      return `${chain}: ${balance} ${chainConfig.nativeCurrency.symbol}`;
    })
    .join(', ');
  state = await runtime.composeState(_message, ['RECENT_MESSAGES'], true);
  state.supportedChains = chains.join(' | ');
  const context = composePromptFromState({
    state,
    template: transferTemplate,
  });
  const xmlResponse = await runtime.useModel(ModelType.TEXT_SMALL, {
    prompt: context,
  });
  const parsedXml = parseKeyValueXml(xmlResponse);
  if (!parsedXml) {
    throw new Error('Failed to parse XML response from LLM for transfer details.');
  }
  const transferDetails = parsedXml as unknown as TransferParams;
  // Normalize chain name
  const normalizedChainName = transferDetails.fromChain.toLowerCase();
  if (!CELO_SUPPORTED_CHAINS.includes(normalizedChainName)) {
    throw new Error(
      'The chain ' +
        transferDetails.fromChain +
        ' not configured yet. Only Celo mainnet and Alfajores are supported.'
    );
  }
  transferDetails.fromChain = normalizedChainName as any;
  return transferDetails;
};

export const transferAction: Action = {
  name: 'CELO_TRANSFER_TOKENS',
  description:
    'Transfer native CELO or ERC20 tokens (cUSD, etc.) between addresses on Celo mainnet or Alfajores',
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State | undefined,
    _options: any,
    callback?: HandlerCallback
  ) => {
    if (!state) {
      state = (await runtime.composeState(message)) as State;
    }
    const walletProvider = await initWalletProvider(runtime);
    const action = new TransferAction(walletProvider);
    const paramOptions = await buildTransferDetails(state, message, runtime, walletProvider);
    try {
      const transferResp = await action.transfer(paramOptions);
      const tokenSymbol = paramOptions.token ? paramOptions.token.toUpperCase() : 'CELO';
      if (callback) {
        callback({
          text: `Successfully transferred ${paramOptions.amount} ${tokenSymbol} to ${paramOptions.toAddress}\nTransaction Hash: ${transferResp.hash}`,
          content: {
            success: true,
            hash: transferResp.hash,
            amount: paramOptions.amount,
            token: tokenSymbol,
            recipient: transferResp.to,
            chain: paramOptions.fromChain,
          },
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (callback) {
        callback({
          text: `Error transferring tokens: ${errorMessage}`,
          content: { error: errorMessage },
        });
      }
    }
    return;
  },
  validate: async (runtime: IAgentRuntime) => {
    const privateKey = runtime.getSetting('EVM_PRIVATE_KEY');
    return typeof privateKey === 'string' && privateKey.startsWith('0x');
  },
  examples: [
    [
      {
        name: 'assistant',
        content: {
          text: "I'll help you transfer 1 CELO to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          action: 'CELO_TRANSFER_TOKENS',
        },
      },
      {
        name: 'user',
        content: {
          text: 'Transfer 1 CELO to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          action: 'CELO_TRANSFER_TOKENS',
        },
      },
    ],
  ],
  similes: ['CELO_TRANSFER', 'CELO_SEND_TOKENS', 'CELO_TOKEN_TRANSFER', 'CELO_MOVE_TOKENS'],
};
