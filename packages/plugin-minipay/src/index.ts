import type { Provider, IAgentRuntime } from "@elizaos/core";
import { createWalletClient, http, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo, celoAlfajores } from "viem/chains";
import * as fs from "node:fs";

const WALLET_DATA_FILE = "celo_wallet_data.txt";

export async function getCeloWalletClient(): Promise<WalletClient> {
    // Validate required environment variables
    const privateKey = process.env.CELO_PRIVATE_KEY;
    const rpcUrl = process.env.CELO_RPC_URL;
    const networkId = process.env.CELO_NETWORK_ID || "alfajores"; // Default to testnet

    if (!privateKey || !rpcUrl) {
        throw new Error("Missing required Celo credentials. Please set CELO_PRIVATE_KEY and CELO_RPC_URL environment variables.");
    }

    // Validate private key format
    if (!privateKey.startsWith('0x')) {
        throw new Error("CELO_PRIVATE_KEY must start with 0x");
    }

    // Select the appropriate chain
    const chain = networkId === "mainnet" ? celo : celoAlfajores;

    try {
        // Create account from private key
        const account = privateKeyToAccount(privateKey as `0x${string}`);
        
        // Create wallet client
        const walletClient = createWalletClient({
            account,
            transport: http(rpcUrl),
            chain,
        });

        // Save wallet info for debugging
        const walletInfo = {
            address: account.address,
            chain: chain.name,
            rpcUrl,
            timestamp: new Date().toISOString(),
        };
        
        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(walletInfo, null, 2));
        
        return walletClient;
    } catch (error) {
        console.error("Failed to initialize Celo wallet client:", error);
        throw new Error(`Failed to initialize Celo wallet client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export const celoWalletProvider: Provider = {
    async get(_runtime: IAgentRuntime): Promise<string | null> {
        try {
            const walletClient = await getCeloWalletClient();
            const address = walletClient.account?.address;
            const chain = walletClient.chain.name;
            
            if (!address) {
                return "Error: No wallet address found";
            }
            
            return `Celo Wallet Address: ${address} (${chain})`;
        } catch (error) {
            console.error("Error in Celo wallet provider:", error);
            return `Error initializing Celo wallet: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
};

export const celoNetworkProvider: Provider = {
    async get(_runtime: IAgentRuntime): Promise<string | null> {
        try {
            const walletClient = await getCeloWalletClient();
            const chain = walletClient.chain;
            
            const networkInfo = {
                name: chain.name,
                id: chain.id,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpcUrls,
                blockExplorers: chain.blockExplorers,
            };
            
            return `Celo Network: ${chain.name} (Chain ID: ${chain.id})
Native Currency: ${chain.nativeCurrency.name} (${chain.nativeCurrency.symbol})
Block Explorer: ${chain.blockExplorers?.default?.url || 'Not available'}`;
        } catch (error) {
            console.error("Error in Celo network provider:", error);
            return `Error getting network info: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
};

export const celoBalanceProvider: Provider = {
    async get(_runtime: IAgentRuntime): Promise<string | null> {
        try {
            const walletClient = await getCeloWalletClient();
            const address = walletClient.account?.address;
            
            if (!address) {
                return "Error: No wallet address found";
            }
            
            // Get native CELO balance
            const balance = await walletClient.getBalance({ address });
            const celoBalance = Number(balance) / 10**18; // Convert from wei to CELO
            
            return `CELO Balance: ${celoBalance.toFixed(4)} CELO`;
        } catch (error) {
            console.error("Error in Celo balance provider:", error);
            return `Error getting balance: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    },
};

// Helper function to validate Celo address
export function isValidCeloAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Helper function to get chain configuration
export function getCeloChainConfig(networkId: string = "alfajores") {
    return networkId === "mainnet" ? celo : celoAlfajores;
}

// Helper function to format token amounts
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
    return (Number(amount) / 10**decimals).toFixed(4);
}

// Helper function to parse token amounts
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
    const numAmount = parseFloat(amount);
    return BigInt(Math.floor(numAmount * 10**decimals));
}