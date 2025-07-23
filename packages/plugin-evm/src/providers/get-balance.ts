import {
  IAgentRuntime,
  Memory,
  Provider,
  ProviderResult,
  ModelType,
  parseKeyValueXml,
} from '@elizaos/core';
import { formatUnits, parseAbi, type Address } from 'viem';
import { initWalletProvider } from './wallet';
import type { SupportedChain } from '../types';

// Goat SDK imports (TODO: update with actual API)
// import { ERC20Plugin } from '@goat-sdk/plugin-erc20';

const CELO_SUPPORTED_CHAINS = ['celo', 'alfajores'];

const tokenBalanceTemplate = `Extract the token ticker and blockchain from the user's message.

User message: "{{userMessage}}"

Return the token symbol and chain name in this format:
<response>
<token>TOKEN_SYMBOL</token>
<chain>CHAIN_NAME</chain>
</response>

If no token is mentioned or it's not a balance inquiry, return:
<response>
<error>Not a token balance request</error>
</response>`;

/**
 * Token balance provider for Celo mainnet and Alfajores using Goat SDK
 */
export const tokenBalanceProvider: Provider = {
  name: 'CELO_TOKEN_BALANCE',
  description:
    'Token balance for CELO and ERC20 tokens (cUSD, etc.) on Celo mainnet or Alfajores',
  dynamic: true,
  get: async (runtime: IAgentRuntime, message: Memory): Promise<ProviderResult> => {
    try {
      // Extract token and chain using XML format
      const prompt = tokenBalanceTemplate.replace('{{userMessage}}', message.content.text || '');
      const response = await runtime.useModel(ModelType.TEXT_SMALL, {
        prompt,
        maxTokens: 100,
      });
      const parsed = parseKeyValueXml(response);
      if (!parsed || parsed.error || !parsed.token || !parsed.chain) {
        return { text: '', data: {}, values: {} };
      }
      const token = parsed.token.toUpperCase();
      const chain = parsed.chain.toLowerCase();
      if (!CELO_SUPPORTED_CHAINS.includes(chain)) {
        return { text: 'Only Celo mainnet and Alfajores are supported.', data: {}, values: {} };
      }
      // Get wallet provider and check chain support
      const walletProvider = await initWalletProvider(runtime);
      const chainConfig = walletProvider.getChainConfigs(chain as SupportedChain);
      const address = walletProvider.getAddress();
      // TODO: Use Goat SDK to resolve token address and decimals
      // const tokenData = await ERC20Plugin.resolveToken({ symbol: token, chain });
      // if (!tokenData?.address) {
      //   return { text: `Token ${token} not found on ${chain}`, data: {}, values: {} };
      // }
      // const decimals = tokenData.decimals || 18;
      // const tokenAddress = tokenData.address;
      // For now, fallback to native CELO only
      let decimals = 18;
      let tokenAddress = '0x0000000000000000000000000000000000000000';
      if (token !== 'CELO') {
        // TODO: Use Goat SDK for ERC20
        return { text: 'ERC20 token balance via Goat SDK not implemented.', data: {}, values: {} };
      }
      // Get balance
      const publicClient = walletProvider.getPublicClient(chain as SupportedChain);
      let balance;
      if (token === 'CELO') {
        balance = await publicClient.getBalance({ address });
      } else {
        // ERC20: would use readContract for balanceOf
        balance = 0n;
      }
      const formattedBalance = formatUnits(balance, decimals);
      return {
        text: `${token} balance on ${chain} for ${address}: ${formattedBalance}`,
        data: {
          token,
          chain,
          balance: formattedBalance,
          decimals,
          address: tokenAddress,
          hasBalance: parseFloat(formattedBalance) > 0,
        },
        values: {
          token,
          chain,
          balance: formattedBalance,
          hasBalance: (parseFloat(formattedBalance) > 0).toString(),
        },
      };
    } catch (error) {
      return { text: '', data: {}, values: {} };
    }
  },
};
