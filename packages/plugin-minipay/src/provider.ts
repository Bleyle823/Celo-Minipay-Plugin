import type { Provider, IAgentRuntime } from "@elizaos/core";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo, celoAlfajores } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { erc20, USDC } from "@goat-sdk/plugin-erc20";
import { erc721 } from "@goat-sdk/plugin-erc721";
import { sendETH } from "@goat-sdk/wallet-evm";
import * as fs from "node:fs";

const WALLET_DATA_FILE = "celo_wallet_data.txt";

interface CeloWalletConfig {
    privateKey: string;
    rpcUrl: string;
    networkId: 'celo' | 'alfajores';
}

export class CeloWalletClient {
    private walletClient: any;
    private config: CeloWalletConfig;
    private tools: any;

    constructor(config: CeloWalletConfig) {
        this.config = config;
        this.initializeWallet();
    }

    private async initializeWallet() {
        const account = privateKeyToAccount(this.config.privateKey as `0x${string}`);
        const chain = this.config.networkId === 'celo' ? celo : celoAlfajores;
        
        this.walletClient = createWalletClient({
            account: account,
            transport: http(this.config.rpcUrl),
            chain: chain,
        });

        // Initialize GOAT SDK tools
        this.tools = await getOnChainTools({
            wallet: viem(this.walletClient),
            plugins: [
                sendETH(), // For sending CELO (native token)
                erc20({ 
                    tokens: [
                        {
                            symbol: "cUSD",
                            name: "Celo Dollar",
                            decimals: 18,
                            address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1" // Celo mainnet cUSD
                        },
                        {
                            symbol: "cEUR",
                            name: "Celo Euro",
                            decimals: 18,
                            address: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" // Celo mainnet cEUR
                        },
                        {
                            symbol: "cREAL",
                            name: "Celo Real",
                            decimals: 18,
                            address: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787" // Celo mainnet cREAL
                        }
                    ]
                }),
                erc721(), // For NFT operations
                // Custom Celo-specific tools
                this.createSendCeloTool(),
                this.createMintNFTTool(),
                this.createTokenSwapTool(),
                this.createGetBalanceTool()
            ],
        });
    }

    private createSendCeloTool() {
        return {
            name: "send_celo",
            description: "Send CELO tokens to a specified address",
            async execute({ recipientAddress, amount }: { recipientAddress: string, amount: string }) {
                try {
                    const hash = await this.walletClient.sendTransaction({
                        to: recipientAddress as `0x${string}`,
                        value: parseEther(amount),
                        account: this.walletClient.account,
                    });
                    return `Successfully sent ${amount} CELO to ${recipientAddress}. Transaction hash: ${hash}`;
                } catch (error) {
                    console.error("Error sending CELO:", error);
                    return `Failed to send CELO: ${error.message}`;
                }
            }
        };
    }

    private createMintNFTTool() {
        return {
            name: "mint_nft",
            description: "Mint an NFT to a specified address",
            async execute({ recipientAddress, contractAddress, metadata }: { 
                recipientAddress: string, 
                contractAddress: string,
                metadata?: any 
            }) {
                try {
                    // Generic NFT minting ABI for mint function
                    const nftAbi = [
                        {
                            "inputs": [
                                {"internalType": "address", "name": "to", "type": "address"},
                                {"internalType": "string", "name": "uri", "type": "string"}
                            ],
                            "name": "mint",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }
                    ];

                    const metadataUri = metadata ? JSON.stringify(metadata) : "";
                    
                    const hash = await this.walletClient.writeContract({
                        address: contractAddress as `0x${string}`,
                        abi: nftAbi,
                        functionName: 'mint',
                        args: [recipientAddress, metadataUri],
                        account: this.walletClient.account,
                        gas: 2000000n,
                    });

                    return `Successfully minted NFT to ${recipientAddress}. Transaction hash: ${hash}`;
                } catch (error) {
                    console.error("Error minting NFT:", error);
                    return `Failed to mint NFT: ${error.message}`;
                }
            }
        };
    }

    private createTokenSwapTool() {
        return {
            name: "swap_tokens",
            description: "Swap tokens on Celo network",
            async execute({ fromToken, toToken, amount }: { 
                fromToken: string, 
                toToken: string, 
                amount: string 
            }) {
                try {
                    // This is a simplified swap implementation
                    // In practice, you would integrate with Ubeswap or other Celo DEX
                    console.log(`Swapping ${amount} ${fromToken} for ${toToken}`);
                    return `Token swap initiated: ${amount} ${fromToken} -> ${toToken}`;
                } catch (error) {
                    console.error("Error swapping tokens:", error);
                    return `Failed to swap tokens: ${error.message}`;
                }
            }
        };
    }

    private createGetBalanceTool() {
        return {
            name: "get_balance",
            description: "Get balance of CELO or tokens",
            async execute({ tokenAddress }: { tokenAddress?: string }) {
                try {
                    if (!tokenAddress) {
                        // Get CELO balance
                        const balance = await this.walletClient.getBalance({
                            address: this.walletClient.account.address,
                        });
                        return `CELO balance: ${balance} wei`;
                    } else {
                        // Get ERC20 token balance
                        const erc20Abi = [
                            {
                                "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
                                "name": "balanceOf",
                                "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                                "stateMutability": "view",
                                "type": "function"
                            }
                        ];

                        const balance = await this.walletClient.readContract({
                            address: tokenAddress as `0x${string}`,
                            abi: erc20Abi,
                            functionName: 'balanceOf',
                            args: [this.walletClient.account.address],
                        });

                        return `Token balance: ${balance}`;
                    }
                } catch (error) {
                    console.error("Error getting balance:", error);
                    return `Failed to get balance: ${error.message}`;
                }
            }
        };
    }

    public getWalletAddress(): string {
        return this.walletClient.account.address;
    }

    public getTools() {
        return this.tools;
    }

    public async saveWalletData() {
        try {
            const walletData = {
                address: this.walletClient.account.address,
                network: this.config.networkId,
                timestamp: new Date().toISOString()
            };
            fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(walletData, null, 2));
        } catch (error) {
            console.error("Error saving wallet data:", error);
        }
    }
}

export async function getCeloClient(runtime: IAgentRuntime): Promise<CeloWalletClient> {
    const privateKey = runtime.getSetting("CELO_PRIVATE_KEY");
    const rpcUrl = runtime.getSetting("CELO_RPC_URL") || "https://alfajores-forno.celo-testnet.org";
    const networkId = runtime.getSetting("CELO_NETWORK") || "alfajores";

    if (!privateKey) {
        throw new Error("Missing required CELO_PRIVATE_KEY setting");
    }

    const config: CeloWalletConfig = {
        privateKey,
        rpcUrl,
        networkId: networkId as 'celo' | 'alfajores'
    };

    const client = new CeloWalletClient(config);
    await client.saveWalletData();
    
    return client;
}

export const celoProvider: Provider = {
    async get(runtime: IAgentRuntime): Promise<string | null> {
        try {
            const client = await getCeloClient(runtime);
            const address = client.getWalletAddress();
            return `Celo Wallet Address: ${address}`;
        } catch (error) {
            console.error("Error in Celo provider:", error);
            return `Error initializing Celo wallet: ${error.message}`;
        }
    },
};