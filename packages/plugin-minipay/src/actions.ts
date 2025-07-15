import {
    type Action,
    generateText,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    composeContext,
    generateObject,
} from "@elizaos/core";
import type { WalletClient } from "viem";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { openai } from "@ai-sdk/openai";
import { generateText as aiGenerateText } from "ai";

type GetCeloGoatActionsParams = {
    getWalletClient: () => Promise<WalletClient>;
    openaiApiKey: string;
};

/**
 * Get all Celo GOAT actions
 */
export async function getCeloGoatActions({
    getWalletClient,
    openaiApiKey,
}: GetCeloGoatActionsParams): Promise<Action[]> {
    const actions: Action[] = [
        {
            name: "SWAP_TOKENS",
            description: "Swap tokens on Celo using Uniswap. Supports swapping between CELO, cUSD, cEUR, and other ERC20 tokens.",
            similes: ["exchange", "trade", "convert", "swap tokens", "trade tokens"],
            validate: async () => true,
            handler: async (
                runtime: IAgentRuntime,
                message: Memory,
                state: State | undefined,
                _options?: Record<string, unknown>,
                callback?: HandlerCallback
            ): Promise<boolean> => {
                try {
                    const walletClient = await getWalletClient();
                    const tools = await getSwapTools(walletClient);
                    
                    let currentState = state ?? (await runtime.composeState(message));
                    currentState = await runtime.updateRecentMessageState(currentState);
                    
                    const swapContext = composeSwapContext(currentState);
                    const result = await executeSwapAction(tools, swapContext, openaiApiKey);
                    
                    const responseContext = composeSwapResponseContext(result, currentState);
                    const response = await generateResponse(runtime, responseContext);
                    
                    callback?.({ text: response, content: result });
                    return true;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    callback?.({
                        text: `Error executing token swap: ${errorMessage}`,
                        content: { error: errorMessage },
                    });
                    return false;
                }
            },
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Swap 10 cUSD for CELO" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll swap 10 cUSD for CELO for you. Let me process this transaction..." },
                    },
                ],
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Exchange 5 CELO for cEUR" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll exchange 5 CELO for cEUR. Processing the swap now..." },
                    },
                ],
            ],
        },
        {
            name: "SEND_TOKEN",
            description: "Send native CELO or ERC20 tokens to another address on the Celo network.",
            similes: ["transfer", "send", "pay", "transfer tokens", "send tokens"],
            validate: async () => true,
            handler: async (
                runtime: IAgentRuntime,
                message: Memory,
                state: State | undefined,
                _options?: Record<string, unknown>,
                callback?: HandlerCallback
            ): Promise<boolean> => {
                try {
                    const walletClient = await getWalletClient();
                    const tools = await getSendTools(walletClient);
                    
                    let currentState = state ?? (await runtime.composeState(message));
                    currentState = await runtime.updateRecentMessageState(currentState);
                    
                    const sendContext = composeSendContext(currentState);
                    const result = await executeSendAction(tools, sendContext, openaiApiKey);
                    
                    const responseContext = composeSendResponseContext(result, currentState);
                    const response = await generateResponse(runtime, responseContext);
                    
                    callback?.({ text: response, content: result });
                    return true;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    callback?.({
                        text: `Error sending tokens: ${errorMessage}`,
                        content: { error: errorMessage },
                    });
                    return false;
                }
            },
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Send 1 CELO to 0x1234567890123456789012345678901234567890" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll send 1 CELO to that address. Processing the transaction..." },
                    },
                ],
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Transfer 50 cUSD to 0xabcdef1234567890abcdef1234567890abcdef12" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll transfer 50 cUSD to that address. Executing the transfer now..." },
                    },
                ],
            ],
        },
        {
            name: "MINT_NFT",
            description: "Mint NFTs on the Celo blockchain. Can create and deploy ERC721 contracts or mint to existing contracts.",
            similes: ["create nft", "mint nft", "generate nft", "create token", "mint token"],
            validate: async () => true,
            handler: async (
                runtime: IAgentRuntime,
                message: Memory,
                state: State | undefined,
                _options?: Record<string, unknown>,
                callback?: HandlerCallback
            ): Promise<boolean> => {
                try {
                    const walletClient = await getWalletClient();
                    const tools = await getMintTools(walletClient);
                    
                    let currentState = state ?? (await runtime.composeState(message));
                    currentState = await runtime.updateRecentMessageState(currentState);
                    
                    const mintContext = composeMintContext(currentState);
                    const result = await executeMintAction(tools, mintContext, openaiApiKey);
                    
                    const responseContext = composeMintResponseContext(result, currentState);
                    const response = await generateResponse(runtime, responseContext);
                    
                    callback?.({ text: response, content: result });
                    return true;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    callback?.({
                        text: `Error minting NFT: ${errorMessage}`,
                        content: { error: errorMessage },
                    });
                    return false;
                }
            },
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Mint an NFT with metadata 'My Cool NFT'" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll mint an NFT for you with that metadata. Creating the NFT now..." },
                    },
                ],
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Create a new NFT collection called 'Celo Art'" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll create a new NFT collection called 'Celo Art'. Deploying the contract..." },
                    },
                ],
            ],
        },
        {
            name: "CHECK_BALANCE",
            description: "Check token balances for CELO and ERC20 tokens on the Celo network.",
            similes: ["balance", "check balance", "wallet balance", "token balance"],
            validate: async () => true,
            handler: async (
                runtime: IAgentRuntime,
                message: Memory,
                state: State | undefined,
                _options?: Record<string, unknown>,
                callback?: HandlerCallback
            ): Promise<boolean> => {
                try {
                    const walletClient = await getWalletClient();
                    const tools = await getBalanceTools(walletClient);
                    
                    let currentState = state ?? (await runtime.composeState(message));
                    currentState = await runtime.updateRecentMessageState(currentState);
                    
                    const balanceContext = composeBalanceContext(currentState);
                    const result = await executeBalanceAction(tools, balanceContext, openaiApiKey);
                    
                    const responseContext = composeBalanceResponseContext(result, currentState);
                    const response = await generateResponse(runtime, responseContext);
                    
                    callback?.({ text: response, content: result });
                    return true;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    callback?.({
                        text: `Error checking balance: ${errorMessage}`,
                        content: { error: errorMessage },
                    });
                    return false;
                }
            },
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: { text: "What's my CELO balance?" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "Let me check your CELO balance..." },
                    },
                ],
                [
                    {
                        user: "{{user1}}",
                        content: { text: "Check my cUSD and cEUR balances" },
                    },
                    {
                        user: "{{agentName}}",
                        content: { text: "I'll check your cUSD and cEUR balances for you..." },
                    },
                ],
            ],
        },
    ];

    return actions;
}

// Helper functions for getting tools
async function getSwapTools(walletClient: WalletClient) {
    const { viem } = await import("@goat-sdk/wallet-viem");
    const { sendETH } = await import("@goat-sdk/wallet-evm");
    const { cUSD, CELO, cEUR, erc20 } = await import("@goat-sdk/plugin-erc20");
    const { uniswap } = await import("@goat-sdk/plugin-uniswap");
    
    return await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            sendETH(),
            erc20({ tokens: [cUSD, CELO, cEUR] }),
            uniswap({
                baseUrl: process.env.UNISWAP_BASE_URL || "https://api.uniswap.org",
                apiKey: process.env.UNISWAP_API_KEY || "",
            }),
        ],
    });
}

async function getSendTools(walletClient: WalletClient) {
    const { viem } = await import("@goat-sdk/wallet-viem");
    const { sendETH } = await import("@goat-sdk/wallet-evm");
    const { cUSD, CELO, cEUR, erc20 } = await import("@goat-sdk/plugin-erc20");
    
    return await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            sendETH(),
            erc20({ tokens: [cUSD, CELO, cEUR] }),
        ],
    });
}

async function getMintTools(walletClient: WalletClient) {
    const { viem } = await import("@goat-sdk/wallet-viem");
    const { erc721 } = await import("@goat-sdk/plugin-erc721");
    
    return await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            erc721(),
        ],
    });
}

async function getBalanceTools(walletClient: WalletClient) {
    const { viem } = await import("@goat-sdk/wallet-viem");
    const { sendETH } = await import("@goat-sdk/wallet-evm");
    const { cUSD, CELO, cEUR, erc20 } = await import("@goat-sdk/plugin-erc20");
    
    return await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            sendETH(),
            erc20({ tokens: [cUSD, CELO, cEUR] }),
        ],
    });
}

// Context composition functions
function composeSwapContext(state: State): string {
    const contextTemplate = `{{recentMessages}}

Based on the recent messages, extract the swap parameters. The user wants to swap tokens on Celo.
Look for:
- Source token (what they want to swap from)
- Destination token (what they want to swap to)  
- Amount to swap
- Any slippage preferences

Common Celo tokens: CELO (native), cUSD, cEUR, cREAL
`;
    return composeContext({ state, template: contextTemplate });
}

function composeSendContext(state: State): string {
    const contextTemplate = `{{recentMessages}}

Based on the recent messages, extract the send parameters. The user wants to send tokens on Celo.
Look for:
- Token type (CELO, cUSD, cEUR, etc.)
- Amount to send
- Recipient address (must be valid Ethereum address)
- Any additional instructions

Ensure the recipient address is a valid Ethereum address starting with 0x.
`;
    return composeContext({ state, template: contextTemplate });
}

function composeMintContext(state: State): string {
    const contextTemplate = `{{recentMessages}}

Based on the recent messages, extract the NFT minting parameters. The user wants to mint an NFT on Celo.
Look for:
- NFT name or title
- Description or metadata
- Image URL or IPFS hash (if provided)
- Collection name (if creating new collection)
- Recipient address (defaults to sender if not specified)
`;
    return composeContext({ state, template: contextTemplate });
}

function composeBalanceContext(state: State): string {
    const contextTemplate = `{{recentMessages}}

Based on the recent messages, determine what token balances to check. The user wants to check balances on Celo.
Look for:
- Specific tokens mentioned (CELO, cUSD, cEUR, etc.)
- If no specific tokens mentioned, check all major Celo tokens
- Address to check (defaults to wallet address if not specified)
`;
    return composeContext({ state, template: contextTemplate });
}

// Action execution functions
async function executeSwapAction(tools: any, context: string, openaiApiKey: string): Promise<any> {
    const result = await aiGenerateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 10,
        prompt: context,
    });
    
    return {
        success: true,
        response: result.text,
        toolResults: result.toolResults,
    };
}

async function executeSendAction(tools: any, context: string, openaiApiKey: string): Promise<any> {
    const result = await aiGenerateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 10,
        prompt: context,
    });
    
    return {
        success: true,
        response: result.text,
        toolResults: result.toolResults,
    };
}

async function executeMintAction(tools: any, context: string, openaiApiKey: string): Promise<any> {
    const result = await aiGenerateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 10,
        prompt: context,
    });
    
    return {
        success: true,
        response: result.text,
        toolResults: result.toolResults,
    };
}

async function executeBalanceAction(tools: any, context: string, openaiApiKey: string): Promise<any> {
    const result = await aiGenerateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 10,
        prompt: context,
    });
    
    return {
        success: true,
        response: result.text,
        toolResults: result.toolResults,
    };
}

// Response composition functions
function composeSwapResponseContext(result: any, state: State): string {
    const responseTemplate = `
# Action Examples
{{actionExamples}}

# Knowledge  
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

A token swap was executed successfully on Celo.
Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the swap was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

function composeSendResponseContext(result: any, state: State): string {
    const responseTemplate = `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

A token send was executed successfully on Celo.
Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the send was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

function composeMintResponseContext(result: any, state: State): string {
    const responseTemplate = `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

An NFT mint was executed successfully on Celo.
Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the mint was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

function composeBalanceResponseContext(result: any, state: State): string {
    const responseTemplate = `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

A balance check was executed successfully on Celo.
Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the balance check was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

async function generateResponse(runtime: IAgentRuntime, context: string): Promise<string> {
    return generateText({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
    });
}