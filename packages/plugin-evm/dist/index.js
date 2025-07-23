import {
  secp256k1
} from "./chunk-KR3YJQGK.js";
import {
  AbiDecodingDataSizeTooSmallError,
  AbiDecodingZeroDataError,
  AbiEventNotFoundError,
  AbiEventSignatureEmptyTopicsError,
  AbiEventSignatureNotFoundError,
  BaseError,
  BytesSizeMismatchError,
  CallExecutionError,
  ChainDisconnectedError,
  ChainMismatchError,
  ChainNotFoundError,
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
  DecodeLogDataMismatch,
  DecodeLogTopicsMismatch,
  FeeCapTooHighError,
  Hash,
  HttpRequestError,
  InternalRpcError,
  InvalidAddressError,
  InvalidChainIdError,
  InvalidInputRpcError,
  InvalidLegacyVError,
  InvalidParamsRpcError,
  InvalidRequestRpcError,
  InvalidSerializableTransactionError,
  InvalidStorageKeySizeError,
  JsonRpcVersionUnsupportedError,
  LimitExceededRpcError,
  LruMap,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  ParseRpcError,
  PositionOutOfBoundsError,
  ProviderDisconnectedError,
  RawContractError,
  ResourceNotFoundRpcError,
  ResourceUnavailableRpcError,
  RpcRequestError,
  SwitchChainError,
  TimeoutError,
  TipAboveFeeCapError,
  TransactionExecutionError,
  TransactionNotFoundError,
  TransactionReceiptNotFoundError,
  TransactionRejectedRpcError,
  UnauthorizedProviderError,
  UnknownNodeError,
  UnknownRpcError,
  UnsupportedProviderMethodError,
  UserRejectedRequestError,
  WaitForTransactionReceiptTimeoutError,
  addressResolverAbi,
  aexists,
  aoutput,
  assertRequest,
  bytesRegex,
  bytesToHex,
  call,
  checksumAddress,
  concat,
  concatHex,
  createBatchScheduler,
  createCursor,
  createView,
  decodeAbiParameters,
  decodeFunctionResult,
  defineFormatter,
  defineTransactionRequest,
  encodeAbiParameters,
  encodeDeployData,
  encodeFunctionData,
  etherUnits,
  extract,
  formatAbiItem,
  formatEther,
  formatGwei,
  formatTransactionRequest,
  formatUnits,
  getAbiItem,
  getAddress,
  getCallError,
  getChainContractAddress,
  getNodeError,
  hexToBigInt,
  hexToBool,
  hexToBytes,
  hexToNumber,
  integerRegex,
  isAddress,
  isAddressEqual,
  isHex,
  keccak256,
  maxUint16,
  maxUint256,
  multicall3Abi,
  numberToHex,
  pad,
  panicReasons,
  parseAbi,
  parseAccount,
  prettyPrint,
  rotr,
  serializeStateOverride,
  size,
  slice,
  sliceHex,
  stringToBytes,
  stringToHex,
  stringify,
  textResolverAbi,
  toBytes,
  toBytes2,
  toEventSelector,
  toHex,
  trim,
  universalResolverResolveAbi,
  universalResolverReverseAbi,
  universalSignatureValidatorAbi,
  universalSignatureValidatorByteCode,
  withResolvers,
  wrapConstructor
} from "./chunk-T3Y7A6RA.js";
import {
  __export
} from "./chunk-PR4QN5HX.js";

// src/actions/bridge.ts
import {
  composePromptFromState,
  ModelType,
  parseKeyValueXml,
  elizaLogger as elizaLogger2,
  logger
} from "@elizaos/core";
import {
  createConfig,
  executeRoute,
  getRoutes,
  getStatus,
  resumeRoute,
  getToken,
  EVM
} from "@lifi/sdk";

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/getAction.js
function getAction(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/log.js
var FilterTypeNotSupportedError = class extends BaseError {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`, {
      name: "FilterTypeNotSupportedError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/abi/encodeEventTopics.js
var docsPath = "/docs/contract/encodeEventTopics";
function encodeEventTopics(parameters) {
  const { abi: abi2, eventName, args } = parameters;
  let abiItem = abi2[0];
  if (eventName) {
    const item = getAbiItem({ abi: abi2, name: eventName });
    if (!item)
      throw new AbiEventNotFoundError(eventName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(void 0, { docsPath });
  const definition = formatAbiItem(abiItem);
  const signature = toEventSelector(definition);
  let topics = [];
  if (args && "inputs" in abiItem) {
    const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => {
        if (Array.isArray(args_[i]))
          return args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] }));
        return args_[i] ? encodeArg({ param, value: args_[i] }) : null;
      }) ?? [];
    }
  }
  return [signature, ...topics];
}
function encodeArg({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters([param], [value]);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return (id) => requestMap[id] || client.request;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/createContractEventFilter.js
async function createContractEventFilter(client, parameters) {
  const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi2,
    args,
    eventName
  }) : void 0;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi2,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    type: "event"
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/errors/getContractError.js
var EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi: abi2, address, args, docsPath: docsPath3, functionName, sender }) {
  const error = err instanceof RawContractError ? err : err instanceof BaseError ? err.walk((err2) => "data" in err2) || err.walk() : {};
  const { code, data, details, message, shortMessage } = error;
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage)) {
      return new ContractFunctionRevertedError({
        abi: abi2,
        data: typeof data === "object" ? data.data : data,
        functionName,
        message: error instanceof RpcRequestError ? details : shortMessage ?? message
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi2,
    args,
    contractAddress: address,
    docsPath: docsPath3,
    functionName,
    sender
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1: secp256k12 } = await import("./secp256k1-S4XOKWQI.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r, s, v, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode } of list) {
        encode(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/experimental/eip7702/utils/hashAuthorization.js
function hashAuthorization(parameters) {
  const { chainId, contractAddress, nonce, to } = parameters;
  const hash = keccak256(concatHex([
    "0x05",
    toRlp([
      chainId ? numberToHex(chainId) : "0x",
      contractAddress,
      nonce ? numberToHex(nonce) : "0x"
    ])
  ]));
  if (to === "bytes")
    return hexToBytes(hash);
  return hash;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/experimental/eip7702/utils/recoverAuthorizationAddress.js
async function recoverAuthorizationAddress(parameters) {
  const { authorization, signature } = parameters;
  return recoverAddress({
    hash: hashAuthorization(authorization),
    signature: signature ?? authorization
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/estimateGas.js
var EstimateGasExecutionError = class extends BaseError {
  constructor(cause, { account, docsPath: docsPath3, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath3,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "EstimateGasExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/errors/getEstimateGasError.js
function getEstimateGasError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/fee.js
var BaseFeeScalarError = class extends BaseError {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.", {
      name: "BaseFeeScalarError"
    });
  }
};
var Eip1559FeesNotSupportedError = class extends BaseError {
  constructor() {
    super("Chain does not support EIP-1559 fees.", {
      name: "Eip1559FeesNotSupportedError"
    });
  }
};
var MaxFeePerGasTooLowError = class extends BaseError {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/block.js
var BlockNotFoundError = class extends BaseError {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    contractAddress: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getBlock.js
async function getBlock(client, { blockHash, blockNumber, blockTag: blockTag_, includeTransactions: includeTransactions_ } = {}) {
  const blockTag = blockTag_ ?? "latest";
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let block = null;
  if (blockHash) {
    block = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    }, { dedupe: true });
  } else {
    block = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!block)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format = client.chain?.formatters?.block?.format || formatBlock;
  return format(block);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getGasPrice.js
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request } = args || {};
  try {
    const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
    if (typeof maxPriorityFeePerGas === "function") {
      const block = block_ || await getAction(client, getBlock, "getBlock")({});
      const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
        block,
        client,
        request
      });
      if (maxPriorityFeePerGas_ === null)
        throw new Error();
      return maxPriorityFeePerGas_;
    }
    if (typeof maxPriorityFeePerGas !== "undefined")
      return maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError();
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base2) => base2 * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function") {
    const fees2 = await chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request,
      type
    });
    if (fees2 !== null)
      return fees2;
  }
  if (type === "eip1559") {
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block,
      chain,
      request
    });
    const baseFeePerGas = multiply(block.baseFeePerGas);
    const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
  }, { dedupe: Boolean(blockNumber) });
  return hexToNumber(count);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/blobsToCommitments.js
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/blobsToProofs.js
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
var Chi = (a, b, c) => a & b ^ ~a & c;
var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    const { view, buffer: buffer2, blockLen } = this;
    data = toBytes2(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer2.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer: buffer2, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer2[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer2[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer: buffer2, outputLen } = this;
    this.digestInto(buffer2);
    const res = buffer2.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer: buffer2, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer2);
    return to;
  }
};

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/esm/sha256.js
var SHA256_K = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor() {
    super(64, 32, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/hash/sha256.js
function sha2562(value, to_) {
  const to = to_ || "hex";
  const bytes = sha256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  const { commitment, version = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2562(commitment, "bytes");
  versionedHash.set([version], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version
    }));
  }
  return hashes;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg = 1;

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError = class extends BaseError {
  constructor({ maxSize, size: size3 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size3} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
};
var EmptyBlobError = class extends BaseError {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
};
var InvalidVersionedHashSizeError = class extends BaseError {
  constructor({ hash, size: size3 }) {
    super(`Versioned hash "${hash}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size3}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
};
var InvalidVersionedHashVersionError = class extends BaseError {
  constructor({ hash, version }) {
    super(`Versioned hash "${hash}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg}`,
        `Received: ${version}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/toBlobs.js
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size3 = 0;
    while (size3 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size3++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  const { data, kzg, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getChainId.js
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  }, { dedupe: true });
  return hexToNumber(chainIdHex);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
var defaultParameters = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];
async function prepareTransactionRequest(client, args) {
  const { account: account_ = client.account, blobs, chain, gas, kzg, nonce, nonceManager, parameters = defaultParameters, type } = args;
  const account = account_ ? parseAccount(account_) : account_;
  const request = { ...args, ...account ? { from: account?.address } : {} };
  let block;
  async function getBlock2() {
    if (block)
      return block;
    block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
    return block;
  }
  let chainId;
  async function getChainId2() {
    if (chainId)
      return chainId;
    if (chain)
      return chain.id;
    if (typeof args.chainId !== "undefined")
      return args.chainId;
    const chainId_ = await getAction(client, getChainId, "getChainId")({});
    chainId = chainId_;
    return chainId;
  }
  if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
    const commitments = blobsToCommitments({ blobs, kzg });
    if (parameters.includes("blobVersionedHashes")) {
      const versionedHashes = commitmentsToVersionedHashes({
        commitments,
        to: "hex"
      });
      request.blobVersionedHashes = versionedHashes;
    }
    if (parameters.includes("sidecars")) {
      const proofs = blobsToProofs({ blobs, commitments, kzg });
      const sidecars = toBlobSidecars({
        blobs,
        commitments,
        proofs,
        to: "hex"
      });
      request.sidecars = sidecars;
    }
  }
  if (parameters.includes("chainId"))
    request.chainId = await getChainId2();
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account) {
    if (nonceManager) {
      const chainId2 = await getChainId2();
      request.nonce = await nonceManager.consume({
        address: account.address,
        chainId: chainId2,
        client
      });
    } else {
      request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
        address: account.address,
        blockTag: "pending"
      });
    }
  }
  if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
    try {
      request.type = getTransactionType(request);
    } catch {
      const block2 = await getBlock2();
      request.type = typeof block2?.baseFeePerGas === "bigint" ? "eip1559" : "legacy";
    }
  }
  if (parameters.includes("fees")) {
    if (request.type !== "legacy" && request.type !== "eip2930") {
      if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
        const block2 = await getBlock2();
        const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request
        });
        if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
          throw new MaxFeePerGasTooLowError({
            maxPriorityFeePerGas
          });
        request.maxPriorityFeePerGas = maxPriorityFeePerGas;
        request.maxFeePerGas = maxFeePerGas;
      }
    } else {
      if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
        throw new Eip1559FeesNotSupportedError();
      const block2 = await getBlock2();
      const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
        block: block2,
        chain,
        request,
        type: "legacy"
      });
      request.gasPrice = gasPrice_;
    }
  }
  if (parameters.includes("gas") && typeof gas === "undefined")
    request.gas = await getAction(client, estimateGas, "estimateGas")({
      ...request,
      account: account ? { address: account.address, type: "json-rpc" } : account
    });
  assertRequest(request);
  delete request.parameters;
  return request;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getBalance.js
async function getBalance(client, { address, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address, blockNumberHex || blockTag]
  });
  return BigInt(balance);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/estimateGas.js
async function estimateGas(client, args) {
  const { account: account_ = client.account } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  try {
    let estimateGas_rpc2 = function(parameters) {
      const { block: block2, request: request2, rpcStateOverride: rpcStateOverride2 } = parameters;
      return client.request({
        method: "eth_estimateGas",
        params: rpcStateOverride2 ? [request2, block2 ?? "latest", rpcStateOverride2] : block2 ? [request2, block2] : [request2]
      });
    };
    var estimateGas_rpc = estimateGas_rpc2;
    const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = await prepareTransactionRequest(client, {
      ...args,
      parameters: (
        // Some RPC Providers do not compute versioned hashes from blobs. We will need
        // to compute them.
        account?.type === "local" ? void 0 : ["blobVersionedHashes"]
      )
    });
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const to = await (async () => {
      if (rest.to)
        return rest.to;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError("`to` is required. Could not infer from `authorizationList`");
        });
      return void 0;
    })();
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      authorizationList,
      blobs,
      blobVersionedHashes,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    let estimate = BigInt(await estimateGas_rpc2({ block, request, rpcStateOverride }));
    if (authorizationList) {
      const value2 = await getBalance(client, { address: request.from });
      const estimates = await Promise.all(authorizationList.map(async (authorization) => {
        const { contractAddress } = authorization;
        const estimate2 = await estimateGas_rpc2({
          block,
          request: {
            authorizationList: void 0,
            data,
            from: account?.address,
            to: contractAddress,
            value: numberToHex(value2)
          },
          rpcStateOverride
        }).catch(() => 100000n);
        return 2n * BigInt(estimate2);
      }));
      estimate += estimates.reduce((acc, curr) => acc + curr, 0n);
    }
    return estimate;
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/estimateContractGas.js
async function estimateContractGas(client, parameters) {
  const { abi: abi2, address, args, functionName, dataSuffix, ...request } = parameters;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas, "estimateGas")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...request
    });
    return gas;
  } catch (error) {
    const account = request.account ? parseAccount(request.account) : void 0;
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account?.address
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/abi/decodeEventLog.js
var docsPath2 = "/docs/contract/decodeEventLog";
function decodeEventLog(parameters) {
  const { abi: abi2, data, strict: strict_, topics } = parameters;
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath2 });
  const abiItem = (() => {
    if (abi2.length === 1)
      return abi2[0];
    return abi2.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem(x)));
  })();
  if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath2 });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
  let args = isUnnamed ? [] : {};
  const indexedInputs = inputs.filter((x) => "indexed" in x && x.indexed);
  for (let i = 0; i < indexedInputs.length; i++) {
    const param = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic)
      throw new DecodeLogTopicsMismatch({
        abiItem,
        param
      });
    args[isUnnamed ? i : param.name || i] = decodeTopic({ param, value: topic });
  }
  const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
  if (nonIndexedInputs.length > 0) {
    if (data && data !== "0x") {
      try {
        const decodedData = decodeAbiParameters(nonIndexedInputs, data);
        if (decodedData) {
          if (isUnnamed)
            args = [...args, ...decodedData];
          else {
            for (let i = 0; i < nonIndexedInputs.length; i++) {
              args[nonIndexedInputs[i].name] = decodedData[i];
            }
          }
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data,
              params: nonIndexedInputs,
              size: size(data)
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: nonIndexedInputs,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : void 0
  };
}
function decodeTopic({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/abi/parseEventLogs.js
function parseEventLogs(parameters) {
  const { abi: abi2, args, logs, strict = true } = parameters;
  const eventName = (() => {
    if (!parameters.eventName)
      return void 0;
    if (Array.isArray(parameters.eventName))
      return parameters.eventName;
    return [parameters.eventName];
  })();
  return logs.map((log) => {
    try {
      const abiItem = abi2.find((abiItem2) => abiItem2.type === "event" && log.topics[0] === toEventSelector(abiItem2));
      if (!abiItem)
        return null;
      const event = decodeEventLog({
        ...log,
        abi: [abiItem],
        strict
      });
      if (eventName && !eventName.includes(event.eventName))
        return null;
      if (!includesArgs({
        args: event.args,
        inputs: abiItem.inputs,
        matchArgs: args
      }))
        return null;
      return { ...event, ...log };
    } catch (err) {
      let eventName2;
      let isUnnamed;
      if (err instanceof AbiEventSignatureNotFoundError)
        return null;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if (strict)
          return null;
        eventName2 = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
      }
      return { ...log, args: isUnnamed ? [] : {}, eventName: eventName2 };
    }
  }).filter(Boolean);
}
function includesArgs(parameters) {
  const { args, inputs, matchArgs } = parameters;
  if (!matchArgs)
    return true;
  if (!args)
    return false;
  function isEqual(input, value, arg) {
    try {
      if (input.type === "address")
        return isAddressEqual(value, arg);
      if (input.type === "string" || input.type === "bytes")
        return keccak256(toBytes(value)) === arg;
      return value === arg;
    } catch {
      return false;
    }
  }
  if (Array.isArray(args) && Array.isArray(matchArgs)) {
    return matchArgs.every((value, index2) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs[index2];
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[index2]));
    });
  }
  if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
    return Object.entries(matchArgs).every(([key, value]) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs.find((input2) => input2.name === key);
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[key]));
    });
  return false;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getLogs.js
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : void 0);
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args: events_ ? void 0 : args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!events)
    return formattedLogs;
  return parseEventLogs({
    abi: events,
    args,
    logs: formattedLogs,
    strict
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getContractEvents.js
async function getContractEvents(client, parameters) {
  const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
  const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
  const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
  return getAction(client, getLogs, "getLogs")({
    address,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/readContract.js
async function readContract(client, parameters) {
  const { abi: abi2, address, args, functionName, ...rest } = parameters;
  const calldata = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const { data } = await getAction(client, call, "call")({
      ...rest,
      data: calldata,
      to: address
    });
    return decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/simulateContract.js
async function simulateContract(client, parameters) {
  const { abi: abi2, address, args, dataSuffix, functionName, ...callRequest } = parameters;
  const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
  const calldata = encodeFunctionData({ abi: abi2, args, functionName });
  try {
    const { data } = await getAction(client, call, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...callRequest,
      account
    });
    const result = decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
    const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
    return {
      result,
      request: {
        abi: minimizedAbi,
        address,
        args,
        dataSuffix,
        functionName,
        ...callRequest,
        account
      }
    };
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account?.address
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/observe.js
var listenersCache = /* @__PURE__ */ new Map();
var cleanupCache = /* @__PURE__ */ new Map();
var callbackCount = 0;
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const listeners2 = getListeners();
    if (!listeners2.some((cb) => cb.id === callbackId))
      return;
    const cleanup2 = cleanupCache.get(observerId);
    if (listeners2.length === 1 && cleanup2)
      cleanup2();
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/wait.js
async function wait(time) {
  return new Promise((res) => setTimeout(res, time));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/poll.js
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data = void 0;
    if (emitOnBegin)
      data = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/promise/withCache.js
var promiseCache = /* @__PURE__ */ new Map();
var responseCache = /* @__PURE__ */ new Map();
function getCache(cacheKey2) {
  const buildCache = (cacheKey3, cache) => ({
    clear: () => cache.delete(cacheKey3),
    get: () => cache.get(cacheKey3),
    set: (data) => cache.set(cacheKey3, data)
  });
  const promise = buildCache(cacheKey2, promiseCache);
  const response = buildCache(cacheKey2, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
  const cache = getCache(cacheKey2);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = (/* @__PURE__ */ new Date()).getTime() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data = await promise;
    cache.response.set({ created: /* @__PURE__ */ new Date(), data });
    return data;
  } finally {
    cache.promise.clear();
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getBlockNumber.js
var cacheKey = (id) => `blockNumber.${id}`;
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime });
  return BigInt(blockNumberHex);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getFilterChanges.js
async function getFilterChanges(_client, { filter }) {
  const strict = "strict" in filter && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  if (typeof logs[0] === "string")
    return logs;
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!("abi" in filter) || !filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/uninstallFilter.js
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/watchContractEvent.js
function watchContractEvent(client, parameters) {
  const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket")
      return false;
    if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
      return false;
    return true;
  })();
  const pollContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi2,
              address,
              args,
              eventName,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber < blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi2,
                address,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict
    ]);
    let active = true;
    let unsubscribe = () => active = false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      ;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const topics = eventName ? encodeEventTopics({
            abi: abi2,
            eventName,
            args
          }) : [];
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName: eventName2, args: args2 } = decodeEventLog({
                  abi: abi2,
                  data: log.data,
                  topics: log.topics,
                  strict: strict_
                });
                const formatted = formatLog(log, {
                  args: args2,
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              } catch (err) {
                let eventName2;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName2 = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              }
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/account.js
var AccountNotFoundError = class extends BaseError {
  constructor({ docsPath: docsPath3 } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."
    ].join("\n"), {
      docsPath: docsPath3,
      docsSlug: "account",
      name: "AccountNotFoundError"
    });
  }
};
var AccountTypeNotSupportedError = class extends BaseError {
  constructor({ docsPath: docsPath3, metaMessages, type }) {
    super(`Account type "${type}" is not supported.`, {
      docsPath: docsPath3,
      metaMessages,
      name: "AccountTypeNotSupportedError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/chain/assertCurrentChain.js
function assertCurrentChain({ chain, currentChainId }) {
  if (!chain)
    throw new ChainNotFoundError();
  if (currentChainId !== chain.id)
    throw new ChainMismatchError({ chain, currentChainId });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/errors/getTransactionError.js
function getTransactionError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new TransactionExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);
async function sendTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, ...rest } = parameters;
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  const account = account_ ? parseAccount(account_) : null;
  try {
    assertRequest(parameters);
    const to = await (async () => {
      if (parameters.to)
        return parameters.to;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
        });
      return void 0;
    })();
    if (account?.type === "json-rpc" || account === null) {
      let chainId;
      if (chain !== null) {
        chainId = await getAction(client, getChainId, "getChainId")({});
        assertCurrentChain({
          currentChainId: chainId,
          chain
        });
      }
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        accessList,
        authorizationList,
        blobs,
        chainId,
        data,
        from: account?.address,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        value
      });
      const isWalletNamespaceSupported = supportsWalletNamespace.get(client.uid);
      const method = isWalletNamespaceSupported ? "wallet_sendTransaction" : "eth_sendTransaction";
      try {
        return await client.request({
          method,
          params: [request]
        }, { retryCount: 0 });
      } catch (e) {
        if (isWalletNamespaceSupported === false)
          throw e;
        const error = e;
        if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") {
          return await client.request({
            method: "wallet_sendTransaction",
            params: [request]
          }, { retryCount: 0 }).then((hash) => {
            supportsWalletNamespace.set(client.uid, true);
            return hash;
          }).catch((e2) => {
            const walletNamespaceError = e2;
            if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
              supportsWalletNamespace.set(client.uid, false);
              throw error;
            }
            throw walletNamespaceError;
          });
        }
        throw error;
      }
    }
    if (account?.type === "local") {
      const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
        account,
        accessList,
        authorizationList,
        blobs,
        chain,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        nonceManager: account.nonceManager,
        parameters: [...defaultParameters, "sidecars"],
        value,
        ...rest,
        to
      });
      const serializer = chain?.serializers?.transaction;
      const serializedTransaction = await account.signTransaction(request, {
        serializer
      });
      return await getAction(client, sendRawTransaction, "sendRawTransaction")({
        serializedTransaction
      });
    }
    if (account?.type === "smart")
      throw new AccountTypeNotSupportedError({
        metaMessages: [
          "Consider using the `sendUserOperation` Action instead."
        ],
        docsPath: "/docs/actions/bundler/sendUserOperation",
        type: "smart"
      });
    throw new AccountTypeNotSupportedError({
      docsPath: "/docs/actions/wallet/sendTransaction",
      type: account?.type
    });
  } catch (err) {
    if (err instanceof AccountTypeNotSupportedError)
      throw err;
    throw getTransactionError(err, {
      ...parameters,
      account,
      chain: parameters.chain || void 0
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/writeContract.js
async function writeContract(client, parameters) {
  const { abi: abi2, account: account_ = client.account, address, args, dataSuffix, functionName, ...request } = parameters;
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/contract/writeContract"
    });
  const account = account_ ? parseAccount(account_) : null;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    return await getAction(client, sendTransaction, "sendTransaction")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      account,
      ...request
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/writeContract",
      functionName,
      sender: account?.address
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/eip712.js
var Eip712DomainNotFoundError = class extends BaseError {
  constructor({ address }) {
    super(`No EIP-712 domain found on contract "${address}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${address}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification."
      ],
      name: "Eip712DomainNotFoundError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getEip712Domain.js
async function getEip712Domain(client, parameters) {
  const { address, factory, factoryData } = parameters;
  try {
    const [fields, name, version, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
      abi,
      address,
      functionName: "eip712Domain",
      factory,
      factoryData
    });
    return {
      domain: {
        name,
        version,
        chainId: Number(chainId),
        verifyingContract,
        salt
      },
      extensions,
      fields
    };
  } catch (e) {
    const error = e;
    if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
      throw new Eip712DomainNotFoundError({ address });
    }
    throw error;
  }
}
var abi = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/addChain.js
async function addChain(client, { chain }) {
  const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
  await client.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: numberToHex(id),
        chainName: name,
        nativeCurrency,
        rpcUrls: rpcUrls.default.http,
        blockExplorerUrls: blockExplorers ? Object.values(blockExplorers).map(({ url }) => url) : void 0
      }
    ]
  }, { dedupe: true, retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/uid.js
var size2 = 256;
var index = size2;
var buffer;
function uid(length = 11) {
  if (!buffer || index + length > size2 * 2) {
    buffer = "";
    index = 0;
    for (let i = 0; i < size2; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
  const { batch, cacheTime = parameters.pollingInterval ?? 4e3, ccipRead, key = "base", name = "Base Client", pollingInterval = 4e3, type = "base" } = parameters;
  const chain = parameters.chain;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  const { config, request, value } = parameters.transport({
    chain,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account,
    batch,
    cacheTime,
    ccipRead,
    chain,
    key,
    name,
    pollingInterval,
    request,
    transport,
    type,
    uid: uid()
  };
  function extend(base2) {
    return (extendFn) => {
      const extended = extendFn(base2);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base2, ...extended };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache2 = /* @__PURE__ */ new LruMap(8192);
function withDedupe(fn, { enabled = true, id }) {
  if (!enabled || !id)
    return fn();
  if (promiseCache2.get(id))
    return promiseCache2.get(id);
  const promise = fn().finally(() => promiseCache2.delete(id));
  promiseCache2.set(id, promise);
  return promise;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data = await fn();
        resolve(data);
      } catch (err) {
        if (count < retryCount && await shouldRetry2({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/buildRequest.js
function buildRequest(request, options = {}) {
  return async (args, overrideOptions = {}) => {
    const { dedupe = false, retryDelay = 150, retryCount = 3, uid: uid2 } = {
      ...options,
      ...overrideOptions
    };
    const requestId = dedupe ? keccak256(stringToHex(`${uid2}.${stringify(args)}`)) : void 0;
    return withDedupe(() => withRetry(async () => {
      try {
        return await request(args);
      } catch (err_) {
        const err = err_;
        switch (err.code) {
          // -32700
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          // -32600
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          // -32601
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err, { method: args.method });
          // -32602
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          // -32603
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          // -32000
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          // -32001
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          // -32002
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          // -32003
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          // -32004
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err, {
              method: args.method
            });
          // -32005
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          // -32006
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          // 4001
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          // 4100
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          // 4200
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          // 4900
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          // 4901
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          // 4902
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          // CAIP-25: User Rejected Error
          // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
          case 5e3:
            throw new UserRejectedRequestError(err);
          default:
            if (err_ instanceof BaseError)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        if (error && error instanceof HttpRequestError) {
          const retryAfter = error?.headers?.get("Retry-After");
          if (retryAfter?.match(/\d/))
            return Number.parseInt(retryAfter) * 1e3;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      shouldRetry: ({ error }) => shouldRetry(error)
    }), { enabled: dedupe, id: requestId });
  };
}
function shouldRetry(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport({ key, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  const uid2 = uid();
  return {
    config: {
      key,
      name,
      request,
      retryCount,
      retryDelay,
      timeout,
      type
    },
    request: buildRequest(request, { retryCount, retryDelay, uid: uid2 }),
    value
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/transport.js
var UrlRequiredError = class extends BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    ;
    (async () => {
      let timeoutId;
      try {
        const controller = new AbortController();
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn({ signal: controller?.signal || null }));
      } catch (err) {
        if (err?.name === "AbortError")
          reject(errorInstance);
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = /* @__PURE__ */ createIdStore();

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/rpc/http.js
function getHttpRpcClient(url, options = {}) {
  return {
    async request(params) {
      const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const fetchOptions = {
        ...options.fetchOptions ?? {},
        ...params.fetchOptions ?? {}
      };
      const { headers, method, signal: signal_ } = fetchOptions;
      try {
        const response = await withTimeout(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache.take(),
              ...body2
            }))) : stringify({
              jsonrpc: "2.0",
              id: body.id ?? idCache.take(),
              ...body
            }),
            headers: {
              "Content-Type": "application/json",
              ...headers
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          const args = await onRequest?.(request, init) ?? { ...init, url };
          const response2 = await fetch(args.url ?? url, args);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data;
        if (response.headers.get("Content-Type")?.startsWith("application/json"))
          data = await response.json();
        else {
          data = await response.text();
          try {
            data = JSON.parse(data || "{}");
          } catch (err) {
            if (response.ok)
              throw err;
            data = { error: data };
          }
        }
        if (!response.ok) {
          throw new HttpRequestError({
            body,
            details: stringify(data.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data;
      } catch (err) {
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          cause: err,
          url
        });
      }
    }
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/transports/http.js
function http(url, config = {}) {
  const { batch, fetchOptions, key = "http", name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError();
    const rpcClient = getHttpRpcClient(url_, {
      fetchOptions,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport({
      key,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: url_,
          wait: wait2,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2
          })
        ];
        const [{ error, result }] = await fn(body);
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/errors.js
function isNullUniversalResolverError(err, callType) {
  if (!(err instanceof BaseError))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ResolverWildcardNotSupported")
    return true;
  if (cause.data?.errorName === "ResolverNotContract")
    return true;
  if (cause.data?.errorName === "ResolverError")
    return true;
  if (cause.data?.errorName === "HttpError")
    return true;
  if (cause.reason?.includes("Wildcard on non-extended resolvers is not supported"))
    return true;
  if (callType === "reverse" && cause.reason === panicReasons[50])
    return true;
  return false;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
function encodedLabelToLabelhash(label) {
  if (label.length !== 66)
    return null;
  if (label.indexOf("[") !== 0)
    return null;
  if (label.indexOf("]") !== 65)
    return null;
  const hash = `0x${label.slice(1, 65)}`;
  if (!isHex(hash))
    return null;
  return hash;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/namehash.js
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex(result);
  const labels = name.split(".");
  for (let i = labels.length - 1; i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
    result = keccak256(concat([result, hashed]), "bytes");
  }
  return bytesToHex(result);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash) {
  return `[${hash.slice(2)}]`;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/labelhash.js
function labelhash(label) {
  const result = new Uint8Array(32).fill(0);
  if (!label)
    return bytesToHex(result);
  return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0; i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes[offset] = encoded.length;
    bytes.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes.byteLength !== offset + 1)
    return bytes.slice(0, offset + 1);
  return bytes;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/ens/getEnsAddress.js
async function getEnsAddress(client, { blockNumber, blockTag, coinType, name, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      ...coinType != null ? { args: [namehash(name), BigInt(coinType)] } : { args: [namehash(name)] }
    });
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [toHex(packetToBytes(name)), functionData],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const address = decodeFunctionResult({
      abi: addressResolverAbi,
      args: coinType != null ? [namehash(name), BigInt(coinType)] : void 0,
      functionName: "addr",
      data: res[0]
    });
    if (address === "0x")
      return null;
    if (trim(address) === "0x00")
      return null;
    return address;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/ens.js
var EnsAvatarInvalidMetadataError = class extends BaseError {
  constructor({ data }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data)}`
      ],
      name: "EnsAvatarInvalidMetadataError"
    });
  }
};
var EnsAvatarInvalidNftUriError = class extends BaseError {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`, {
      name: "EnsAvatarInvalidNftUriError"
    });
  }
};
var EnsAvatarUriResolutionError = class extends BaseError {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
  }
};
var EnsAvatarUnsupportedNamespaceError = class extends BaseError {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/avatar/utils.js
var networkRegex = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!globalThis.hasOwnProperty("Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom, defaultGateway) {
  if (!custom)
    return defaultGateway;
  if (custom.endsWith("/"))
    return custom.slice(0, -1);
  return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data) {
  if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
    throw new EnsAvatarInvalidMetadataError({ data });
  }
  return data.image || data.image_url || data.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(chainID),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record }) {
  if (/eip155:/i.test(record))
    return parseNftAvatarUri(client, { gatewayUrls, record });
  return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
  const nft = parseNftUri(record);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? (
      // if it is encoded, decode it
      atob(resolvedNftUri.replace("data:application/json;base64,", ""))
    ) : (
      // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
      resolvedNftUri
    );
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/ens/getEnsText.js
async function getEnsText(client, { blockNumber, blockTag, name, key, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        toHex(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        })
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const record = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record === "" ? null : record;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/ens/getEnsAvatar.js
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
  const record = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress,
    gatewayUrls,
    strict
  });
  if (!record)
    return null;
  try {
    return await parseAvatarRecord(client, {
      record,
      gatewayUrls: assetGatewayUrls
    });
  } catch {
    return null;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/ens/getEnsName.js
async function getEnsName(client, { address, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const reverseNode = `${address.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      functionName: "reverse",
      args: [toHex(packetToBytes(reverseNode))],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const [name, resolvedAddress] = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (address.toLowerCase() !== resolvedAddress.toLowerCase())
      return null;
    return name;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "reverse"))
      return null;
    throw err;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/ens/getEnsResolver.js
async function getEnsResolver(client, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/createBlockFilter.js
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id, request: getRequest(id), type: "block" };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/createEventFilter.js
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : void 0);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : void 0,
    fromBlock,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    toBlock,
    type: "event"
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id, request: getRequest(id), type: "transaction" };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getBlobBaseFee.js
async function getBlobBaseFee(client) {
  const baseFee = await client.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(baseFee);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    }, { dedupe: true });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  return hexToNumber(count);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getCode.js
async function getCode(client, { address, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const hex = await client.request({
    method: "eth_getCode",
    params: [address, blockNumberHex || blockTag]
  }, { dedupe: Boolean(blockNumberHex) });
  if (hex === "0x")
    return void 0;
  return hex;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getFeeHistory.js
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
  const feeHistory = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  }, { dedupe: Boolean(blockNumberHex) });
  return formatFeeHistory(feeHistory);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getFilterLogs.js
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/typedData.js
var InvalidDomainError = class extends BaseError {
  constructor({ domain }) {
    super(`Invalid domain "${stringify(domain)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."]
    });
  }
};
var InvalidPrimaryTypeError = class extends BaseError {
  constructor({ primaryType, types }) {
    super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
      docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
      metaMessages: ["Check that the primary type is a key in `types`."]
    });
  }
};
var InvalidStructTypeError = class extends BaseError {
  constructor({ type }) {
    super(`Struct type "${type}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."],
      name: "InvalidStructTypeError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/hashTypedData.js
function hashTypedData(parameters) {
  const { domain = {}, message, primaryType } = parameters;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain")
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  return keccak256(concat(parts));
}
function hashDomain({ domain, types }) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types
  });
}
function hashStruct({ data, primaryType, types }) {
  const encoded = encodeData({
    data,
    primaryType,
    types
  });
  return keccak256(encoded);
}
function encodeData({ data, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeType({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === void 0) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}
function encodeField({ types, name, type, value }) {
  if (types[type] !== void 0) {
    return [
      { type: "bytes32" },
      keccak256(encodeData({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/typedData.js
function serializeTypedData(parameters) {
  const { domain: domain_, message: message_, primaryType, types } = parameters;
  const normalizeData = (struct, data_) => {
    const data = { ...data_ };
    for (const param of struct) {
      const { name, type } = param;
      if (type === "address")
        data[name] = data[name].toLowerCase();
    }
    return data;
  };
  const domain = (() => {
    if (!types.EIP712Domain)
      return {};
    if (!domain_)
      return {};
    return normalizeData(types.EIP712Domain, domain_);
  })();
  const message = (() => {
    if (primaryType === "EIP712Domain")
      return void 0;
    return normalizeData(types[primaryType], message_);
  })();
  return stringify({ domain, message, primaryType, types });
}
function validateTypedData(parameters) {
  const { domain, message, primaryType, types } = parameters;
  const validateData = (struct, data) => {
    for (const param of struct) {
      const { name, type } = param;
      const value = data[name];
      const integerMatch = type.match(integerRegex);
      if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
        const [_type, base2, size_] = integerMatch;
        numberToHex(value, {
          signed: base2 === "int",
          size: Number.parseInt(size_) / 8
        });
      }
      if (type === "address" && typeof value === "string" && !isAddress(value))
        throw new InvalidAddressError({ address: value });
      const bytesMatch = type.match(bytesRegex);
      if (bytesMatch) {
        const [_type, size_] = bytesMatch;
        if (size_ && size(value) !== Number.parseInt(size_))
          throw new BytesSizeMismatchError({
            expectedSize: Number.parseInt(size_),
            givenSize: size(value)
          });
      }
      const struct2 = types[type];
      if (struct2) {
        validateReference(type);
        validateData(struct2, value);
      }
    }
  };
  if (types.EIP712Domain && domain) {
    if (typeof domain !== "object")
      throw new InvalidDomainError({ domain });
    validateData(types.EIP712Domain, domain);
  }
  if (primaryType !== "EIP712Domain") {
    if (types[primaryType])
      validateData(types[primaryType], message);
    else
      throw new InvalidPrimaryTypeError({ primaryType, types });
  }
}
function getTypesForEIP712Domain({ domain }) {
  return [
    typeof domain?.name === "string" && { name: "name", type: "string" },
    domain?.version && { name: "version", type: "string" },
    typeof domain?.chainId === "number" && {
      name: "chainId",
      type: "uint256"
    },
    domain?.verifyingContract && {
      name: "verifyingContract",
      type: "address"
    },
    domain?.salt && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function validateReference(type) {
  if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
    throw new InvalidStructTypeError({ type });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = "Ethereum Signed Message:\n";

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
function toPrefixedMessage(message_) {
  const message = (() => {
    if (typeof message_ === "string")
      return stringToHex(message_);
    if (typeof message_.raw === "string")
      return message_.raw;
    return bytesToHex(message_.raw);
  })();
  const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
  return concat([prefix, message]);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/hashMessage.js
function hashMessage(message, to_) {
  return keccak256(toPrefixedMessage(message), to_);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/constants/bytes.js
var erc6492MagicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/isErc6492Signature.js
function isErc6492Signature(signature) {
  return sliceHex(signature, -32) === erc6492MagicBytes;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/serializeErc6492Signature.js
function serializeErc6492Signature(parameters) {
  const { address, data, signature, to = "hex" } = parameters;
  const signature_ = concatHex([
    encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
    erc6492MagicBytes
  ]);
  if (to === "hex")
    return signature_;
  return hexToBytes(signature_);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/transaction/assertTransaction.js
function assertTransactionEIP7702(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { contractAddress, chainId } = authorization;
      if (!isAddress(contractAddress))
        throw new InvalidAddressError({ address: contractAddress });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError();
    for (const hash of blobVersionedHashes) {
      const size_ = size(hash);
      const version = hexToNumber(slice(hash, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash, size: size_ });
      if (version !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash,
          version
        });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/experimental/eip7702/utils/serializeAuthorizationList.js
function serializeAuthorizationList(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const { contractAddress, chainId, nonce, ...signature } = authorization;
    serializedAuthorizationList.push([
      chainId ? toHex(chainId) : "0x",
      contractAddress,
      nonce ? toHex(nonce) : "0x",
      ...toYParitySignatureArray({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/transaction/serializeAccessList.js
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0; i < accessList.length; i++) {
    const { address, storageKeys } = accessList[i];
    for (let j = 0; j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction(transaction, signature) {
  const type = getTransactionType(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP7702(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
  return concatHex([
    "0x04",
    toRlp([
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? toHex(maxFeePerGas) : "0x",
      gas ? toHex(gas) : "0x",
      to ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP4844(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex(x));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP1559(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
  assertTransactionEIP2930(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
  assertTransactionLegacy(transaction);
  let serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v2 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    const r = trim(signature.r);
    const s = trim(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      toHex(v),
      r === "0x00" ? "0x" : r,
      s === "0x00" ? "0x" : s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      toHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
  const signature = signature_ ?? transaction;
  const { v, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const r = trim(signature.r);
  const s = trim(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? toHex(1) : "0x";
    if (v === 0n)
      return "0x";
    if (v === 1n)
      return toHex(1);
    return v === 27n ? "0x" : toHex(1);
  })();
  return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/errors/unit.js
var InvalidDecimalNumberError = class extends BaseError {
  constructor({ value }) {
    super(`Number \`${value}\` is not a valid decimal number.`, {
      name: "InvalidDecimalNumberError"
    });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/unit/parseUnits.js
function parseUnits(value, decimals) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value))
    throw new InvalidDecimalNumberError({ value });
  let [integer, fraction = "0"] = value.split(".");
  const negative = integer.startsWith("-");
  if (negative)
    integer = integer.slice(1);
  fraction = fraction.replace(/(0+)$/, "");
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ];
    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else
      fraction = `${left}${rounded}`;
    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }
  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/unit/parseEther.js
function parseEther(ether, unit = "wei") {
  return parseUnits(ether, etherUnits[unit]);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/formatters/proof.js
function formatStorageProof(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
}
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : void 0,
    nonce: proof.nonce ? hexToNumber(proof.nonce) : void 0,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getProof.js
async function getProof(client, { address, blockNumber, blockTag: blockTag_, storageKeys }) {
  const blockTag = blockTag_ ?? "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const proof = await client.request({
    method: "eth_getProof",
    params: [address, storageKeys, blockNumberHex || blockTag]
  });
  return formatProof(proof);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getStorageAt.js
async function getStorageAt(client, { address, blockNumber, blockTag = "latest", slot }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const data = await client.request({
    method: "eth_getStorageAt",
    params: [address, slot, blockNumberHex || blockTag]
  });
  return data;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getTransaction.js
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash, index: index2 }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let transaction = null;
  if (hash) {
    transaction = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash]
    }, { dedupe: true });
  } else if (blockHash) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index2)]
    }, { dedupe: true });
  } else if (blockNumberHex || blockTag) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index2)]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!transaction)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash,
      index: index2
    });
  const format = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format(transaction);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
async function getTransactionConfirmations(client, { hash, transactionReceipt }) {
  const [blockNumber, transaction] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash ? getAction(client, getTransaction, "getTransaction")({ hash }) : void 0
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/getTransactionReceipt.js
async function getTransactionReceipt(client, { hash }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash]
  }, { dedupe: true });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format(receipt);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/multicall.js
async function multicall(client, parameters) {
  const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, multicallAddress: multicallAddress_, stateOverride } = parameters;
  const contracts2 = parameters.contracts;
  const batchSize = batchSize_ ?? (typeof client.batch?.multicall === "object" && client.batch.multicall.batchSize || 1024);
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0; i < contracts2.length; i++) {
    const { abi: abi2, address, args, functionName } = contracts2[i];
    try {
      const callData = encodeFunctionData({ abi: abi2, args, functionName });
      currentChunkSize += (callData.length - 2) / 2;
      if (
        // Check if batching is enabled.
        batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
        currentChunkSize > batchSize && // Check if the current chunk is not already empty.
        chunkedCalls[currentChunk].length > 0
      ) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/multicall",
        functionName
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address
        }
      ];
    }
  }
  const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
    abi: multicall3Abi,
    address: multicallAddress,
    args: [calls],
    blockNumber,
    blockTag,
    functionName: "aggregate3",
    stateOverride
  })));
  const results = [];
  for (let i = 0; i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0; j < chunkedCalls[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: void 0
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0; j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = chunkedCalls[i][j];
      const { abi: abi2, address, functionName, args } = contracts2[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError();
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi2,
          args,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: void 0, status: "failure" });
      }
    }
  }
  if (results.length !== contracts2.length)
    throw new BaseError("multicall results mismatch");
  return results;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/signature/serializeSignature.js
function serializeSignature({ r, s, to = "hex", v, yParity }) {
  const yParity_ = (() => {
    if (yParity === 0 || yParity === 1)
      return yParity;
    if (v && (v === 27n || v === 28n || v >= 35n))
      return v % 2n === 0n ? 1 : 0;
    throw new Error("Invalid `v` or `yParity` value");
  })();
  const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
  if (to === "hex")
    return signature;
  return hexToBytes(signature);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/verifyHash.js
async function verifyHash(client, parameters) {
  const { address, factory, factoryData, hash, signature, universalSignatureVerifierAddress = client.chain?.contracts?.universalSignatureVerifier?.address, ...rest } = parameters;
  const signatureHex = (() => {
    if (isHex(signature))
      return signature;
    if (typeof signature === "object" && "r" in signature && "s" in signature)
      return serializeSignature(signature);
    return bytesToHex(signature);
  })();
  const wrappedSignature = await (async () => {
    if (!factory && !factoryData)
      return signatureHex;
    if (isErc6492Signature(signatureHex))
      return signatureHex;
    return serializeErc6492Signature({
      address: factory,
      data: factoryData,
      signature: signatureHex
    });
  })();
  try {
    const args = universalSignatureVerifierAddress ? {
      to: universalSignatureVerifierAddress,
      data: encodeFunctionData({
        abi: universalSignatureValidatorAbi,
        functionName: "isValidSig",
        args: [address, hash, wrappedSignature]
      }),
      ...rest
    } : {
      data: encodeDeployData({
        abi: universalSignatureValidatorAbi,
        args: [address, hash, wrappedSignature],
        bytecode: universalSignatureValidatorByteCode
      }),
      ...rest
    };
    const { data } = await getAction(client, call, "call")(args);
    return hexToBool(data ?? "0x0");
  } catch (error) {
    try {
      const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash, signature }));
      if (verified)
        return true;
    } catch {
    }
    if (error instanceof CallExecutionError) {
      return false;
    }
    throw error;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/verifyMessage.js
async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
  const hash = hashMessage(message);
  return verifyHash(client, {
    address,
    factory,
    factoryData,
    hash,
    signature,
    ...callRequest
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/verifyTypedData.js
async function verifyTypedData(client, parameters) {
  const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
  const hash = hashTypedData({ message, primaryType, types, domain });
  return verifyHash(client, {
    address,
    factory,
    factoryData,
    hash,
    signature,
    ...callRequest
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/watchBlockNumber.js
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket")
      return false;
    if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
      return false;
    return true;
  })();
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (!prevBlockNumber || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            onData(data) {
              if (!active)
                return;
              const blockNumber = hexToBigInt(data.result?.number);
              emit.onBlockNumber(blockNumber, prevBlockNumber);
              prevBlockNumber = blockNumber;
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
async function waitForTransactionReceipt(client, {
  confirmations = 1,
  hash,
  onReplaced,
  pollingInterval = client.pollingInterval,
  retryCount = 6,
  retryDelay = ({ count }) => ~~(1 << count) * 200,
  // exponential backoff
  timeout = 18e4
}) {
  const observerId = stringify(["waitForTransactionReceipt", client.uid, hash]);
  let transaction;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  const { promise, resolve, reject } = withResolvers();
  const timer = timeout ? setTimeout(() => reject(new WaitForTransactionReceiptTimeoutError({ hash })), timeout) : void 0;
  const _unobserve = observe(observerId, { onReplaced, resolve, reject }, (emit) => {
    const _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
      emitMissed: true,
      emitOnBegin: true,
      poll: true,
      pollingInterval,
      async onBlockNumber(blockNumber_) {
        const done = (fn) => {
          clearTimeout(timer);
          _unwatch();
          fn();
          _unobserve();
        };
        let blockNumber = blockNumber_;
        if (retrying)
          return;
        try {
          if (receipt) {
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
            return;
          }
          if (!transaction) {
            retrying = true;
            await withRetry(async () => {
              transaction = await getAction(client, getTransaction, "getTransaction")({ hash });
              if (transaction.blockNumber)
                blockNumber = transaction.blockNumber;
            }, {
              delay: retryDelay,
              retryCount
            });
            retrying = false;
          }
          receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash });
          if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
            return;
          done(() => emit.resolve(receipt));
        } catch (err) {
          if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
            if (!transaction) {
              retrying = false;
              return;
            }
            try {
              replacedTransaction = transaction;
              retrying = true;
              const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                blockNumber,
                includeTransactions: true
              }), {
                delay: retryDelay,
                retryCount,
                shouldRetry: ({ error }) => error instanceof BlockNotFoundError
              });
              retrying = false;
              const replacementTransaction = block.transactions.find(({ from, nonce }) => from === replacedTransaction.from && nonce === replacedTransaction.nonce);
              if (!replacementTransaction)
                return;
              receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                hash: replacementTransaction.hash
              });
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              let reason = "replaced";
              if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value) {
                reason = "repriced";
              } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                reason = "cancelled";
              }
              done(() => {
                emit.onReplaced?.({
                  reason,
                  replacedTransaction,
                  transaction: replacementTransaction,
                  transactionReceipt: receipt
                });
                emit.resolve(receipt);
              });
            } catch (err_) {
              done(() => emit.reject(err_));
            }
          } else {
            done(() => emit.reject(err));
          }
        }
      }
    });
  });
  return promise;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/watchBlocks.js
function watchBlocks(client, { blockTag = "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket")
      return false;
    if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
      return false;
    return true;
  })();
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify([
      "watchBlocks",
      client.uid,
      blockTag,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block.number && prevBlock?.number) {
          if (block.number === prevBlock.number)
            return;
          if (block.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n; i < block.number; i++) {
              const block2 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block2, prevBlock);
              prevBlock = block2;
            }
          }
        }
        if (
          // If no previous block exists, emit.
          !prevBlock?.number || // If the block tag is "pending" with no block number, emit.
          blockTag === "pending" && !block?.number || // If the next block number is greater than the previous block number, emit.
          // We don't want to emit blocks in the past.
          block.number && block.number > prevBlock.number
        ) {
          emit.onBlock(block, prevBlock);
          prevBlock = block;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let emitFetched = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        if (emitOnBegin) {
          getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          }).then((block) => {
            if (!active)
              return;
            if (!emitFetched)
              return;
            onBlock(block, void 0);
            emitFetched = false;
          });
        }
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["newHeads"],
          async onData(data) {
            if (!active)
              return;
            const block = await getAction(client, getBlock, "getBlock")({
              blockNumber: data.blockNumber,
              includeTransactions
            }).catch(() => {
            });
            if (!active)
              return;
            onBlock(block, prevBlock);
            emitFetched = false;
            prevBlock = block;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/watchEvent.js
function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket")
      return false;
    if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
      return false;
    return true;
  })();
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify([
      "watchEvent",
      address,
      args,
      batch,
      client.uid,
      event,
      pollingInterval,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address,
              args,
              event,
              events,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const events_ = events ?? (event ? [event] : void 0);
        let topics = [];
        if (events_) {
          const encoded = events_.flatMap((event2) => encodeEventTopics({
            abi: [event2],
            eventName: event2.name,
            args
          }));
          topics = [encoded];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["logs", { address, topics }],
          onData(data) {
            if (!active)
              return;
            const log = data.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_ ?? [],
                data: log.data,
                topics: log.topics,
                strict
              });
              const formatted = formatLog(log, { args: args2, eventName });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
              }
              const formatted = formatLog(log, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/public/watchPendingTransactions.js
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const pollPendingTransactions = () => {
    const observerId = stringify([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash of hashes)
              emit.onTransactions([hash]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data) {
            if (!active)
              return;
            const transaction = data.result;
            onTransactions([transaction]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
function parseSiweMessage(message) {
  const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
  const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
  const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
  return {
    ...prefix,
    ...suffix,
    ...chainId ? { chainId: Number(chainId) } : {},
    ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
    ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
    ...notBefore ? { notBefore: new Date(notBefore) } : {},
    ...requestId ? { requestId } : {},
    ...resources ? { resources } : {},
    ...scheme ? { scheme } : {},
    ...statement ? { statement } : {}
  };
}
var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
var suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
function validateSiweMessage(parameters) {
  const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
  if (domain && message.domain !== domain)
    return false;
  if (nonce && message.nonce !== nonce)
    return false;
  if (scheme && message.scheme !== scheme)
    return false;
  if (message.expirationTime && time >= message.expirationTime)
    return false;
  if (message.notBefore && time < message.notBefore)
    return false;
  try {
    if (!message.address)
      return false;
    if (address && !isAddressEqual(message.address, address))
      return false;
  } catch {
    return false;
  }
  return true;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
async function verifySiweMessage(client, parameters) {
  const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
  const parsed = parseSiweMessage(message);
  if (!parsed.address)
    return false;
  const isValid = validateSiweMessage({
    address,
    domain,
    message: parsed,
    nonce,
    scheme,
    time
  });
  if (!isValid)
    return false;
  const hash = hashMessage(message);
  return verifyHash(client, {
    address: parsed.address,
    hash,
    signature,
    ...callRequest
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
  return {
    call: (args) => call(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlobBaseFee: () => getBlobBaseFee(client),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getCode(client, args),
    getChainId: () => getChainId(client),
    getCode: (args) => getCode(client, args),
    getContractEvents: (args) => getContractEvents(client, args),
    getEip712Domain: (args) => getEip712Domain(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
    verifySiweMessage: (args) => verifySiweMessage(client, args),
    verifyTypedData: (args) => verifyTypedData(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args)
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/createPublicClient.js
function createPublicClient(parameters) {
  const { key = "public", name = "Public Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "publicClient"
  });
  return client.extend(publicActions);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/dropTransaction.js
async function dropTransaction(client, { hash }) {
  await client.request({
    method: `${client.mode}_dropTransaction`,
    params: [hash]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/dumpState.js
async function dumpState(client) {
  return client.request({
    method: `${client.mode}_dumpState`
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/getAutomine.js
async function getAutomine(client) {
  if (client.mode === "ganache")
    return await client.request({
      method: "eth_mining"
    });
  return await client.request({
    method: `${client.mode}_getAutomine`
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/getTxpoolContent.js
async function getTxpoolContent(client) {
  return await client.request({
    method: "txpool_content"
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/getTxpoolStatus.js
async function getTxpoolStatus(client) {
  const { pending, queued } = await client.request({
    method: "txpool_status"
  });
  return {
    pending: hexToNumber(pending),
    queued: hexToNumber(queued)
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/impersonateAccount.js
async function impersonateAccount(client, { address }) {
  await client.request({
    method: `${client.mode}_impersonateAccount`,
    params: [address]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/increaseTime.js
async function increaseTime(client, { seconds }) {
  return await client.request({
    method: "evm_increaseTime",
    params: [numberToHex(seconds)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/inspectTxpool.js
async function inspectTxpool(client) {
  return await client.request({
    method: "txpool_inspect"
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/loadState.js
async function loadState(client, { state }) {
  await client.request({
    method: `${client.mode}_loadState`,
    params: [state]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/mine.js
async function mine(client, { blocks, interval }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_mine",
      params: [{ blocks: numberToHex(blocks) }]
    });
  else
    await client.request({
      method: `${client.mode}_mine`,
      params: [numberToHex(blocks), numberToHex(interval || 0)]
    });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/removeBlockTimestampInterval.js
async function removeBlockTimestampInterval(client) {
  await client.request({
    method: `${client.mode}_removeBlockTimestampInterval`
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/reset.js
async function reset(client, { blockNumber, jsonRpcUrl } = {}) {
  await client.request({
    method: `${client.mode}_reset`,
    params: [{ forking: { blockNumber: Number(blockNumber), jsonRpcUrl } }]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/revert.js
async function revert(client, { id }) {
  await client.request({
    method: "evm_revert",
    params: [id]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/sendUnsignedTransaction.js
async function sendUnsignedTransaction(client, args) {
  const { accessList, data, from, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
  const chainFormat = client.chain?.formatters?.transactionRequest?.format;
  const format = chainFormat || formatTransactionRequest;
  const request = format({
    // Pick out extra data that might exist on the chain's transaction request type.
    ...extract(rest, { format: chainFormat }),
    accessList,
    data,
    from,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    to,
    value
  });
  const hash = await client.request({
    method: "eth_sendUnsignedTransaction",
    params: [request]
  });
  return hash;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setAutomine.js
async function setAutomine(client, enabled) {
  if (client.mode === "ganache") {
    if (enabled)
      await client.request({ method: "miner_start" });
    else
      await client.request({ method: "miner_stop" });
  } else
    await client.request({
      method: "evm_setAutomine",
      params: [enabled]
    });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setBalance.js
async function setBalance(client, { address, value }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_setAccountBalance",
      params: [address, numberToHex(value)]
    });
  else
    await client.request({
      method: `${client.mode}_setBalance`,
      params: [address, numberToHex(value)]
    });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setBlockGasLimit.js
async function setBlockGasLimit(client, { gasLimit }) {
  await client.request({
    method: "evm_setBlockGasLimit",
    params: [numberToHex(gasLimit)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setBlockTimestampInterval.js
async function setBlockTimestampInterval(client, { interval }) {
  const interval_ = (() => {
    if (client.mode === "hardhat")
      return interval * 1e3;
    return interval;
  })();
  await client.request({
    method: `${client.mode}_setBlockTimestampInterval`,
    params: [interval_]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setCode.js
async function setCode(client, { address, bytecode }) {
  if (client.mode === "ganache")
    await client.request({
      method: "evm_setAccountCode",
      params: [address, bytecode]
    });
  else
    await client.request({
      method: `${client.mode}_setCode`,
      params: [address, bytecode]
    });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setCoinbase.js
async function setCoinbase(client, { address }) {
  await client.request({
    method: `${client.mode}_setCoinbase`,
    params: [address]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setIntervalMining.js
async function setIntervalMining(client, { interval }) {
  const interval_ = (() => {
    if (client.mode === "hardhat")
      return interval * 1e3;
    return interval;
  })();
  await client.request({
    method: "evm_setIntervalMining",
    params: [interval_]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setLoggingEnabled.js
async function setLoggingEnabled(client, enabled) {
  await client.request({
    method: `${client.mode}_setLoggingEnabled`,
    params: [enabled]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setMinGasPrice.js
async function setMinGasPrice(client, { gasPrice }) {
  await client.request({
    method: `${client.mode}_setMinGasPrice`,
    params: [numberToHex(gasPrice)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setNextBlockBaseFeePerGas.js
async function setNextBlockBaseFeePerGas(client, { baseFeePerGas }) {
  await client.request({
    method: `${client.mode}_setNextBlockBaseFeePerGas`,
    params: [numberToHex(baseFeePerGas)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setNextBlockTimestamp.js
async function setNextBlockTimestamp(client, { timestamp }) {
  await client.request({
    method: "evm_setNextBlockTimestamp",
    params: [numberToHex(timestamp)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setNonce.js
async function setNonce(client, { address, nonce }) {
  await client.request({
    method: `${client.mode}_setNonce`,
    params: [address, numberToHex(nonce)]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setRpcUrl.js
async function setRpcUrl(client, jsonRpcUrl) {
  await client.request({
    method: `${client.mode}_setRpcUrl`,
    params: [jsonRpcUrl]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/setStorageAt.js
async function setStorageAt(client, { address, index: index2, value }) {
  await client.request({
    method: `${client.mode}_setStorageAt`,
    params: [
      address,
      typeof index2 === "number" ? numberToHex(index2) : index2,
      value
    ]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/snapshot.js
async function snapshot(client) {
  return await client.request({
    method: "evm_snapshot"
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/test/stopImpersonatingAccount.js
async function stopImpersonatingAccount(client, { address }) {
  await client.request({
    method: `${client.mode}_stopImpersonatingAccount`,
    params: [address]
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/decorators/test.js
function testActions({ mode: mode2 }) {
  return (client_) => {
    const client = client_.extend(() => ({
      mode: mode2
    }));
    return {
      dropTransaction: (args) => dropTransaction(client, args),
      dumpState: () => dumpState(client),
      getAutomine: () => getAutomine(client),
      getTxpoolContent: () => getTxpoolContent(client),
      getTxpoolStatus: () => getTxpoolStatus(client),
      impersonateAccount: (args) => impersonateAccount(client, args),
      increaseTime: (args) => increaseTime(client, args),
      inspectTxpool: () => inspectTxpool(client),
      loadState: (args) => loadState(client, args),
      mine: (args) => mine(client, args),
      removeBlockTimestampInterval: () => removeBlockTimestampInterval(client),
      reset: (args) => reset(client, args),
      revert: (args) => revert(client, args),
      sendUnsignedTransaction: (args) => sendUnsignedTransaction(client, args),
      setAutomine: (args) => setAutomine(client, args),
      setBalance: (args) => setBalance(client, args),
      setBlockGasLimit: (args) => setBlockGasLimit(client, args),
      setBlockTimestampInterval: (args) => setBlockTimestampInterval(client, args),
      setCode: (args) => setCode(client, args),
      setCoinbase: (args) => setCoinbase(client, args),
      setIntervalMining: (args) => setIntervalMining(client, args),
      setLoggingEnabled: (args) => setLoggingEnabled(client, args),
      setMinGasPrice: (args) => setMinGasPrice(client, args),
      setNextBlockBaseFeePerGas: (args) => setNextBlockBaseFeePerGas(client, args),
      setNextBlockTimestamp: (args) => setNextBlockTimestamp(client, args),
      setNonce: (args) => setNonce(client, args),
      setRpcUrl: (args) => setRpcUrl(client, args),
      setStorageAt: (args) => setStorageAt(client, args),
      snapshot: () => snapshot(client),
      stopImpersonatingAccount: (args) => stopImpersonatingAccount(client, args)
    };
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/createTestClient.js
function createTestClient(parameters) {
  const { key = "test", name = "Test Client", mode: mode2 } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "testClient"
  });
  return client.extend((config) => ({
    mode: mode2,
    ...testActions({ mode: mode2 })(config)
  }));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/deployContract.js
function deployContract(walletClient, parameters) {
  const { abi: abi2, args, bytecode, ...request } = parameters;
  const calldata = encodeDeployData({ abi: abi2, args, bytecode });
  return sendTransaction(walletClient, {
    ...request,
    data: calldata
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/getAddresses.js
async function getAddresses(client) {
  if (client.account?.type === "local")
    return [client.account.address];
  const addresses = await client.request({ method: "eth_accounts" }, { dedupe: true });
  return addresses.map((address) => checksumAddress(address));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/getPermissions.js
async function getPermissions(client) {
  const permissions = await client.request({ method: "wallet_getPermissions" }, { dedupe: true });
  return permissions;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/requestAddresses.js
async function requestAddresses(client) {
  const addresses = await client.request({ method: "eth_requestAccounts" }, { dedupe: true, retryCount: 0 });
  return addresses.map((address) => getAddress(address));
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/requestPermissions.js
async function requestPermissions(client, permissions) {
  return client.request({
    method: "wallet_requestPermissions",
    params: [permissions]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/signMessage.js
async function signMessage(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account = parseAccount(account_);
  if (account.signMessage)
    return account.signMessage({ message });
  const message_ = (() => {
    if (typeof message === "string")
      return stringToHex(message);
    if (message.raw instanceof Uint8Array)
      return toHex(message.raw);
    return message.raw;
  })();
  return client.request({
    method: "personal_sign",
    params: [message_, account.address]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/signTransaction.js
async function signTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTransaction"
    });
  const account = parseAccount(account_);
  assertRequest({
    account,
    ...parameters
  });
  const chainId = await getAction(client, getChainId, "getChainId")({});
  if (chain !== null)
    assertCurrentChain({
      currentChainId: chainId,
      chain
    });
  const formatters4 = chain?.formatters || client.chain?.formatters;
  const format = formatters4?.transactionRequest?.format || formatTransactionRequest;
  if (account.signTransaction)
    return account.signTransaction({
      ...transaction,
      chainId
    }, { serializer: client.chain?.serializers?.transaction });
  return await client.request({
    method: "eth_signTransaction",
    params: [
      {
        ...format(transaction),
        chainId: numberToHex(chainId),
        from: account.address
      }
    ]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/signTypedData.js
async function signTypedData(client, parameters) {
  const { account: account_ = client.account, domain, message, primaryType } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTypedData"
    });
  const account = parseAccount(account_);
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({ domain, message, primaryType, types });
  if (account.signTypedData)
    return account.signTypedData({ domain, message, primaryType, types });
  const typedData = serializeTypedData({ domain, message, primaryType, types });
  return client.request({
    method: "eth_signTypedData_v4",
    params: [account.address, typedData]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/switchChain.js
async function switchChain(client, { id }) {
  await client.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: numberToHex(id)
      }
    ]
  }, { retryCount: 0 });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/actions/wallet/watchAsset.js
async function watchAsset(client, params) {
  const added = await client.request({
    method: "wallet_watchAsset",
    params
  }, { retryCount: 0 });
  return added;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/decorators/wallet.js
function walletActions(client) {
  return {
    addChain: (args) => addChain(client, args),
    deployContract: (args) => deployContract(client, args),
    getAddresses: () => getAddresses(client),
    getChainId: () => getChainId(client),
    getPermissions: () => getPermissions(client),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    requestAddresses: () => requestAddresses(client),
    requestPermissions: (args) => requestPermissions(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    sendTransaction: (args) => sendTransaction(client, args),
    signMessage: (args) => signMessage(client, args),
    signTransaction: (args) => signTransaction(client, args),
    signTypedData: (args) => signTypedData(client, args),
    switchChain: (args) => switchChain(client, args),
    watchAsset: (args) => watchAsset(client, args),
    writeContract: (args) => writeContract(client, args)
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/clients/createWalletClient.js
function createWalletClient(parameters) {
  const { key = "wallet", name = "Wallet Client", transport } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    transport,
    type: "walletClient"
  });
  return client.extend(walletActions);
}

// src/providers/wallet.ts
import * as path from "path";
import {
  elizaLogger,
  TEEMode,
  ServiceType
} from "@elizaos/core";

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/toAccount.js
function toAccount(source) {
  if (typeof source === "string") {
    if (!isAddress(source, { strict: false }))
      throw new InvalidAddressError({ address: source });
    return {
      address: source,
      type: "json-rpc"
    };
  }
  if (!isAddress(source.address, { strict: false }))
    throw new InvalidAddressError({ address: source.address });
  return {
    address: source.address,
    nonceManager: source.nonceManager,
    sign: source.sign,
    experimental_signAuthorization: source.experimental_signAuthorization,
    signMessage: source.signMessage,
    signTransaction: source.signTransaction,
    signTypedData: source.signTypedData,
    source: "custom",
    type: "local"
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/sign.js
var extraEntropy = false;
async function sign({ hash, privateKey, to = "object" }) {
  const { r, s, recovery } = secp256k1.sign(hash.slice(2), privateKey.slice(2), { lowS: true, extraEntropy });
  const signature = {
    r: numberToHex(r, { size: 32 }),
    s: numberToHex(s, { size: 32 }),
    v: recovery ? 28n : 27n,
    yParity: recovery
  };
  return (() => {
    if (to === "bytes" || to === "hex")
      return serializeSignature({ ...signature, to });
    return signature;
  })();
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/signAuthorization.js
async function experimental_signAuthorization(parameters) {
  const { contractAddress, chainId, nonce, privateKey, to = "object" } = parameters;
  const signature = await sign({
    hash: hashAuthorization({ contractAddress, chainId, nonce }),
    privateKey,
    to
  });
  if (to === "object")
    return {
      contractAddress,
      chainId,
      nonce,
      ...signature
    };
  return signature;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/signMessage.js
async function signMessage2({ message, privateKey }) {
  return await sign({ hash: hashMessage(message), privateKey, to: "hex" });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/signTransaction.js
async function signTransaction2(parameters) {
  const { privateKey, transaction, serializer = serializeTransaction } = parameters;
  const signableTransaction = (() => {
    if (transaction.type === "eip4844")
      return {
        ...transaction,
        sidecars: false
      };
    return transaction;
  })();
  const signature = await sign({
    hash: keccak256(serializer(signableTransaction)),
    privateKey
  });
  return serializer(transaction, signature);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/utils/signTypedData.js
async function signTypedData2(parameters) {
  const { privateKey, ...typedData } = parameters;
  return await sign({
    hash: hashTypedData(typedData),
    privateKey,
    to: "hex"
  });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/accounts/privateKeyToAccount.js
function privateKeyToAccount(privateKey, options = {}) {
  const { nonceManager } = options;
  const publicKey = toHex(secp256k1.getPublicKey(privateKey.slice(2), false));
  const address = publicKeyToAddress(publicKey);
  const account = toAccount({
    address,
    nonceManager,
    async sign({ hash }) {
      return sign({ hash, privateKey, to: "hex" });
    },
    async experimental_signAuthorization(authorization) {
      return experimental_signAuthorization({ ...authorization, privateKey });
    },
    async signMessage({ message }) {
      return signMessage2({ message, privateKey });
    },
    async signTransaction(transaction, { serializer } = {}) {
      return signTransaction2({ privateKey, transaction, serializer });
    },
    async signTypedData(typedData) {
      return signTypedData2({ ...typedData, privateKey });
    }
  });
  return {
    ...account,
    publicKey,
    source: "privateKey"
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/index.js
var chains_exports = {};
__export(chains_exports, {
  abey: () => abey,
  abstractTestnet: () => abstractTestnet,
  acala: () => acala,
  acria: () => acria,
  adf: () => adf,
  aioz: () => aioz,
  alephZero: () => alephZero,
  alienx: () => alienx,
  alienxHalTestnet: () => alienxHalTestnet,
  ancient8: () => ancient8,
  ancient8Sepolia: () => ancient8Sepolia,
  anvil: () => anvil,
  apeChain: () => apeChain,
  apexTestnet: () => apexTestnet,
  arbitrum: () => arbitrum,
  arbitrumGoerli: () => arbitrumGoerli,
  arbitrumNova: () => arbitrumNova,
  arbitrumSepolia: () => arbitrumSepolia,
  areonNetwork: () => areonNetwork,
  areonNetworkTestnet: () => areonNetworkTestnet,
  artelaTestnet: () => artelaTestnet,
  arthera: () => arthera,
  assetChain: () => assetChain,
  assetChainTestnet: () => assetChainTestnet,
  astar: () => astar,
  astarZkEVM: () => astarZkEVM,
  astarZkyoto: () => astarZkyoto,
  atletaOlympia: () => atletaOlympia,
  aurora: () => aurora,
  auroraTestnet: () => auroraTestnet,
  auroria: () => auroria,
  avalanche: () => avalanche,
  avalancheFuji: () => avalancheFuji,
  b3: () => b3,
  b3Sepolia: () => b3Sepolia,
  bahamut: () => bahamut,
  base: () => base,
  baseGoerli: () => baseGoerli,
  baseSepolia: () => baseSepolia,
  beam: () => beam,
  beamTestnet: () => beamTestnet,
  bearNetworkChainMainnet: () => bearNetworkChainMainnet,
  bearNetworkChainTestnet: () => bearNetworkChainTestnet,
  berachainTestnet: () => berachainTestnet,
  berachainTestnetbArtio: () => berachainTestnetbArtio,
  bevmMainnet: () => bevmMainnet,
  bifrost: () => bifrost,
  bitTorrent: () => bitTorrent,
  bitTorrentTestnet: () => bitTorrentTestnet,
  bitgert: () => bitgert,
  bitkub: () => bitkub,
  bitkubTestnet: () => bitkubTestnet,
  bitlayer: () => bitlayer,
  bitlayerTestnet: () => bitlayerTestnet,
  bitrock: () => bitrock,
  blast: () => blast,
  blastSepolia: () => blastSepolia,
  bob: () => bob,
  bobSepolia: () => bobSepolia,
  boba: () => boba,
  bobaSepolia: () => bobaSepolia,
  boolBetaMainnet: () => boolBetaMainnet,
  botanixTestnet: () => botanixTestnet,
  bounceBit: () => bounceBit,
  bounceBitTestnet: () => bounceBitTestnet,
  bronos: () => bronos,
  bronosTestnet: () => bronosTestnet,
  bsc: () => bsc,
  bscGreenfield: () => bscGreenfield,
  bscTestnet: () => bscTestnet,
  bsquared: () => bsquared,
  bsquaredTestnet: () => bsquaredTestnet,
  btr: () => btr,
  btrTestnet: () => btrTestnet,
  bxn: () => bxn,
  bxnTestnet: () => bxnTestnet,
  cannon: () => cannon,
  canto: () => canto,
  celo: () => celo,
  celoAlfajores: () => celoAlfajores,
  chang: () => chang,
  chiliz: () => chiliz,
  chips: () => chips,
  classic: () => classic,
  coinbit: () => coinbit,
  coinex: () => coinex,
  confluxESpace: () => confluxESpace,
  confluxESpaceTestnet: () => confluxESpaceTestnet,
  coreDao: () => coreDao,
  corn: () => corn,
  cornTestnet: () => cornTestnet,
  crab: () => crab,
  creatorTestnet: () => creatorTestnet,
  cronos: () => cronos,
  cronosTestnet: () => cronosTestnet,
  cronoszkEVM: () => cronoszkEVM,
  cronoszkEVMTestnet: () => cronoszkEVMTestnet,
  crossbell: () => crossbell,
  curtis: () => curtis,
  cyber: () => cyber,
  cyberTestnet: () => cyberTestnet,
  dailyNetwork: () => dailyNetwork,
  dailyNetworkTestnet: () => dailyNetworkTestnet,
  darwinia: () => darwinia,
  dchain: () => dchain,
  dchainTestnet: () => dchainTestnet,
  defichainEvm: () => defichainEvm,
  defichainEvmTestnet: () => defichainEvmTestnet,
  degen: () => degen,
  dfk: () => dfk,
  diode: () => diode,
  disChain: () => disChain,
  dodochainTestnet: () => dodochainTestnet,
  dogechain: () => dogechain,
  dosChain: () => dosChain,
  dosChainTestnet: () => dosChainTestnet,
  dreyerxMainnet: () => dreyerxMainnet,
  dreyerxTestnet: () => dreyerxTestnet,
  dustboyIoT: () => dustboyIoT,
  dymension: () => dymension,
  edgeless: () => edgeless,
  edgelessTestnet: () => edgelessTestnet,
  edgeware: () => edgeware,
  edgewareTestnet: () => edgewareTestnet,
  ekta: () => ekta,
  ektaTestnet: () => ektaTestnet,
  elastos: () => elastos,
  elastosTestnet: () => elastosTestnet,
  electroneum: () => electroneum,
  electroneumTestnet: () => electroneumTestnet,
  elysiumTestnet: () => elysiumTestnet,
  energy: () => energy,
  enuls: () => enuls,
  eon: () => eon,
  eos: () => eos,
  eosTestnet: () => eosTestnet,
  etherlink: () => etherlink,
  etherlinkTestnet: () => etherlinkTestnet,
  evmos: () => evmos,
  evmosTestnet: () => evmosTestnet,
  excelonMainnet: () => excelonMainnet,
  expanse: () => expanse,
  fantom: () => fantom,
  fantomSonicTestnet: () => fantomSonicTestnet,
  fantomTestnet: () => fantomTestnet,
  fibo: () => fibo,
  filecoin: () => filecoin,
  filecoinCalibration: () => filecoinCalibration,
  filecoinHyperspace: () => filecoinHyperspace,
  fireChain: () => fireChain,
  flare: () => flare,
  flareTestnet: () => flareTestnet,
  flowMainnet: () => flowMainnet,
  flowPreviewnet: () => flowPreviewnet,
  flowTestnet: () => flowTestnet,
  fluence: () => fluence,
  fluenceStage: () => fluenceStage,
  fluenceTestnet: () => fluenceTestnet,
  forma: () => forma,
  foundry: () => foundry,
  fraxtal: () => fraxtal,
  fraxtalTestnet: () => fraxtalTestnet,
  funkiMainnet: () => funkiMainnet,
  funkiSepolia: () => funkiSepolia,
  fuse: () => fuse,
  fuseSparknet: () => fuseSparknet,
  fusion: () => fusion,
  fusionTestnet: () => fusionTestnet,
  garnet: () => garnet,
  geist: () => geist,
  genesys: () => genesys,
  glideL1Protocol: () => glideL1Protocol,
  glideL2Protocol: () => glideL2Protocol,
  gnosis: () => gnosis,
  gnosisChiado: () => gnosisChiado,
  goChain: () => goChain,
  gobi: () => gobi,
  godwoken: () => godwoken,
  goerli: () => goerli,
  gravity: () => gravity,
  guruNetwork: () => guruNetwork,
  guruTestnet: () => guruTestnet,
  ham: () => ham,
  haqqMainnet: () => haqqMainnet,
  haqqTestedge2: () => haqqTestedge2,
  hardhat: () => hardhat,
  harmonyOne: () => harmonyOne,
  hashkeyTestnet: () => hashkeyTestnet,
  hedera: () => hedera,
  hederaPreviewnet: () => hederaPreviewnet,
  hederaTestnet: () => hederaTestnet,
  hela: () => hela,
  hemiSepolia: () => hemiSepolia,
  holesky: () => holesky,
  hpb: () => hpb,
  hychain: () => hychain,
  hychainTestnet: () => hychainTestnet,
  iSunCoin: () => iSunCoin,
  idchain: () => idchain,
  immutableZkEvm: () => immutableZkEvm,
  immutableZkEvmTestnet: () => immutableZkEvmTestnet,
  inEVM: () => inEVM,
  initVerseGenesis: () => initVerseGenesis,
  ink: () => ink,
  inkSepolia: () => inkSepolia,
  iota: () => iota,
  iotaTestnet: () => iotaTestnet,
  iotex: () => iotex,
  iotexTestnet: () => iotexTestnet,
  jbc: () => jbc,
  jbcTestnet: () => jbcTestnet,
  kaia: () => kaia,
  kairos: () => kairos,
  kakarotSepolia: () => kakarotSepolia,
  kakarotStarknetSepolia: () => kakarotStarknetSepolia,
  kardiaChain: () => kardiaChain,
  karura: () => karura,
  kava: () => kava,
  kavaTestnet: () => kavaTestnet,
  kcc: () => kcc,
  kinto: () => kinto,
  klaytn: () => klaytn,
  klaytnBaobab: () => klaytnBaobab,
  koi: () => koi,
  kroma: () => kroma,
  kromaSepolia: () => kromaSepolia,
  l3x: () => l3x,
  l3xTestnet: () => l3xTestnet,
  lavita: () => lavita,
  lightlinkPegasus: () => lightlinkPegasus,
  lightlinkPhoenix: () => lightlinkPhoenix,
  linea: () => linea,
  lineaGoerli: () => lineaGoerli,
  lineaSepolia: () => lineaSepolia,
  lineaTestnet: () => lineaTestnet,
  lisk: () => lisk,
  liskSepolia: () => liskSepolia,
  localhost: () => localhost,
  loop: () => loop,
  lukso: () => lukso,
  luksoTestnet: () => luksoTestnet,
  lycan: () => lycan,
  lyra: () => lyra,
  mainnet: () => mainnet,
  mandala: () => mandala,
  manta: () => manta,
  mantaSepoliaTestnet: () => mantaSepoliaTestnet,
  mantaTestnet: () => mantaTestnet,
  mantle: () => mantle,
  mantleSepoliaTestnet: () => mantleSepoliaTestnet,
  mantleTestnet: () => mantleTestnet,
  mapProtocol: () => mapProtocol,
  matchain: () => matchain,
  matchainTestnet: () => matchainTestnet,
  mchVerse: () => mchVerse,
  mekong: () => mekong,
  meld: () => meld,
  merlin: () => merlin,
  metachain: () => metachain,
  metachainIstanbul: () => metachainIstanbul,
  metadium: () => metadium,
  metalL2: () => metalL2,
  meter: () => meter,
  meterTestnet: () => meterTestnet,
  metis: () => metis,
  metisGoerli: () => metisGoerli,
  mev: () => mev,
  mevTestnet: () => mevTestnet,
  mint: () => mint,
  mintSepoliaTestnet: () => mintSepoliaTestnet,
  mitosisTestnet: () => mitosisTestnet,
  mode: () => mode,
  modeTestnet: () => modeTestnet,
  moonbaseAlpha: () => moonbaseAlpha,
  moonbeam: () => moonbeam,
  moonbeamDev: () => moonbeamDev,
  moonriver: () => moonriver,
  morph: () => morph,
  morphHolesky: () => morphHolesky,
  morphSepolia: () => morphSepolia,
  nahmii: () => nahmii,
  nautilus: () => nautilus,
  neonDevnet: () => neonDevnet,
  neonMainnet: () => neonMainnet,
  neoxMainnet: () => neoxMainnet,
  neoxT4: () => neoxT4,
  nexi: () => nexi,
  nexilix: () => nexilix,
  oasisTestnet: () => oasisTestnet,
  oasys: () => oasys,
  odysseyTestnet: () => odysseyTestnet,
  okc: () => okc,
  omax: () => omax,
  oneWorld: () => oneWorld,
  oortMainnetDev: () => oortMainnetDev,
  opBNB: () => opBNB,
  opBNBTestnet: () => opBNBTestnet,
  optimism: () => optimism,
  optimismGoerli: () => optimismGoerli,
  optimismSepolia: () => optimismSepolia,
  optopia: () => optopia,
  optopiaTestnet: () => optopiaTestnet,
  orderly: () => orderly,
  orderlySepolia: () => orderlySepolia,
  otimDevnet: () => otimDevnet,
  palm: () => palm,
  palmTestnet: () => palmTestnet,
  pgn: () => pgn,
  pgnTestnet: () => pgnTestnet,
  phoenix: () => phoenix,
  planq: () => planq,
  playfiAlbireo: () => playfiAlbireo,
  plinga: () => plinga,
  plume: () => plume,
  plumeDevnet: () => plumeDevnet,
  plumeTestnet: () => plumeTestnet,
  polterTestnet: () => polterTestnet,
  polygon: () => polygon,
  polygonAmoy: () => polygonAmoy,
  polygonMumbai: () => polygonMumbai,
  polygonZkEvm: () => polygonZkEvm,
  polygonZkEvmCardona: () => polygonZkEvmCardona,
  polygonZkEvmTestnet: () => polygonZkEvmTestnet,
  pulsechain: () => pulsechain,
  pulsechainV4: () => pulsechainV4,
  qMainnet: () => qMainnet,
  qTestnet: () => qTestnet,
  ql1: () => ql1,
  real: () => real,
  redbellyMainnet: () => redbellyMainnet,
  redbellyTestnet: () => redbellyTestnet,
  redstone: () => redstone,
  rei: () => rei,
  reyaNetwork: () => reyaNetwork,
  rollux: () => rollux,
  rolluxTestnet: () => rolluxTestnet,
  ronin: () => ronin,
  root: () => root,
  rootPorcini: () => rootPorcini,
  rootstock: () => rootstock,
  rootstockTestnet: () => rootstockTestnet,
  rss3: () => rss3,
  rss3Sepolia: () => rss3Sepolia,
  saakuru: () => saakuru,
  saigon: () => saigon,
  sanko: () => sanko,
  sapphire: () => sapphire,
  sapphireTestnet: () => sapphireTestnet,
  satoshiVM: () => satoshiVM,
  satoshiVMTestnet: () => satoshiVMTestnet,
  scroll: () => scroll,
  scrollSepolia: () => scrollSepolia,
  sei: () => sei,
  seiDevnet: () => seiDevnet,
  seiTestnet: () => seiTestnet,
  sepolia: () => sepolia,
  shape: () => shape,
  shapeSepolia: () => shapeSepolia,
  shardeumSphinx: () => shardeumSphinx,
  shibarium: () => shibarium,
  shibariumTestnet: () => shibariumTestnet,
  shiden: () => shiden,
  shimmer: () => shimmer,
  shimmerTestnet: () => shimmerTestnet,
  silicon: () => silicon,
  siliconSepolia: () => siliconSepolia,
  sixProtocol: () => sixProtocol,
  skaleBlockBrawlers: () => skaleBlockBrawlers,
  skaleCalypso: () => skaleCalypso,
  skaleCalypsoTestnet: () => skaleCalypsoTestnet,
  skaleCryptoBlades: () => skaleCryptoBlades,
  skaleCryptoColosseum: () => skaleCryptoColosseum,
  skaleEuropa: () => skaleEuropa,
  skaleEuropaTestnet: () => skaleEuropaTestnet,
  skaleExorde: () => skaleExorde,
  skaleHumanProtocol: () => skaleHumanProtocol,
  skaleNebula: () => skaleNebula,
  skaleNebulaTestnet: () => skaleNebulaTestnet,
  skaleRazor: () => skaleRazor,
  skaleTitan: () => skaleTitan,
  skaleTitanTestnet: () => skaleTitanTestnet,
  sketchpad: () => sketchpad,
  snax: () => snax,
  snaxTestnet: () => snaxTestnet,
  soneiumMinato: () => soneiumMinato,
  songbird: () => songbird,
  songbirdTestnet: () => songbirdTestnet,
  sonic: () => sonic,
  sonicTestnet: () => sonicTestnet,
  sophon: () => sophon,
  sophonTestnet: () => sophonTestnet,
  spicy: () => spicy,
  step: () => step,
  storyOdyssey: () => storyOdyssey,
  storyTestnet: () => storyTestnet,
  stratis: () => stratis,
  superlumio: () => superlumio,
  superposition: () => superposition,
  superseed: () => superseed,
  superseedSepolia: () => superseedSepolia,
  swan: () => swan,
  swanProximaTestnet: () => swanProximaTestnet,
  swanSaturnTestnet: () => swanSaturnTestnet,
  swissdlt: () => swissdlt,
  syscoin: () => syscoin,
  syscoinTestnet: () => syscoinTestnet,
  taiko: () => taiko,
  taikoHekla: () => taikoHekla,
  taikoJolnir: () => taikoJolnir,
  taikoKatla: () => taikoKatla,
  taikoTestnetSepolia: () => taikoTestnetSepolia,
  taraxa: () => taraxa,
  taraxaTestnet: () => taraxaTestnet,
  telcoinTestnet: () => telcoinTestnet,
  telos: () => telos,
  telosTestnet: () => telosTestnet,
  tenet: () => tenet,
  thaiChain: () => thaiChain,
  that: () => that,
  theta: () => theta,
  thetaTestnet: () => thetaTestnet,
  thunderCore: () => thunderCore,
  thunderTestnet: () => thunderTestnet,
  tiktrixTestnet: () => tiktrixTestnet,
  tomb: () => tomb,
  treasure: () => treasure,
  treasureTopaz: () => treasureTopaz,
  tron: () => tron,
  ubiq: () => ubiq,
  ultron: () => ultron,
  ultronTestnet: () => ultronTestnet,
  unichainSepolia: () => unichainSepolia,
  unique: () => unique,
  uniqueOpal: () => uniqueOpal,
  uniqueQuartz: () => uniqueQuartz,
  unreal: () => unreal,
  vanar: () => vanar,
  vechain: () => vechain,
  velas: () => velas,
  viction: () => viction,
  victionTestnet: () => victionTestnet,
  vision: () => vision,
  visionTestnet: () => visionTestnet,
  wanchain: () => wanchain,
  wanchainTestnet: () => wanchainTestnet,
  weaveVMAlphanet: () => weaveVMAlphanet,
  wemix: () => wemix,
  wemixTestnet: () => wemixTestnet,
  worldLand: () => worldLand,
  worldchain: () => worldchain,
  worldchainSepolia: () => worldchainSepolia,
  x1Testnet: () => xLayerTestnet,
  xLayer: () => xLayer,
  xLayerTestnet: () => xLayerTestnet,
  xai: () => xai,
  xaiTestnet: () => xaiTestnet,
  xdc: () => xdc,
  xdcTestnet: () => xdcTestnet,
  xrOne: () => xrOne,
  xrSepolia: () => xrSepolia,
  yooldoVerse: () => yooldoVerse,
  yooldoVerseTestnet: () => yooldoVerseTestnet,
  zenchainTestnet: () => zenchainTestnet,
  zeniq: () => zeniq,
  zetachain: () => zetachain,
  zetachainAthensTestnet: () => zetachainAthensTestnet,
  zhejiang: () => zhejiang,
  zilliqa: () => zilliqa,
  zilliqaTestnet: () => zilliqaTestnet,
  zircuit: () => zircuit,
  zircuitTestnet: () => zircuitTestnet,
  zkFair: () => zkFair,
  zkFairTestnet: () => zkFairTestnet,
  zkLinkNova: () => zkLinkNova,
  zkLinkNovaSepoliaTestnet: () => zkLinkNovaSepoliaTestnet,
  zkSync: () => zksync,
  zkSyncInMemoryNode: () => zksyncInMemoryNode,
  zkSyncLocalNode: () => zksyncLocalNode,
  zkSyncSepoliaTestnet: () => zksyncSepoliaTestnet,
  zksync: () => zksync,
  zksyncInMemoryNode: () => zksyncInMemoryNode,
  zksyncLocalCustomHyperchain: () => zksyncLocalCustomHyperchain,
  zksyncLocalHyperchain: () => zksyncLocalHyperchain,
  zksyncLocalHyperchainL1: () => zksyncLocalHyperchainL1,
  zksyncLocalNode: () => zksyncLocalNode,
  zksyncSepoliaTestnet: () => zksyncSepoliaTestnet,
  zora: () => zora,
  zoraSepolia: () => zoraSepolia,
  zoraTestnet: () => zoraTestnet
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/abey.js
var abey = /* @__PURE__ */ defineChain({
  id: 179,
  name: "ABEY Mainnet",
  nativeCurrency: { name: "ABEY", symbol: "ABEY", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.abeychain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Abey Scan",
      url: "https://abeyscan.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/constants/number.js
var gasPerPubdataDefault = 50000n;
var maxBytecodeSize = maxUint16 * 32n;

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/formatters.js
var formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatters.transaction?.format(transaction);
        if (formatted.typeHex === "0x71")
          formatted.type = "eip712";
        else if (formatted.typeHex === "0xff")
          formatted.type = "priority";
        return formatted;
      });
      return {
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTimestamp: args.l1BatchTimestamp ? hexToBigInt(args.l1BatchTimestamp) : null,
        transactions
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x71")
        transaction.type = "eip712";
      else if (args.type === "0xff")
        transaction.type = "priority";
      return {
        ...transaction,
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTxIndex: args.l1BatchTxIndex ? hexToBigInt(args.l1BatchTxIndex) : null
      };
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTxIndex: args.l1BatchTxIndex ? hexToBigInt(args.l1BatchTxIndex) : null,
        logs: args.logs.map((log) => {
          return {
            ...formatLog(log),
            l1BatchNumber: log.l1BatchNumber ? hexToBigInt(log.l1BatchNumber) : null,
            transactionLogIndex: hexToNumber(log.transactionLogIndex),
            logType: log.logType
          };
        }),
        l2ToL1Logs: args.l2ToL1Logs.map((l2ToL1Log) => {
          return {
            blockNumber: hexToBigInt(l2ToL1Log.blockHash),
            blockHash: l2ToL1Log.blockHash,
            l1BatchNumber: l2ToL1Log.l1BatchNumber ? hexToBigInt(l2ToL1Log.l1BatchNumber) : null,
            transactionIndex: hexToBigInt(l2ToL1Log.transactionIndex),
            shardId: hexToBigInt(l2ToL1Log.shardId),
            isService: l2ToL1Log.isService,
            sender: l2ToL1Log.sender,
            key: l2ToL1Log.key,
            value: l2ToL1Log.value,
            transactionHash: l2ToL1Log.transactionHash,
            logIndex: hexToBigInt(l2ToL1Log.logIndex)
          };
        })
      };
    }
  }),
  transactionRequest: /* @__PURE__ */ defineTransactionRequest({
    exclude: [
      "customSignature",
      "factoryDeps",
      "gasPerPubdata",
      "paymaster",
      "paymasterInput"
    ],
    format(args) {
      if (args.gasPerPubdata || args.paymaster && args.paymasterInput || args.factoryDeps || args.customSignature)
        return {
          eip712Meta: {
            ...args.gasPerPubdata ? { gasPerPubdata: toHex(args.gasPerPubdata) } : { gasPerPubdata: toHex(gasPerPubdataDefault) },
            ...args.paymaster && args.paymasterInput ? {
              paymasterParams: {
                paymaster: args.paymaster,
                paymasterInput: Array.from(hexToBytes(args.paymasterInput))
              }
            } : {},
            ...args.factoryDeps ? {
              factoryDeps: args.factoryDeps.map((dep) => Array.from(hexToBytes(dep)))
            } : {},
            ...args.customSignature ? {
              customSignature: Array.from(hexToBytes(args.customSignature))
            } : {}
          },
          type: "0x71"
        };
      return {};
    }
  })
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/errors/transaction.js
var InvalidEip712TransactionError = class extends BaseError {
  constructor() {
    super([
      "Transaction is not an EIP712 transaction.",
      "",
      "Transaction must:",
      '  - include `type: "eip712"`',
      "  - include one of the following: `customSignature`, `paymaster`, `paymasterInput`, `gasPerPubdata`, `factoryDeps`"
    ].join("\n"), { name: "InvalidEip712TransactionError" });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/utils/isEip712Transaction.js
function isEIP712Transaction(transaction) {
  if (transaction.type === "eip712")
    return true;
  if ("customSignature" in transaction && transaction.customSignature || "paymaster" in transaction && transaction.paymaster || "paymasterInput" in transaction && transaction.paymasterInput || "gasPerPubdata" in transaction && typeof transaction.gasPerPubdata === "bigint" || "factoryDeps" in transaction && transaction.factoryDeps)
    return true;
  return false;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/utils/assertEip712Transaction.js
function assertEip712Transaction(transaction) {
  const { chainId, to, from, paymaster, paymasterInput } = transaction;
  if (!isEIP712Transaction(transaction))
    throw new InvalidEip712TransactionError();
  if (!chainId || chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (paymaster && !isAddress(paymaster))
    throw new InvalidAddressError({ address: paymaster });
  if (paymaster && !paymasterInput) {
    throw new BaseError("`paymasterInput` must be provided when `paymaster` is defined");
  }
  if (!paymaster && paymasterInput) {
    throw new BaseError("`paymaster` must be provided when `paymasterInput` is defined");
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/serializers.js
function serializeTransaction2(transaction, signature) {
  if (isEIP712Transaction(transaction))
    return serializeTransactionEIP712(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers = {
  transaction: serializeTransaction2
};
function serializeTransactionEIP712(transaction) {
  const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
  assertEip712Transaction(transaction);
  const serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x0",
    toHex(chainId),
    toHex(""),
    toHex(""),
    toHex(chainId),
    from ?? "0x",
    gasPerPubdata ? toHex(gasPerPubdata) : toHex(gasPerPubdataDefault),
    factoryDeps ?? [],
    customSignature ?? "0x",
    // EIP712 signature
    paymaster && paymasterInput ? [paymaster, paymasterInput] : []
  ];
  return concatHex([
    "0x71",
    toRlp(serializedTransaction)
  ]);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/errors/bytecode.js
var BytecodeLengthExceedsMaxSizeError = class extends BaseError {
  constructor({ givenLength, maxBytecodeSize: maxBytecodeSize2 }) {
    super(`Bytecode cannot be longer than ${maxBytecodeSize2} bytes. Given length: ${givenLength}`, { name: "BytecodeLengthExceedsMaxSizeError" });
  }
};
var BytecodeLengthInWordsMustBeOddError = class extends BaseError {
  constructor({ givenLengthInWords }) {
    super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, { name: "BytecodeLengthInWordsMustBeOddError" });
  }
};
var BytecodeLengthMustBeDivisibleBy32Error = class extends BaseError {
  constructor({ givenLength }) {
    super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, { name: "BytecodeLengthMustBeDivisibleBy32Error" });
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/utils/hashBytecode.js
function hashBytecode(bytecode) {
  const bytecodeBytes = toBytes(bytecode);
  if (bytecodeBytes.length % 32 !== 0)
    throw new BytecodeLengthMustBeDivisibleBy32Error({
      givenLength: bytecodeBytes.length
    });
  if (bytecodeBytes.length > maxBytecodeSize)
    throw new BytecodeLengthExceedsMaxSizeError({
      givenLength: bytecodeBytes.length,
      maxBytecodeSize
    });
  const hashStr = sha2562(bytecodeBytes);
  const hash = toBytes(hashStr);
  const bytecodeLengthInWords = bytecodeBytes.length / 32;
  if (bytecodeLengthInWords % 2 === 0) {
    throw new BytecodeLengthInWordsMustBeOddError({
      givenLengthInWords: bytecodeLengthInWords
    });
  }
  const bytecodeLength = toBytes(bytecodeLengthInWords);
  const bytecodeLengthPadded = pad(bytecodeLength, { size: 2 });
  const codeHashVersion = new Uint8Array([1, 0]);
  hash.set(codeHashVersion, 0);
  hash.set(bytecodeLengthPadded, 2);
  return hash;
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/utils/getEip712Domain.js
var getEip712Domain2 = (transaction) => {
  assertEip712Transaction(transaction);
  const message = transactionToMessage(transaction);
  return {
    domain: {
      name: "zkSync",
      version: "2",
      chainId: transaction.chainId
    },
    types: {
      Transaction: [
        { name: "txType", type: "uint256" },
        { name: "from", type: "uint256" },
        { name: "to", type: "uint256" },
        { name: "gasLimit", type: "uint256" },
        { name: "gasPerPubdataByteLimit", type: "uint256" },
        { name: "maxFeePerGas", type: "uint256" },
        { name: "maxPriorityFeePerGas", type: "uint256" },
        { name: "paymaster", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "factoryDeps", type: "bytes32[]" },
        { name: "paymasterInput", type: "bytes" }
      ]
    },
    primaryType: "Transaction",
    message
  };
};
function transactionToMessage(transaction) {
  const { gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
  return {
    txType: 113n,
    from: BigInt(from),
    to: to ? BigInt(to) : 0n,
    gasLimit: gas ?? 0n,
    gasPerPubdataByteLimit: gasPerPubdata ?? gasPerPubdataDefault,
    maxFeePerGas: maxFeePerGas ?? 0n,
    maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0n,
    paymaster: paymaster ? BigInt(paymaster) : 0n,
    nonce: nonce ? BigInt(nonce) : 0n,
    value: value ?? 0n,
    data: data ? data : "0x0",
    factoryDeps: factoryDeps?.map((dep) => toHex(hashBytecode(dep))) ?? [],
    paymasterInput: paymasterInput ? paymasterInput : "0x"
  };
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/zksync/chainConfig.js
var chainConfig = {
  formatters,
  serializers,
  custom: {
    getEip712Domain: getEip712Domain2
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/abstractTestnet.js
var abstractTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 11124,
  name: "Abstract Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://api.testnet.abs.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Abstract Block Explorer",
      url: "https://explorer.testnet.abs.xyz"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963",
      blockCreated: 358349
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 431682
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/acala.js
var acala = /* @__PURE__ */ defineChain({
  id: 787,
  name: "Acala",
  network: "acala",
  nativeCurrency: {
    name: "Acala",
    symbol: "ACA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-acala.aca-api.network"],
      webSocket: ["wss://eth-rpc-acala.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Acala Blockscout",
      url: "https://blockscout.acala.network",
      apiUrl: "https://blockscout.acala.network/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/acria.js
var acria = /* @__PURE__ */ defineChain({
  id: 47,
  name: "Acria IntelliChain",
  nativeCurrency: {
    decimals: 18,
    name: "ACRIA",
    symbol: "ACRIA"
  },
  rpcUrls: {
    default: {
      http: ["https://aic.acria.ai"]
    }
  },
  blockExplorers: {
    default: {
      name: "Acria Explorer",
      url: "https://explorer.acria.ai"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/adf.js
var adf = /* @__PURE__ */ defineChain({
  id: 1215,
  name: "ADF Chain",
  nativeCurrency: { name: "ADDFILL", symbol: "ADF", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.adftechnology.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "ADF Mainnet Explorer",
      url: "https://explorer.adftechnology.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/aioz.js
var aioz = /* @__PURE__ */ defineChain({
  id: 168,
  name: "AIOZ Network",
  nativeCurrency: {
    decimals: 18,
    name: "AIOZ",
    symbol: "AIOZ"
  },
  rpcUrls: {
    default: {
      http: ["https://eth-dataseed.aioz.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "AIOZ Explorer",
      url: "https://explorer.aioz.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/alephZero.js
var alephZero = /* @__PURE__ */ defineChain({
  id: 41455,
  name: "Aleph Zero",
  nativeCurrency: { name: "Aleph Zero", symbol: "AZERO", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.alephzero.raas.gelato.cloud"]
    }
  },
  blockExplorers: {
    default: {
      name: "Aleph Zero EVM Explorer",
      url: "https://evm-explorer.alephzero.org",
      apiUrl: "https://evm-explorer.alephzero.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4603377
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/alienX.js
var alienx = /* @__PURE__ */ defineChain({
  id: 10241024,
  name: "AlienX Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.alienxchain.io/http"] }
  },
  blockExplorers: {
    default: {
      name: "AlienX Explorer",
      url: "https://explorer.alienxchain.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/alienXHalTestnet.js
var alienxHalTestnet = /* @__PURE__ */ defineChain({
  id: 10241025,
  name: "ALIENX Hal Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://hal-rpc.alienxchain.io/http"] }
  },
  blockExplorers: {
    default: {
      name: "AlienX Explorer",
      url: "https://hal-explorer.alienxchain.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/op-stack/contracts.js
var contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/op-stack/formatters.js
var formatters2 = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x7e") {
        transaction.isSystemTx = args.isSystemTx;
        transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
        transaction.sourceHash = args.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
        l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
        l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
        l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
      };
    }
  })
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/op-stack/serializers.js
function serializeTransaction3(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers2 = {
  transaction: serializeTransaction3
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from, gas, isSystemTx, mint: mint2, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from,
    to ?? "0x",
    mint2 ? toHex(mint2) : "0x",
    value ? toHex(value) : "0x",
    gas ? toHex(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data ?? "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from, to } = transaction;
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/op-stack/chainConfig.js
var chainConfig2 = {
  contracts,
  formatters: formatters2,
  serializers: serializers2
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ancient8.js
var sourceId = 1;
var ancient8 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 888888888,
  name: "Ancient8",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 explorer",
      url: "https://scan.ancient8.gg",
      apiUrl: "https://scan.ancient8.gg/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId]: {
        address: "0xB09DC08428C8b4EFB4ff9C0827386CDF34277996"
      }
    },
    portal: {
      [sourceId]: {
        address: "0x639F2AECE398Aa76b07e59eF6abe2cFe32bacb68",
        blockCreated: 19070571
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0xd5e3eDf5b68135D559D572E26bF863FBC1950033",
        blockCreated: 19070571
      }
    }
  },
  sourceId
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ancient8Sepolia.js
var sourceId2 = 11155111;
var ancient8Sepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 28122024,
  name: "Ancient8 Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcv2-testnet.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 Celestia Testnet explorer",
      url: "https://scanv2-testnet.ancient8.gg",
      apiUrl: "https://scanv2-testnet.ancient8.gg/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId2]: {
        address: "0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB"
      }
    },
    portal: {
      [sourceId2]: {
        address: "0xfa1d9E26A6aCD7b22115D27572c1221B9803c960",
        blockCreated: 4972908
      }
    },
    l1StandardBridge: {
      [sourceId2]: {
        address: "0xF6Bc0146d3c74D48306e79Ae134A260E418C9335",
        blockCreated: 4972908
      }
    }
  },
  sourceId: sourceId2
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/anvil.js
var anvil = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/apeChain.js
var sourceId3 = 42161;
var apeChain = /* @__PURE__ */ defineChain({
  id: 33139,
  name: "Ape Chain",
  nativeCurrency: {
    name: "ApeCoin",
    symbol: "APE",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.apechain.com/http"],
      webSocket: ["wss://rpc.apechain.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Apescan",
      url: "https://apescan.io",
      apiUrl: "https://api.apescan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 20889
    }
  },
  sourceId: sourceId3
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/apexTestnet.js
var apexTestnet = /* @__PURE__ */ defineChain({
  id: 3993,
  name: "APEX Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.apexlayer.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-testnet.apexlayer.xyz",
      apiUrl: "https://exp-testnet.apexlayer.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xf7642be33a6b18D16a995657adb5a68CD0438aE2",
      blockCreated: 283775
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/arbitrum.js
var arbitrum = /* @__PURE__ */ defineChain({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/arbitrumGoerli.js
var arbitrumGoerli = /* @__PURE__ */ defineChain({
  id: 421613,
  name: "Arbitrum Goerli",
  nativeCurrency: {
    name: "Arbitrum Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://goerli-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://goerli.arbiscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 88114
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/arbitrumNova.js
var arbitrumNova = /* @__PURE__ */ defineChain({
  id: 42170,
  name: "Arbitrum Nova",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://nova.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://nova.arbiscan.io",
      apiUrl: "https://api-nova.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1746963
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/arbitrumSepolia.js
var arbitrumSepolia = /* @__PURE__ */ defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: {
    name: "Arbitrum Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://sepolia.arbiscan.io",
      apiUrl: "https://api-sepolia.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 81930
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/areonNetwork.js
var areonNetwork = /* @__PURE__ */ defineChain({
  id: 463,
  name: "Areon Network",
  nativeCurrency: { decimals: 18, name: "AREA", symbol: "AREA" },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.areon.network"],
      webSocket: ["wss://mainnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 353286
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/areonNetworkTestnet.js
var areonNetworkTestnet = /* @__PURE__ */ defineChain({
  id: 462,
  name: "Areon Network Testnet",
  nativeCurrency: { decimals: 18, name: "TAREA", symbol: "TAREA" },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.areon.network"],
      webSocket: ["wss://testnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/artelaTestnet.js
var artelaTestnet = /* @__PURE__ */ defineChain({
  id: 11822,
  name: "Artela Testnet",
  nativeCurrency: { name: "ART", symbol: "ART", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://betanet-rpc1.artela.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Artela",
      url: "https://betanet-scan.artela.network",
      apiUrl: "https://betanet-scan.artela.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xd07c8635f76e8745Ee7092fbb6e8fbc5FeF09DD7",
      blockCreated: 7001871
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/arthera.js
var arthera = /* @__PURE__ */ defineChain({
  id: 10242,
  name: "Arthera",
  nativeCurrency: { name: "Arthera", symbol: "AA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.arthera.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arthera EVM Explorer",
      url: "https://explorer.arthera.net",
      apiUrl: "https://explorer.arthera.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4502791
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/assetChain.js
var assetChain = /* @__PURE__ */ defineChain({
  id: 42420,
  name: "AssetChain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Real World Asset",
    symbol: "RWA"
  },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Asset Chain Explorer",
      url: "https://scan.assetchain.org",
      apiUrl: "https://scan.assetchain.org/api"
    }
  },
  testnet: false,
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/assetChainTestnet.js
var assetChainTestnet = /* @__PURE__ */ defineChain({
  id: 42421,
  name: "AssetChain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Real World Asset",
    symbol: "RWA"
  },
  rpcUrls: {
    default: { http: ["https://enugu-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Asset Chain Testnet Explorer",
      url: "https://scan-testnet.assetchain.org",
      apiUrl: "https://scan-testnet.assetchain.org/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x989F832D35988cb5e3eB001Fa2Fe789469EC31Ea",
      blockCreated: 17177
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/astar.js
var astar = /* @__PURE__ */ defineChain({
  id: 592,
  name: "Astar",
  network: "astar-mainnet",
  nativeCurrency: {
    name: "Astar",
    symbol: "ASTR",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://astar.api.onfinality.io/public"] }
  },
  blockExplorers: {
    default: {
      name: "Astar Subscan",
      url: "https://astar.subscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 761794
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/astarZkEVM.js
var astarZkEVM = /* @__PURE__ */ defineChain({
  id: 3776,
  name: "Astar zkEVM",
  network: "AstarZkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-zkevm.astar.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Astar zkEVM Explorer",
      url: "https://astar-zkevm.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 93528
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/astarZkyoto.js
var astarZkyoto = /* @__PURE__ */ defineChain({
  id: 6038361,
  name: "Astar zkEVM Testnet zKyoto",
  network: "zKyoto",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.startale.com/zkyoto"]
    }
  },
  blockExplorers: {
    default: {
      name: "zKyoto Explorer",
      url: "https://zkyoto.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 196153
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/atletaOlympia.js
var atletaOlympia = /* @__PURE__ */ defineChain({
  id: 2340,
  name: "Atleta Olympia",
  nativeCurrency: { decimals: 18, name: "Atla", symbol: "ATLA" },
  rpcUrls: {
    default: {
      http: [
        "https://testnet-rpc.atleta.network:9944",
        "https://testnet-rpc.atleta.network"
      ],
      ws: ["wss://testnet-rpc.atleta.network:9944"]
    }
  },
  blockExplorers: {
    default: {
      name: "Atleta Olympia Explorer",
      url: "https://blockscout.atleta.network",
      apiUrl: "https://blockscout.atleta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x1472ec6392180fb84F345d2455bCC75B26577115",
      blockCreated: 1076473
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/aurora.js
var aurora = /* @__PURE__ */ defineChain({
  id: 1313161554,
  name: "Aurora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://aurorascan.dev",
      apiUrl: "https://aurorascan.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 62907816
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/auroraTestnet.js
var auroraTestnet = /* @__PURE__ */ defineChain({
  id: 1313161555,
  name: "Aurora Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://testnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://testnet.aurorascan.dev",
      apiUrl: "https://testnet.aurorascan.dev/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/auroria.js
var auroria = /* @__PURE__ */ defineChain({
  id: 205205,
  name: "Auroria Testnet",
  network: "auroria",
  nativeCurrency: {
    name: "Auroria Stratis",
    symbol: "tSTRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://auroria.rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Auroria Testnet Explorer",
      url: "https://auroria.explorer.stratisevm.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/avalanche.js
var avalanche = /* @__PURE__ */ defineChain({
  id: 43114,
  name: "Avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://snowtrace.io",
      apiUrl: "https://api.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11907934
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/avalancheFuji.js
var avalancheFuji = /* @__PURE__ */ defineChain({
  id: 43113,
  name: "Avalanche Fuji",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche Fuji",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io",
      apiUrl: "https://api-testnet.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7096959
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/b3.js
var sourceId4 = 8453;
var b3 = /* @__PURE__ */ defineChain({
  id: 8333,
  name: "B3",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.b3.fun/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.b3.fun"
    }
  },
  sourceId: sourceId4
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/b3Sepolia.js
var sourceId5 = 168587773;
var b3Sepolia = /* @__PURE__ */ defineChain({
  id: 1993,
  name: "B3 Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.b3.fun/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.b3.fun"
    }
  },
  testnet: true,
  sourceId: sourceId5
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bahamut.js
var bahamut = /* @__PURE__ */ defineChain({
  id: 5165,
  network: "bahamut",
  name: "Bahamut",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc1.bahamut.io",
        "https://bahamut-rpc.publicnode.com",
        "https://rpc2.bahamut.io"
      ],
      webSocket: [
        "wss://ws1.sahara.bahamutchain.com",
        "wss://bahamut-rpc.publicnode.com",
        "wss://ws2.sahara.bahamutchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://www.ftnscan.com",
      apiUrl: "https://www.ftnscan.com/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/base.js
var sourceId6 = 1;
var base = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId6]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId6]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId6]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId6]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId: sourceId6
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/baseGoerli.js
var sourceId7 = 5;
var baseGoerli = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 84531,
  name: "Base Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://goerli.base.org"] }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://goerli.basescan.org",
      apiUrl: "https://goerli.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId7]: {
        address: "0x2A35891ff30313CcFa6CE88dcf3858bb075A2298"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1376988
    },
    portal: {
      [sourceId7]: {
        address: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"
      }
    },
    l1StandardBridge: {
      [sourceId7]: {
        address: "0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a"
      }
    }
  },
  testnet: true,
  sourceId: sourceId7
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/baseSepolia.js
var sourceId8 = 11155111;
var baseSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 84532,
  network: "base-sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: "https://api-sepolia.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId8]: {
        address: "0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1"
      }
    },
    l2OutputOracle: {
      [sourceId8]: {
        address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
      }
    },
    portal: {
      [sourceId8]: {
        address: "0x49f53e41452c74589e85ca1677426ba426459e85",
        blockCreated: 4446677
      }
    },
    l1StandardBridge: {
      [sourceId8]: {
        address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
        blockCreated: 4446677
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1059647
    }
  },
  testnet: true,
  sourceId: sourceId8
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/beam.js
var beam = /* @__PURE__ */ defineChain({
  id: 4337,
  name: "Beam",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    default: {
      http: ["https://build.onbeam.com/rpc"],
      webSocket: ["wss://build.onbeam.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x4956f15efdc3dc16645e90cc356eafa65ffc65ec",
      blockCreated: 1
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/beamTestnet.js
var beamTestnet = /* @__PURE__ */ defineChain({
  id: 13337,
  name: "Beam Testnet",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    default: {
      http: ["https://build.onbeam.com/rpc/testnet"],
      webSocket: ["wss://build.onbeam.com/ws/testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets-test.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e",
      blockCreated: 3
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bearNetworkChainMainnet.js
var bearNetworkChainMainnet = /* @__PURE__ */ defineChain({
  id: 641230,
  name: "Bear Network Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BearNetworkChain",
    symbol: "BRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-mainnet.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkScan",
      url: "https://brnkscan.bearnetwork.net",
      apiUrl: "https://brnkscan.bearnetwork.net/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bearNetworkChainTestnet.js
var bearNetworkChainTestnet = /* @__PURE__ */ defineChain({
  id: 751230,
  name: "Bear Network Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBRNKC",
    symbol: "tBRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-test.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkTestScan",
      url: "https://brnktest-scan.bearnetwork.net",
      apiUrl: "https://brnktest-scan.bearnetwork.net/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/berachainTestnet.js
var berachainTestnet = /* @__PURE__ */ defineChain({
  id: 80085,
  name: "Berachain Artio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  rpcUrls: {
    default: { http: ["https://artio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain",
      url: "https://artio.beratrail.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/berachainTestnetbArtio.js
var berachainTestnetbArtio = /* @__PURE__ */ defineChain({
  id: 80084,
  name: "Berachain bArtio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 109269
    }
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain bArtio Beratrail",
      url: "https://bartio.beratrail.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bevmMainnet.js
var bevmMainnet = /* @__PURE__ */ defineChain({
  id: 11501,
  name: "BEVM Mainnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet-1.bevm.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bevmscan",
      url: "https://scan-mainnet.bevm.io",
      apiUrl: "https://scan-mainnet-api.bevm.io/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bifrost.js
var bifrost = /* @__PURE__ */ defineChain({
  id: 3068,
  name: "Bifrost Mainnet",
  nativeCurrency: { name: "BFC", symbol: "BFC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://public-01.mainnet.bifrostnetwork.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bifrost Blockscout",
      url: "https://explorer.mainnet.bifrostnetwork.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitgert.js
var bitgert = /* @__PURE__ */ defineChain({
  id: 32520,
  name: "Bitgert Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Brise",
    symbol: "Brise"
  },
  rpcUrls: {
    default: { http: ["https://rpc-bitgert.icecreamswap.com"] }
  },
  blockExplorers: {
    default: {
      name: "Bitgert Scan",
      url: "https://brisescan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2118034
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitkub.js
var bitkub = /* @__PURE__ */ defineChain({
  id: 96,
  name: "Bitkub",
  nativeCurrency: { name: "Bitkub", symbol: "KUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Mainnet Explorer",
      url: "https://www.bkcscan.com",
      apiUrl: "https://www.bkcscan.com/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitkubTestnet.js
var bitkubTestnet = /* @__PURE__ */ defineChain({
  id: 25925,
  name: "Bitkub Testnet",
  network: "Bitkub Testnet",
  nativeCurrency: { name: "Bitkub Test", symbol: "tKUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Testnet Explorer",
      url: "https://testnet.bkcscan.com",
      apiUrl: "https://testnet.bkcscan.com/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitlayer.js
var bitlayer = /* @__PURE__ */ defineChain({
  id: 200901,
  name: "Bitlayer Mainnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitlayer.org"],
      webSocket: ["wss://ws.bitlayer.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "bitlayer mainnet scan",
      url: "https://www.btrscan.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitlayerTestnet.js
var bitlayerTestnet = /* @__PURE__ */ defineChain({
  id: 200810,
  name: "Bitlayer Testnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
      webSocket: ["wss://testnet-ws.bitlayer.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "bitlayer testnet scan",
      url: "https://testnet.btrscan.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitrock.js
var bitrock = /* @__PURE__ */ defineChain({
  id: 7171,
  name: "Bitrock Mainnet",
  nativeCurrency: { name: "BROCK", symbol: "BROCK", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://brockrpc.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitrock Explorer",
      url: "https://explorer.bit-rock.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitTorrent.js
var bitTorrent = /* @__PURE__ */ defineChain({
  id: 199,
  name: "BitTorrent",
  network: "bittorrent-chain-mainnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://bttcscan.com",
      apiUrl: "https://api.bttcscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 31078552
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bitTorrentTestnet.js
var bitTorrentTestnet = /* @__PURE__ */ defineChain({
  id: 1028,
  name: "BitTorrent Chain Testnet",
  network: "bittorrent-chain-testnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testrpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://testnet.bttcscan.com",
      apiUrl: "https://testnet.bttcscan.com/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/blast.js
var sourceId9 = 1;
var blast = /* @__PURE__ */ defineChain({
  id: 81457,
  name: "Blast",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.blast.io"] }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://blastscan.io",
      apiUrl: "https://api.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 212929
    }
  },
  sourceId: sourceId9
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/blastSepolia.js
var sourceId10 = 11155111;
var blastSepolia = /* @__PURE__ */ defineChain({
  id: 168587773,
  name: "Blast Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.blast.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://sepolia.blastscan.io",
      apiUrl: "https://api-sepolia.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 756690
    }
  },
  testnet: true,
  sourceId: sourceId10
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bob.js
var sourceId11 = 1;
var bob = defineChain({
  ...chainConfig2,
  id: 60808,
  name: "BOB",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gobob.xyz"],
      webSocket: ["wss://rpc.gobob.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "BOB Explorer",
      url: "https://explorer.gobob.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 23131
    },
    l2OutputOracle: {
      [sourceId11]: {
        address: "0xdDa53E23f8a32640b04D7256e651C1db98dB11C1",
        blockCreated: 4462615
      }
    },
    portal: {
      [sourceId11]: {
        address: "0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E",
        blockCreated: 4462615
      }
    }
  },
  sourceId: sourceId11
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/boba.js
var boba = /* @__PURE__ */ defineChain({
  id: 288,
  name: "Boba Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.boba.network"] }
  },
  blockExplorers: {
    default: {
      name: "BOBAScan",
      url: "https://bobascan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 446859
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bobaSepolia.js
var bobaSepolia = /* @__PURE__ */ defineChain({
  id: 28882,
  name: "Boba Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://sepolia.boba.network"] }
  },
  blockExplorers: {
    default: {
      name: "BOBAScan",
      url: "https://testnet.bobascan.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bobSepolia.js
var sourceId12 = 11155111;
var bobSepolia = defineChain({
  ...chainConfig2,
  id: 808813,
  name: "BOB Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://bob-sepolia.rpc.gobob.xyz"],
      webSocket: ["wss://bob-sepolia.rpc.gobob.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "BOB Sepolia Explorer",
      url: "https://bob-sepolia.explorer.gobob.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 35677
    },
    l2OutputOracle: {
      [sourceId12]: {
        address: "0x14D0069452b4AE2b250B395b8adAb771E4267d2f",
        blockCreated: 4462615
      }
    },
    portal: {
      [sourceId12]: {
        address: "0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4",
        blockCreated: 4462615
      }
    }
  },
  testnet: true,
  sourceId: sourceId12
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/boolBetaMainnet.js
var boolBetaMainnet = /* @__PURE__ */ defineChain({
  id: 11100,
  name: "Bool Beta Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BOL",
    symbol: "BOL"
  },
  rpcUrls: {
    default: { http: ["https://beta-rpc-node-http.bool.network"] }
  },
  blockExplorers: {
    default: {
      name: "BoolScan",
      url: "https://beta-mainnet.boolscan.com/"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/botanixTestnet.js
var botanixTestnet = /* @__PURE__ */ defineChain({
  id: 3636,
  name: "Botanix Testnet",
  nativeCurrency: { name: "Botanix", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://poa-node.botanixlabs.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://blockscout.botanixlabs.dev",
      apiUrl: "https://blockscout.botanixlabs.dev"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bounceBit.js
var bounceBit = /* @__PURE__ */ defineChain({
  id: 6001,
  name: "BounceBit Mainnet",
  nativeCurrency: { name: "BounceBit", symbol: "BB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://fullnode-mainnet.bouncebitapi.com"] }
  },
  blockExplorers: {
    default: {
      name: "BB Scan",
      url: "https://bbscan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bounceBitTestnet.js
var bounceBitTestnet = /* @__PURE__ */ defineChain({
  id: 6e3,
  name: "BounceBit Testnet",
  nativeCurrency: { name: "BounceBit", symbol: "BB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://fullnode-testnet.bouncebitapi.com"] }
  },
  blockExplorers: {
    default: {
      name: "BB Scan",
      url: "https://testnet.bbscan.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bronos.js
var bronos = /* @__PURE__ */ defineChain({
  id: 1039,
  name: "Bronos",
  nativeCurrency: {
    decimals: 18,
    name: "BRO",
    symbol: "BRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://broscan.bronos.org"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bronosTestnet.js
var bronosTestnet = /* @__PURE__ */ defineChain({
  id: 1038,
  name: "Bronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bronos Coin",
    symbol: "tBRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-testnet.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://tbroscan.bronos.org"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bsc.js
var bsc = /* @__PURE__ */ defineChain({
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/bsc"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bscGreenfield.js
var bscGreenfield = /* @__PURE__ */ defineChain({
  id: 1017,
  name: "BNB Greenfield Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://greenfield-chain.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "BNB Greenfield Mainnet Scan",
      url: "https://greenfieldscan.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bscTestnet.js
var bscTestnet = /* @__PURE__ */ defineChain({
  id: 97,
  name: "Binance Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
      apiUrl: "https://api-testnet.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bsquared.js
var bsquared = /* @__PURE__ */ defineChain({
  id: 223,
  name: "B2",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bsquared.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.bsquared.network"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bsquaredTestnet.js
var bsquaredTestnet = /* @__PURE__ */ defineChain({
  id: 1123,
  name: "B2 Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bsquared.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://testnet-explorer.bsquared.network"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/btr.js
var btr = /* @__PURE__ */ defineChain({
  id: 200901,
  name: "Bitlayer",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.bitlayer.org",
        "https://rpc.bitlayer-rpc.com",
        "https://rpc.ankr.com/bitlayer"
      ],
      webSocket: ["wss://ws.bitlayer.org", "wss://ws.bitlayer-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitlayer(BTR) Scan",
      url: "https://www.btrscan.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/btrTestnet.js
var btrTestnet = /* @__PURE__ */ defineChain({
  id: 200810,
  name: "Bitlayer Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
      webSocket: [
        "wss://testnet-ws.bitlayer.org",
        "wss://testnet-ws.bitlayer-rpc.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitlayer(BTR) Scan",
      url: "https://testnet.btrscan.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bxn.js
var bxn = /* @__PURE__ */ defineChain({
  id: 4999,
  name: "BlackFort Exchange Network",
  nativeCurrency: { name: "BlackFort Token", symbol: "BXN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.blackfort.network",
      apiUrl: "https://explorer.blackfort.network/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/bxnTestnet.js
var bxnTestnet = /* @__PURE__ */ defineChain({
  id: 4777,
  name: "BlackFort Exchange Network Testnet",
  nativeCurrency: {
    name: "BlackFort Testnet Token",
    symbol: "TBXN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.blackfort.network",
      apiUrl: "https://testnet-explorer.blackfort.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cannon.js
var cannon = /* @__PURE__ */ defineChain({
  id: 13370,
  name: "Cannon",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/canto.js
var canto = /* @__PURE__ */ defineChain({
  id: 7700,
  name: "Canto",
  nativeCurrency: {
    decimals: 18,
    name: "Canto",
    symbol: "CANTO"
  },
  rpcUrls: {
    default: { http: ["https://canto.gravitychain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Tuber.Build (Blockscout)",
      url: "https://tuber.build"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2905789
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/celo/fees.js
var fees = {
  /*
     * Estimates the fees per gas for a transaction.
  
     * If the transaction is to be paid in a token (feeCurrency is present) then the fees
     * are estimated in the value of the token. Otherwise falls back to the default
     * estimation by returning null.
     *
     * @param params fee estimation function parameters
     */
  estimateFeesPerGas: async (params) => {
    if (!params.request?.feeCurrency)
      return null;
    const [maxFeePerGas, maxPriorityFeePerGas] = await Promise.all([
      estimateFeePerGasInFeeCurrency(params.client, params.request.feeCurrency),
      estimateMaxPriorityFeePerGasInFeeCurrency(params.client, params.request.feeCurrency)
    ]);
    const suggestedMaxFeePerGas = params.multiply(maxFeePerGas) + maxPriorityFeePerGas;
    return {
      maxFeePerGas: suggestedMaxFeePerGas,
      maxPriorityFeePerGas
    };
  }
};
async function estimateFeePerGasInFeeCurrency(client, feeCurrency) {
  const fee = await client.request({
    method: "eth_gasPrice",
    params: [feeCurrency]
  });
  return BigInt(fee);
}
async function estimateMaxPriorityFeePerGasInFeeCurrency(client, feeCurrency) {
  const feesPerGas = await client.request({
    method: "eth_maxPriorityFeePerGas",
    params: [feeCurrency]
  });
  return BigInt(feesPerGas);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/celo/utils.js
function isEmpty(value) {
  return value === 0 || value === 0n || value === void 0 || value === null || value === "0" || value === "" || typeof value === "string" && (trim(value).toLowerCase() === "0x" || trim(value).toLowerCase() === "0x00");
}
function isPresent(value) {
  return !isEmpty(value);
}
function isEIP1559(transaction) {
  return typeof transaction.maxFeePerGas !== "undefined" && typeof transaction.maxPriorityFeePerGas !== "undefined";
}
function isCIP64(transaction) {
  if (transaction.type === "cip64") {
    return true;
  }
  return isEIP1559(transaction) && isPresent(transaction.feeCurrency);
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/celo/formatters.js
var formatters3 = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        return {
          ...formatted,
          ...transaction.gatewayFee ? {
            gatewayFee: hexToBigInt(transaction.gatewayFee),
            gatewayFeeRecipient: transaction.gatewayFeeRecipient
          } : {},
          feeCurrency: transaction.feeCurrency
        };
      });
      return {
        transactions,
        ...args.randomness ? { randomness: args.randomness } : {}
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      if (args.type === "0x7e")
        return {
          isSystemTx: args.isSystemTx,
          mint: args.mint ? hexToBigInt(args.mint) : void 0,
          sourceHash: args.sourceHash,
          type: "deposit"
        };
      const transaction = { feeCurrency: args.feeCurrency };
      if (args.type === "0x7b")
        transaction.type = "cip64";
      else {
        if (args.type === "0x7c")
          transaction.type = "cip42";
        transaction.gatewayFee = args.gatewayFee ? hexToBigInt(args.gatewayFee) : null;
        transaction.gatewayFeeRecipient = args.gatewayFeeRecipient;
      }
      return transaction;
    }
  }),
  transactionRequest: /* @__PURE__ */ defineTransactionRequest({
    format(args) {
      const request = {};
      if (args.feeCurrency)
        request.feeCurrency = args.feeCurrency;
      if (isCIP64(args))
        request.type = "0x7b";
      return request;
    }
  })
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/celo/serializers.js
function serializeTransaction4(transaction, signature) {
  if (isCIP64(transaction))
    return serializeTransactionCIP64(transaction, signature);
  return serializeTransaction3(transaction, signature);
}
var serializers3 = {
  transaction: serializeTransaction4
};
function serializeTransactionCIP64(transaction, signature) {
  assertTransactionCIP64(transaction);
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, feeCurrency, data } = transaction;
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializeAccessList(accessList),
    feeCurrency,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x7b",
    toRlp(serializedTransaction)
  ]);
}
var MAX_MAX_FEE_PER_GAS = maxUint256;
function assertTransactionCIP64(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, feeCurrency } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (gasPrice)
    throw new BaseError("`gasPrice` is not a valid CIP-64 Transaction attribute.");
  if (isPresent(maxFeePerGas) && maxFeePerGas > MAX_MAX_FEE_PER_GAS)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (isPresent(maxPriorityFeePerGas) && isPresent(maxFeePerGas) && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  if (isPresent(feeCurrency) && !isAddress(feeCurrency)) {
    throw new BaseError("`feeCurrency` MUST be a token address for CIP-64 transactions.");
  }
  if (isEmpty(feeCurrency)) {
    throw new BaseError("`feeCurrency` must be provided for CIP-64 transactions.");
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/celo/chainConfig.js
var chainConfig3 = {
  contracts,
  formatters: formatters3,
  serializers: serializers3,
  fees
};

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/celo.js
var celo = /* @__PURE__ */ defineChain({
  ...chainConfig3,
  id: 42220,
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO"
  },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] }
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://celoscan.io",
      apiUrl: "https://api.celoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13112599
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/celoAlfajores.js
var sourceId13 = 17e3;
var celoAlfajores = /* @__PURE__ */ defineChain({
  ...chainConfig3,
  id: 44787,
  name: "Alfajores",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "A-CELO"
  },
  rpcUrls: {
    default: {
      http: ["https://alfajores-forno.celo-testnet.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Celo Alfajores Explorer",
      url: "https://celo-alfajores.blockscout.com",
      apiUrl: "https://celo-alfajores.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig3.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 14569001
    },
    portal: {
      [sourceId13]: {
        address: "0x82527353927d8D069b3B452904c942dA149BA381",
        blockCreated: 2411324
      }
    },
    disputeGameFactory: {
      [sourceId13]: {
        address: "0xE28AAdcd9883746c0e5068F58f9ea06027b214cb",
        blockCreated: 2411324
      }
    },
    l2OutputOracle: {
      [sourceId13]: {
        address: "0x4a2635e9e4f6e45817b1D402ac4904c1d1752438",
        blockCreated: 2411324
      }
    },
    l1StandardBridge: {
      [sourceId13]: {
        address: "0xD1B0E0581973c9eB7f886967A606b9441A897037",
        blockCreated: 2411324
      }
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/chang.js
var chang = /* @__PURE__ */ defineChain({
  id: 5858,
  name: "Chang Chain Foundation Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "CTH",
    symbol: "CTH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.cthscan.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chang Chain explorer",
      url: "https://cthscan.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/chiliz.js
var chiliz = /* @__PURE__ */ defineChain({
  id: 88888,
  name: "Chiliz Chain",
  network: "chiliz-chain",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/chiliz",
        "https://chiliz-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "https://scan.chiliz.com",
      apiUrl: "https://scan.chiliz.com/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/chips.js
var chips = /* @__PURE__ */ defineChain({
  id: 2882,
  name: "Chips Network",
  network: "CHIPS",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: [
        "https://node.chips.ooo/wasp/api/v1/chains/iota1pp3d3mnap3ufmgqnjsnw344sqmf5svjh26y2khnmc89sv6788y3r207a8fn/evm"
      ]
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/classic.js
var classic = /* @__PURE__ */ defineChain({
  id: 61,
  name: "Ethereum Classic",
  nativeCurrency: {
    decimals: 18,
    name: "ETC",
    symbol: "ETC"
  },
  rpcUrls: {
    default: { http: ["https://etc.rivet.link"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.com/etc/mainnet"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/coinbit.js
var coinbit = /* @__PURE__ */ defineChain({
  id: 112,
  name: "Coinbit Mainnet",
  nativeCurrency: { name: "GIDR", symbol: "GIDR", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://coinbit-rpc-mainnet.chain.sbcrypto.app"]
    }
  },
  blockExplorers: {
    default: {
      name: "Coinbit Explorer",
      url: "https://coinbit-explorer.chain.sbcrypto.app"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/coinex.js
var coinex = /* @__PURE__ */ defineChain({
  id: 52,
  name: "CoinEx Mainnet",
  nativeCurrency: { name: "cet", symbol: "cet", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.coinex.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "CoinEx Explorer",
      url: "https://www.coinex.net"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/confluxESpace.js
var confluxESpace = /* @__PURE__ */ defineChain({
  id: 1030,
  name: "Conflux eSpace",
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm.confluxrpc.com"],
      webSocket: ["wss://evm.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evm.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 68602935
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/confluxESpaceTestnet.js
var confluxESpaceTestnet = /* @__PURE__ */ defineChain({
  id: 71,
  name: "Conflux eSpace Testnet",
  network: "cfx-espace-testnet",
  testnet: true,
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmtestnet.confluxrpc.com"],
      webSocket: ["wss://evmtestnet.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evmtestnet.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 117499050
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/coreDao.js
var coreDao = /* @__PURE__ */ defineChain({
  id: 1116,
  name: "Core Dao",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE"
  },
  rpcUrls: {
    default: { http: ["https://rpc.coredao.org"] }
  },
  blockExplorers: {
    default: {
      name: "CoreDao",
      url: "https://scan.coredao.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 11907934
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/corn.js
var sourceId14 = 1;
var corn = /* @__PURE__ */ defineChain({
  id: 21e6,
  name: "Corn",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcorn",
    symbol: "BTCN"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/corn_maizenet"] }
  },
  blockExplorers: {
    default: {
      name: "Corn Explorer",
      url: "https://cornscan.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/21000000/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3228
    }
  },
  sourceId: sourceId14
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cornTestnet.js
var sourceId15 = 11155111;
var cornTestnet = /* @__PURE__ */ defineChain({
  id: 21000001,
  name: "Corn Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcorn",
    symbol: "BTCN"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/corn_testnet"] }
  },
  blockExplorers: {
    default: {
      name: "Corn Testnet Explorer",
      url: "https://testnet.cornscan.io",
      apiUrl: "https://api.routescan.io/v2/network/testnet/evm/21000001/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4886
    }
  },
  testnet: true,
  sourceId: sourceId15
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/crab.js
var crab = defineChain({
  id: 44,
  name: "Crab Network",
  nativeCurrency: {
    decimals: 18,
    name: "Crab Network Native Token",
    symbol: "CRAB"
  },
  rpcUrls: {
    default: {
      http: ["https://crab-rpc.darwinia.network"],
      webSocket: ["wss://crab-rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://crab-scan.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3032593
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/creatorTestnet.js
var creatorTestnet = defineChain({
  id: 66665,
  name: "Creator",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.creatorchain.io"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.creatorchain.io" }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cronos.js
var cronos = /* @__PURE__ */ defineChain({
  id: 25,
  name: "Cronos Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://explorer.cronos.org",
      apiUrl: "https://explorer-api.cronos.org/mainnet/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1963112
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cronosTestnet.js
var cronosTestnet = /* @__PURE__ */ defineChain({
  id: 338,
  name: "Cronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CRO",
    symbol: "tCRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-t3.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://cronos.org/explorer/testnet3"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 10191251
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cronoszkEVM.js
var cronoszkEVM = /* @__PURE__ */ defineChain({
  id: 388,
  name: "Cronos zkEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos zkEVM CRO",
    symbol: "zkCRO"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.zkevm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos zkEVM (Mainnet) Chain Explorer",
      url: "https://explorer.zkevm.cronos.org"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cronoszkEVMTestnet.js
var cronoszkEVMTestnet = /* @__PURE__ */ defineChain({
  id: 282,
  name: "Cronos zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos zkEVM Test Coin",
    symbol: "zkTCRO"
  },
  rpcUrls: {
    default: { http: ["https://testnet.zkevm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos zkEVM Testnet Explorer",
      url: "https://explorer.zkevm.cronos.org/testnet"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/crossbell.js
var crossbell = /* @__PURE__ */ defineChain({
  id: 3737,
  name: "Crossbell",
  nativeCurrency: {
    decimals: 18,
    name: "CSB",
    symbol: "CSB"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.crossbell.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "CrossScan",
      url: "https://scan.crossbell.io",
      apiUrl: "https://scan.crossbell.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 38246031
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/curtis.js
var curtis = /* @__PURE__ */ defineChain({
  id: 33111,
  name: "Curtis",
  nativeCurrency: { name: "ApeCoin", symbol: "APE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.curtis.apechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Curtis Explorer",
      url: "https://explorer.curtis.apechain.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cyber.js
var cyber = /* @__PURE__ */ defineChain({
  id: 7560,
  name: "Cyber",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://cyberscan.co",
      apiUrl: "https://cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/cyberTestnet.js
var cyberTestnet = /* @__PURE__ */ defineChain({
  id: 111557560,
  name: "Cyber Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet.cyberscan.co",
      apiUrl: "https://testnet.cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xffc391F0018269d4758AEA1a144772E8FB99545E",
      blockCreated: 304545
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dailyNetwork.js
var dailyNetwork = /* @__PURE__ */ defineChain({
  id: 824,
  name: "Daily Network Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Daily",
    symbol: "DLY"
  },
  rpcUrls: {
    default: { http: ["https://rpc.mainnet.dailycrypto.net"] }
  },
  blockExplorers: {
    default: {
      name: "Daily Mainnet Explorer",
      url: "https://explorer.mainnet.dailycrypto.net"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dailyNetworkTestnet.js
var dailyNetworkTestnet = /* @__PURE__ */ defineChain({
  id: 825,
  name: "Daily Network Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Daily",
    symbol: "DLY"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.dailycrypto.net"] }
  },
  blockExplorers: {
    default: {
      name: "Daily Testnet Explorer",
      url: "https://explorer.testnet.dailycrypto.net"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/darwinia.js
var darwinia = /* @__PURE__ */ defineChain({
  id: 46,
  name: "Darwinia Network",
  nativeCurrency: {
    decimals: 18,
    name: "RING",
    symbol: "RING"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.darwinia.network"],
      webSocket: ["wss://rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 69420
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dchain.js
var dchain = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2716446429837e3,
  name: "Dchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dchain-2716446429837000-1.jsonrpc.sagarpc.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchain-2716446429837000-1.sagaexplorer.io",
      apiUrl: "https://api-dchain-2716446429837000-1.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dchainTestnet.js
var dchainTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2713017997578e3,
  name: "Dchain Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io",
      apiUrl: "https://api-dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/defichainEvm.js
var defichainEvm = /* @__PURE__ */ defineChain({
  id: 1130,
  network: "defichain-evm",
  name: "DeFiChain EVM Mainnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.mainnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 137852
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/defichainEvmTestnet.js
var defichainEvmTestnet = /* @__PURE__ */ defineChain({
  id: 1131,
  network: "defichain-evm-testnet",
  name: "DeFiChain EVM Testnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.testnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live/?network=TestNet"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 156462
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/degen.js
var degen = /* @__PURE__ */ defineChain({
  id: 666666666,
  name: "Degen",
  nativeCurrency: {
    decimals: 18,
    name: "Degen",
    symbol: "DEGEN"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.degen.tips"],
      webSocket: ["wss://rpc.degen.tips"]
    }
  },
  blockExplorers: {
    default: {
      name: "Degen Chain Explorer",
      url: "https://explorer.degen.tips",
      apiUrl: "https://explorer.degen.tips/api/v2"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dfk.js
var dfk = /* @__PURE__ */ defineChain({
  id: 53935,
  name: "DFK Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Jewel",
    symbol: "JEWEL"
  },
  rpcUrls: {
    default: {
      http: ["https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "DFKSubnetScan",
      url: "https://subnets.avax.network/defi-kingdoms"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14790551
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/diode.js
var diode = /* @__PURE__ */ defineChain({
  id: 15,
  name: "Diode Prenet",
  nativeCurrency: {
    decimals: 18,
    name: "DIODE",
    symbol: "DIODE"
  },
  rpcUrls: {
    default: {
      http: ["https://prenet.diode.io:8443"],
      webSocket: ["wss://prenet.diode.io:8443/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Diode Explorer",
      url: "https://diode.io/prenet"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/disChain.js
var disChain = /* @__PURE__ */ defineChain({
  id: 513100,
  name: "DisChain",
  nativeCurrency: {
    decimals: 18,
    name: "DIS",
    symbol: "DIS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.dischain.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "DisChain Explorer",
      url: "https://www.oklink.com/dis"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dodochainTestnet.js
var dodochainTestnet = defineChain({
  id: 53457,
  name: "DODOchain Testnet",
  nativeCurrency: { decimals: 18, name: "DODO", symbol: "DODO" },
  rpcUrls: {
    default: {
      http: ["https://dodochain-testnet.alt.technology"],
      webSocket: ["wss://dodochain-testnet.alt.technology/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "DODOchain Testnet (Sepolia) Explorer",
      url: "https://testnet-scan.dodochain.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dogechain.js
var dogechain = /* @__PURE__ */ defineChain({
  id: 2e3,
  name: "Dogechain",
  nativeCurrency: {
    decimals: 18,
    name: "Wrapped Dogecoin",
    symbol: "WDOGE"
  },
  rpcUrls: {
    default: { http: ["https://rpc.dogechain.dog"] }
  },
  blockExplorers: {
    default: {
      name: "DogeChainExplorer",
      url: "https://explorer.dogechain.dog",
      apiUrl: "https://explorer.dogechain.dog/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x68a8609a60a008EFA633dfdec592c03B030cC508",
      blockCreated: 25384031
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dosChain.js
var dosChain = /* @__PURE__ */ defineChain({
  id: 7979,
  name: "DOS Chain",
  nativeCurrency: {
    decimals: 18,
    name: "DOS Chain",
    symbol: "DOS"
  },
  rpcUrls: {
    default: { http: ["https://main.doschain.com"] }
  },
  blockExplorers: {
    default: {
      name: "DOS Chain Explorer",
      url: "https://doscan.io",
      apiUrl: "https://api.doscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 161908
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dosChainTestnet.js
var dosChainTestnet = /* @__PURE__ */ defineChain({
  id: 3939,
  name: "DOS Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "DOS Chain Testnet",
    symbol: "DOS"
  },
  rpcUrls: {
    default: { http: ["https://test.doschain.com"] }
  },
  blockExplorers: {
    default: {
      name: "DOS Chain Testnet Explorer",
      url: "https://test.doscan.io",
      apiUrl: "https://api-test.doscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 69623
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dreyerxMainnet.js
var dreyerxMainnet = /* @__PURE__ */ defineChain({
  id: 23451,
  name: "DreyerX Mainnet",
  nativeCurrency: {
    name: "DreyerX",
    symbol: "DRX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.dreyerx.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DreyerX Scan",
      url: "https://scan.dreyerx.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dreyerxTestnet.js
var dreyerxTestnet = /* @__PURE__ */ defineChain({
  id: 23452,
  name: "DreyerX Testnet",
  nativeCurrency: {
    name: "DreyerX",
    symbol: "DRX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["http://testnet-rpc.dreyerx.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DreyerX Testnet Scan",
      url: "https://testnet-scan.dreyerx.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dustboyIoT.js
var dustboyIoT = /* @__PURE__ */ defineChain({
  id: 555888,
  name: "DustBoy IoT",
  nativeCurrency: { name: "Ether", symbol: "DST", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dustboy-rpc.jibl2.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://dustboy.jibl2.com",
      apiUrl: "https://dustboy.jibl2.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xFFD34aa2C62B2D52E00A361e466C229788f4eD6a",
      blockCreated: 526569
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/dymension.js
var dymension = /* @__PURE__ */ defineChain({
  id: 1100,
  name: "Dymension",
  nativeCurrency: {
    name: "DYM",
    symbol: "DYM",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://dymension-evm-rpc.publicnode.com"],
      webSocket: ["wss://dymension-evm-rpc.publicnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Dym FYI",
      url: "https://dym.fyi"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/edgeless.js
var edgeless = /* @__PURE__ */ defineChain({
  id: 2026,
  name: "Edgeless Network",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.edgeless.network/http"],
      webSocket: ["wss://rpc.edgeless.network/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Explorer",
      url: "https://explorer.edgeless.network"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/edgelessTestnet.js
var edgelessTestnet = /* @__PURE__ */ defineChain({
  id: 202,
  name: "Edgeless Testnet",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://edgeless-testnet.rpc.caldera.xyz/http"],
      webSocket: ["wss://edgeless-testnet.rpc.caldera.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Testnet Explorer",
      url: "https://testnet.explorer.edgeless.network"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/edgeware.js
var edgeware = /* @__PURE__ */ defineChain({
  id: 2021,
  name: "Edgeware EdgeEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Edgeware",
    symbol: "EDG"
  },
  rpcUrls: {
    default: { http: ["https://edgeware-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://edgscan.live",
      apiUrl: "https://edgscan.live/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18117872
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/edgewareTestnet.js
var edgewareTestnet = /* @__PURE__ */ defineChain({
  id: 2022,
  name: "Beresheet BereEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet EDG",
    symbol: "tEDG"
  },
  rpcUrls: {
    default: { http: ["https://beresheet-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://testnet.edgscan.live",
      apiUrl: "https://testnet.edgscan.live/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ekta.js
var ekta = /* @__PURE__ */ defineChain({
  id: 1994,
  name: "Ekta",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://main.ekta.io"] }
  },
  blockExplorers: {
    default: {
      name: "Ektascan",
      url: "https://ektascan.io",
      apiUrl: "https://ektascan.io/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ektaTestnet.js
var ektaTestnet = /* @__PURE__ */ defineChain({
  id: 1004,
  name: "Ekta Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://test.ekta.io:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Test Ektascan",
      url: "https://test.ektascan.io",
      apiUrl: "https://test.ektascan.io/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/elastos.js
var elastos = /* @__PURE__ */ defineChain({
  id: 20,
  name: "Elastos Smart Chain",
  nativeCurrency: { name: "ELA", symbol: "ELA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api2.elastos.io/eth"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elastos Explorer",
      url: "https://esc.elastos.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/elastosTestnet.js
var elastosTestnet = /* @__PURE__ */ defineChain({
  id: 21,
  name: "Elastos Smart Chain Testnet",
  nativeCurrency: { name: "tELA", symbol: "tELA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api-testnet.elastos.io/eth"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elastos Explorer",
      url: "https://esc-testnet.elastos.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/electroneum.js
var electroneum = /* @__PURE__ */ defineChain({
  id: 52014,
  name: "Electroneum Mainnet",
  nativeCurrency: {
    name: "ETN",
    symbol: "ETN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.electroneum.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Electroneum Block Explorer",
      url: "https://blockexplorer.electroneum.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/electroneumTestnet.js
var electroneumTestnet = /* @__PURE__ */ defineChain({
  id: 5201420,
  name: "Electroneum Testnet",
  nativeCurrency: {
    name: "ETN",
    symbol: "ETN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.electroneum.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Electroneum Block Explorer",
      url: "https://blockexplorer.thesecurityteam.rocks"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/elysiumTestnet.js
var elysiumTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1338,
  name: "Elysium Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LAVA",
    symbol: "LAVA"
  },
  rpcUrls: {
    default: {
      http: ["https://elysium-test-rpc.vulcanforged.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elysium testnet explorer",
      url: "https://elysium-explorer.vulcanforged.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/energy.js
var energy = /* @__PURE__ */ defineChain({
  id: 246,
  name: "Energy Mainnet",
  nativeCurrency: { name: "EWT", symbol: "EWT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.energyweb.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "EnergyWeb Explorer",
      url: "https://explorer.energyweb.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/enuls.js
var enuls = /* @__PURE__ */ defineChain({
  id: 119,
  name: "ENULS Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "NULS",
    symbol: "NULS"
  },
  rpcUrls: {
    default: { http: ["https://evmapi2.nuls.io"] }
  },
  blockExplorers: {
    default: {
      name: "ENULS Explorer",
      url: "https://evmscan.nuls.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/eon.js
var eon = /* @__PURE__ */ defineChain({
  id: 7332,
  name: "Horizen EON",
  nativeCurrency: {
    decimals: 18,
    name: "ZEN",
    symbol: "ZEN"
  },
  rpcUrls: {
    default: { http: ["https://eon-rpc.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "EON Explorer",
      url: "https://eon-explorer.horizenlabs.io"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/eos.js
var eos = /* @__PURE__ */ defineChain({
  id: 17777,
  name: "EOS EVM",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Explorer",
      url: "https://explorer.evm.eosnetwork.com",
      apiUrl: "https://explorer.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7943933
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/eosTestnet.js
var eosTestnet = /* @__PURE__ */ defineChain({
  id: 15557,
  name: "EOS EVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.testnet.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Testnet Explorer",
      url: "https://explorer.testnet.evm.eosnetwork.com",
      apiUrl: "https://explorer.testnet.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9067940
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/etherlink.js
var etherlink = /* @__PURE__ */ defineChain({
  id: 42793,
  name: "Etherlink",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ"
  },
  rpcUrls: {
    default: { http: ["https://node.mainnet.etherlink.com"] }
  },
  blockExplorers: {
    default: {
      name: "Etherlink",
      url: "https://explorer.etherlink.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 33899
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/etherlinkTestnet.js
var etherlinkTestnet = /* @__PURE__ */ defineChain({
  id: 128123,
  name: "Etherlink Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ"
  },
  rpcUrls: {
    default: { http: ["https://node.ghostnet.etherlink.com"] }
  },
  blockExplorers: {
    default: {
      name: "Etherlink Testnet",
      url: "https://testnet-explorer.etherlink.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/evmos.js
var evmos = /* @__PURE__ */ defineChain({
  id: 9001,
  name: "Evmos",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Block Explorer",
      url: "https://escan.live"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/evmosTestnet.js
var evmosTestnet = /* @__PURE__ */ defineChain({
  id: 9e3,
  name: "Evmos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.dev:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Testnet Block Explorer",
      url: "https://evm.evmos.dev/"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/excelonMainnet.js
var excelonMainnet = /* @__PURE__ */ defineChain({
  id: 22052002,
  name: "Excelon Mainnet",
  network: "XLON",
  nativeCurrency: {
    decimals: 18,
    name: "Excelon",
    symbol: "xlon"
  },
  rpcUrls: {
    default: {
      http: ["https://edgewallet1.xlon.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Excelon explorer",
      url: "https://explorer.excelon.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/expanse.js
var expanse = /* @__PURE__ */ defineChain({
  id: 2,
  name: "Expanse Network",
  nativeCurrency: {
    decimals: 18,
    name: "EXP",
    symbol: "EXP"
  },
  rpcUrls: {
    default: { http: ["https://node.expanse.tech"] }
  },
  blockExplorers: {
    default: {
      name: "Expanse Explorer",
      url: "https://explorer.expanse.tech"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fantom.js
var fantom = /* @__PURE__ */ defineChain({
  id: 250,
  name: "Fantom",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/fantom"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com",
      apiUrl: "https://api.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 33001987
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fantomSonicTestnet.js
var fantomSonicTestnet = /* @__PURE__ */ defineChain({
  id: 64240,
  name: "Fantom Sonic Open Testnet",
  network: "fantom-sonic-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpcapi.sonic.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "Fantom Sonic Open Testnet Explorer",
      url: "https://public-sonic.fantom.network"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fantomTestnet.js
var fantomTestnet = /* @__PURE__ */ defineChain({
  id: 4002,
  name: "Fantom Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://testnet.ftmscan.com",
      apiUrl: "https://testnet.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 8328688
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fibo.js
var fibo = /* @__PURE__ */ defineChain({
  id: 12306,
  name: "Fibo Chain",
  nativeCurrency: {
    decimals: 18,
    name: "fibo",
    symbol: "FIBO"
  },
  rpcUrls: {
    default: { http: ["https://network.hzroc.art"] }
  },
  blockExplorers: {
    default: {
      name: "FiboScan",
      url: "https://scan.fibochain.org"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/filecoin.js
var filecoin = /* @__PURE__ */ defineChain({
  id: 314,
  name: "Filecoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "filecoin",
    symbol: "FIL"
  },
  rpcUrls: {
    default: { http: ["https://api.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://filfox.info/en"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3328594
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/filecoinCalibration.js
var filecoinCalibration = /* @__PURE__ */ defineChain({
  id: 314159,
  name: "Filecoin Calibration",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filscan",
      url: "https://calibration.filscan.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/filecoinHyperspace.js
var filecoinHyperspace = /* @__PURE__ */ defineChain({
  id: 3141,
  name: "Filecoin Hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.hyperspace.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://hyperspace.filfox.info/en"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/5ireChain.js
var fireChain = /* @__PURE__ */ defineChain({
  id: 995,
  name: "5ireChain",
  nativeCurrency: { name: "5ire Token", symbol: "5IRE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.5ire.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "5ireChain Mainnet Explorer",
      url: "https://5irescan.io/"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/flare.js
var flare = /* @__PURE__ */ defineChain({
  id: 14,
  name: "Flare Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flare",
    symbol: "FLR"
  },
  rpcUrls: {
    default: { http: ["https://flare-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Flare Explorer",
      url: "https://flare-explorer.flare.network",
      apiUrl: "https://flare-explorer.flare.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3002461
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/flareTestnet.js
var flareTestnet = /* @__PURE__ */ defineChain({
  id: 114,
  name: "Flare Testnet Coston2",
  nativeCurrency: {
    decimals: 18,
    name: "Coston2 Flare",
    symbol: "C2FLR"
  },
  rpcUrls: {
    default: { http: ["https://coston2-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston2 Explorer",
      url: "https://coston2-explorer.flare.network",
      apiUrl: "https://coston2-explorer.flare.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/flowMainnet.js
var flowMainnet = /* @__PURE__ */ defineChain({
  id: 747,
  name: "Flow EVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mainnet Explorer",
      url: "https://flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6205
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/flowPreviewnet.js
var flowPreviewnet = /* @__PURE__ */ defineChain({
  id: 646,
  name: "Flow EVM Previewnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Previewnet Explorer",
      url: "https://previewnet.flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6205
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/flowTestnet.js
var flowTestnet = /* @__PURE__ */ defineChain({
  id: 545,
  name: "Flow EVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Flow Diver",
      url: "https://testnet.flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 137518
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fluence.js
var fluence = /* @__PURE__ */ defineChain({
  id: 9999999,
  name: "Fluence",
  nativeCurrency: { name: "FLT", symbol: "FLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.fluence.dev"],
      webSocket: ["wss://ws.mainnet.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.mainnet.fluence.dev",
      apiUrl: "https://blockscout.mainnet.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 207583
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fluenceStage.js
var fluenceStage = /* @__PURE__ */ defineChain({
  id: 123420000220,
  name: "Fluence Stage",
  nativeCurrency: { name: "tFLT", symbol: "tFLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.stage.fluence.dev"],
      webSocket: ["wss://ws.stage.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.stage.fluence.dev",
      apiUrl: "https://blockscout.stage.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 83227
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fluenceTestnet.js
var fluenceTestnet = /* @__PURE__ */ defineChain({
  id: 52164803,
  name: "Fluence Testnet",
  nativeCurrency: { name: "tFLT", symbol: "tFLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.fluence.dev"],
      webSocket: ["wss://ws.testnet.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.testnet.fluence.dev",
      apiUrl: "https://blockscout.testnet.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96424
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/forma.js
var forma = /* @__PURE__ */ defineChain({
  id: 984122,
  name: "Forma",
  network: "forma",
  nativeCurrency: {
    symbol: "TIA",
    name: "TIA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.forma.art"],
      webSocket: ["wss://ws.forma.art"]
    }
  },
  blockExplorers: {
    default: {
      name: "Forma Explorer",
      url: "https://explorer.forma.art"
    }
  },
  contracts: {
    multicall3: {
      address: "0xd53C6FFB123F7349A32980F87faeD8FfDc9ef079",
      blockCreated: 252705
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/foundry.js
var foundry = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Foundry",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fraxtal.js
var sourceId16 = 1;
var fraxtal = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 252,
  name: "Fraxtal",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan",
      url: "https://fraxscan.com",
      apiUrl: "https://api.fraxscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId16]: {
        address: "0x66CC916Ed5C6C2FA97014f7D1cD141528Ae171e4"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId16]: {
        address: "0x36cb65c1967A0Fb0EEE11569C51C2f2aA1Ca6f6D",
        blockCreated: 19135323
      }
    },
    l1StandardBridge: {
      [sourceId16]: {
        address: "0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2",
        blockCreated: 19135323
      }
    }
  },
  sourceId: sourceId16
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fraxtalTestnet.js
var sourceId17 = 17e3;
var fraxtalTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2522,
  name: "Fraxtal Testnet",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan testnet",
      url: "https://holesky.fraxscan.com",
      apiUrl: "https://api-holesky.fraxscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId17]: {
        address: "0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId17]: {
        address: "0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d",
        blockCreated: 318416
      }
    },
    l1StandardBridge: {
      [sourceId17]: {
        address: "0x0BaafC217162f64930909aD9f2B27125121d6332",
        blockCreated: 318416
      }
    }
  },
  sourceId: sourceId17
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/funkiMainnet.js
var sourceId18 = 1;
var funkiMainnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 33979,
  name: "Funki",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.funkichain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Funki Mainnet Explorer",
      url: "https://funkiscan.io"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  },
  sourceId: sourceId18
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/funkiSepolia.js
var sourceId19 = 11155111;
var funkiSepolia = defineChain({
  ...chainConfig2,
  id: 3397901,
  network: "funkiSepolia",
  name: "Funki Sepolia Sandbox",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://funki-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Funki Sepolia Sandbox Explorer",
      url: "https://sepolia-sandbox.funkichain.com/"
    }
  },
  testnet: true,
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    }
  },
  sourceId: sourceId19
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fuse.js
var fuse = /* @__PURE__ */ defineChain({
  id: 122,
  name: "Fuse",
  nativeCurrency: { name: "Fuse", symbol: "FUSE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fuse.io"] }
  },
  blockExplorers: {
    default: {
      name: "Fuse Explorer",
      url: "https://explorer.fuse.io",
      apiUrl: "https://explorer.fuse.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 16146628
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fuseSparknet.js
var fuseSparknet = /* @__PURE__ */ defineChain({
  id: 123,
  name: "Fuse Sparknet",
  nativeCurrency: { name: "Spark", symbol: "SPARK", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fusespark.io"] }
  },
  blockExplorers: {
    default: {
      name: "Sparkent Explorer",
      url: "https://explorer.fusespark.io",
      apiUrl: "https://explorer.fusespark.io/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fusion.js
var fusion = /* @__PURE__ */ defineChain({
  id: 32659,
  name: "Fusion Mainnet",
  nativeCurrency: { name: "Fusion", symbol: "FSN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.fusionnetwork.io"],
      webSocket: ["wss://mainnet.fusionnetwork.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "FSNscan",
      url: "https://fsnscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10441605
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/fusionTestnet.js
var fusionTestnet = /* @__PURE__ */ defineChain({
  id: 46688,
  name: "Fusion Testnet",
  nativeCurrency: { name: "Fusion", symbol: "FSN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.fusionnetwork.io"],
      webSocket: ["wss://testnet.fusionnetwork.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "FSNscan",
      url: "https://testnet.fsnscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10428309
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/garnet.js
var sourceId20 = 17e3;
var garnet = defineChain({
  ...chainConfig2,
  name: "Garnet Testnet",
  testnet: true,
  id: 17069,
  sourceId: sourceId20,
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.garnetchain.com"],
      webSocket: ["wss://rpc.garnetchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.garnetchain.com"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId20]: {
        address: "0x57ee40586fbE286AfC75E67cb69511A6D9aF5909",
        blockCreated: 1274684
      }
    },
    l2OutputOracle: {
      [sourceId20]: {
        address: "0xCb8E7AC561b8EF04F2a15865e9fbc0766FEF569B",
        blockCreated: 1274684
      }
    },
    l1StandardBridge: {
      [sourceId20]: {
        address: "0x09bcDd311FE398F80a78BE37E489f5D440DB95DE",
        blockCreated: 1274684
      }
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/geist.js
var geist = /* @__PURE__ */ defineChain({
  id: 63157,
  name: "Geist Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Aavegotchi GHST Token",
    symbol: "GHST"
  },
  rpcUrls: {
    default: {
      http: ["https://geist-mainnet.g.alchemy.com/public"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://geist-mainnet.explorer.alchemy.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 660735
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/genesys.js
var genesys = /* @__PURE__ */ defineChain({
  id: 16507,
  name: "Genesys Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "GSYS",
    symbol: "GSYS"
  },
  rpcUrls: {
    default: { http: ["https://rpc.genesys.network"] }
  },
  blockExplorers: {
    default: {
      name: "Genesys Explorer",
      url: "https://gchainexplorer.genesys.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/glideL1Protocol.js
var glideL1Protocol = /* @__PURE__ */ defineChain({
  id: 251,
  name: "Glide L1 Protocol XP",
  nativeCurrency: { name: "GLXP", symbol: "GLXP", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-api.glideprotocol.xyz/l1-rpc"],
      webSocket: ["wss://rpc-api.glideprotocol.xyz/l1-rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Glide Protocol Explore",
      url: "https://blockchain-explorer.glideprotocol.xyz"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/glideL2Protocol.js
var glideL2Protocol = /* @__PURE__ */ defineChain({
  id: 253,
  name: "Glide L2 Protocol XP",
  nativeCurrency: { name: "GLXP", symbol: "GLXP", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-api.glideprotocol.xyz/l2-rpc"],
      webSocket: ["wss://rpc-api.glideprotocol.xyz/l2-rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Glide Protocol Explore",
      url: "https://blockchain-explorer.glideprotocol.xyz"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/gnosis.js
var gnosis = /* @__PURE__ */ defineChain({
  id: 100,
  name: "Gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "xDAI",
    symbol: "XDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gnosischain.com"],
      webSocket: ["wss://rpc.gnosischain.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Gnosisscan",
      url: "https://gnosisscan.io",
      apiUrl: "https://api.gnosisscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 21022491
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/gnosisChiado.js
var gnosisChiado = /* @__PURE__ */ defineChain({
  id: 10200,
  name: "Gnosis Chiado",
  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.chiadochain.net"],
      webSocket: ["wss://rpc.chiadochain.net/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.chiadochain.net",
      apiUrl: "https://blockscout.chiadochain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4967313
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/gobi.js
var gobi = /* @__PURE__ */ defineChain({
  id: 1663,
  name: "Horizen Gobi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test ZEN",
    symbol: "tZEN"
  },
  rpcUrls: {
    default: { http: ["https://gobi-testnet.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "Gobi Explorer",
      url: "https://gobi-explorer.horizen.io"
    }
  },
  contracts: {},
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/goChain.js
var goChain = /* @__PURE__ */ defineChain({
  id: 60,
  name: "GoChain",
  nativeCurrency: {
    decimals: 18,
    name: "GO",
    symbol: "GO"
  },
  rpcUrls: {
    default: { http: ["https://rpc.gochain.io"] }
  },
  blockExplorers: {
    default: {
      name: "GoChain Explorer",
      url: "https://explorer.gochain.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/godwoken.js
var godwoken = /* @__PURE__ */ defineChain({
  id: 71402,
  name: "Godwoken Mainnet",
  nativeCurrency: { decimals: 18, name: "pCKB", symbol: "pCKB" },
  rpcUrls: {
    default: {
      http: ["https://v1.mainnet.godwoken.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "GW Scan",
      url: "https://v1.gwscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 15034
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/goerli.js
var goerli = /* @__PURE__ */ defineChain({
  id: 5,
  name: "Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/eth_goerli"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io",
      apiUrl: "https://api-goerli.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xfc4AC75C46C914aF5892d6d3eFFcebD7917293F1",
      blockCreated: 10339206
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/gravity.js
var gravity = /* @__PURE__ */ defineChain({
  id: 1625,
  name: "Gravity Alpha Mainnet",
  nativeCurrency: { name: "G", symbol: "G", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.gravity.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Gravity Explorer",
      url: "https://explorer.gravity.xyz",
      apiUrl: "https://explorer.gravity.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c",
      blockCreated: 16851
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/guruNetwork.js
var guruNetwork = /* @__PURE__ */ defineChain({
  id: 260,
  name: "Guru Network Mainnet",
  nativeCurrency: {
    name: "GURU Token",
    symbol: "GURU",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gurunetwork.ai/archive/260"]
    }
  },
  blockExplorers: {
    default: {
      name: "Guruscan",
      url: "https://scan.gurunetwork.ai"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 271691
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/guruTestnet.js
var guruTestnet = /* @__PURE__ */ defineChain({
  id: 261,
  name: "Guru Network Testnet",
  nativeCurrency: {
    name: "tGURU Token",
    symbol: "tGURU",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gurunetwork.ai/archive/261"]
    }
  },
  blockExplorers: {
    default: {
      name: "Guruscan",
      url: "https://sepolia.gurunetwork.ai"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ham.js
var ham = /* @__PURE__ */ defineChain({
  id: 5112,
  name: "Ham",
  nativeCurrency: {
    decimals: 18,
    name: "Ham",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ham.fun"],
      webSocket: ["wss://rpc.ham.fun"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ham Chain Explorer",
      url: "https://explorer.ham.fun",
      apiUrl: "https://explorer.ham.fun/api/v2"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/haqqMainnet.js
var haqqMainnet = /* @__PURE__ */ defineChain({
  id: 11235,
  name: "HAQQ Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLM"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.haqq.network",
      apiUrl: "https://explorer.haqq.network/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/haqqTestedge2.js
var haqqTestedge2 = /* @__PURE__ */ defineChain({
  id: 54211,
  name: "HAQQ Testedge 2",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLMT"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.testedge2.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.testedge2.haqq.network",
      apiUrl: "https://explorer.testedge2.haqq.network/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hardhat.js
var hardhat = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/harmonyOne.js
var harmonyOne = /* @__PURE__ */ defineChain({
  id: 16666e5,
  name: "Harmony One",
  nativeCurrency: {
    name: "Harmony",
    symbol: "ONE",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/harmony"] }
  },
  blockExplorers: {
    default: {
      name: "Harmony Explorer",
      url: "https://explorer.harmony.one"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 24185753
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hashkeyChainTestnet.js
var hashkeyTestnet = /* @__PURE__ */ defineChain({
  id: 133,
  name: "HashKey Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "HashKey EcoPoints",
    symbol: "HSK"
  },
  rpcUrls: {
    default: {
      http: ["https://hashkeychain-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "HashKey Chain Explorer",
      url: "https://hashkeychain-testnet-explorer.alt.technology"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hedera.js
var hedera = /* @__PURE__ */ defineChain({
  id: 295,
  name: "Hedera Mainnet",
  network: "hedera-mainnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/mainnet"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hederaPreviewnet.js
var hederaPreviewnet = /* @__PURE__ */ defineChain({
  id: 297,
  name: "Hedera Previewnet",
  network: "hedera-previewnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/previewnet"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hederaTestnet.js
var hederaTestnet = /* @__PURE__ */ defineChain({
  id: 296,
  name: "Hedera Testnet",
  network: "hedera-testnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/testnet"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hela.js
var hela = /* @__PURE__ */ defineChain({
  id: 8668,
  name: "Hela Mainnet",
  nativeCurrency: {
    name: "HLUSD",
    symbol: "HLUSD",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.helachain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hela explorer",
      url: "https://mainnet-blockexplorer.helachain.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hemiSepolia.js
var hemiSepolia = /* @__PURE__ */ defineChain({
  id: 743111,
  name: "Hemi Sepolia",
  network: "Hemi Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.hemi.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hemi Sepolia explorer",
      url: "https://testnet.explorer.hemi.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/holesky.js
var holesky = /* @__PURE__ */ defineChain({
  id: 17e3,
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://holesky.etherscan.io",
      apiUrl: "https://api-holesky.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77
    },
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      blockCreated: 801613
    },
    ensUniversalResolver: {
      address: "0xa6AC935D4971E3CD133b950aE053bECD16fE7f3b",
      blockCreated: 973484
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hpb.js
var hpb = /* @__PURE__ */ defineChain({
  id: 269,
  name: "High Performance Blockchain",
  nativeCurrency: { name: "HPB", symbol: "HPB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://hpbnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "hpbScan",
      url: "https://hscan.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hychain.js
var hychain = /* @__PURE__ */ defineChain({
  id: 2911,
  name: "HYCHAIN",
  nativeCurrency: { name: "HYTOPIA", symbol: "TOPIA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hychain.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "HYCHAIN Explorer",
      url: "https://explorer.hychain.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/hychainTestnet.js
var hychainTestnet = /* @__PURE__ */ defineChain({
  id: 29112,
  name: "HYCHAIN Testnet",
  nativeCurrency: { name: "HYTOPIA", symbol: "TOPIA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hychain.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "HYCHAIN Explorer",
      url: "https://testnet-rpc.hychain.com/http"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/idchain.js
var idchain = /* @__PURE__ */ defineChain({
  id: 74,
  name: "IDChain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "EIDI",
    symbol: "EIDI"
  },
  rpcUrls: {
    default: {
      http: ["https://idchain.one/rpc"],
      webSocket: ["wss://idchain.one/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "IDChain Explorer",
      url: "https://explorer.idchain.one"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/immutableZkEvm.js
var immutableZkEvm = /* @__PURE__ */ defineChain({
  id: 13371,
  name: "Immutable zkEVM",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Explorer",
      url: "https://explorer.immutable.com",
      apiUrl: "https://explorer.immutable.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0",
      blockCreated: 4335972
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/immutableZkEvmTestnet.js
var immutableZkEvmTestnet = /* @__PURE__ */ defineChain({
  id: 13473,
  name: "Immutable zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Testnet Explorer",
      url: "https://explorer.testnet.immutable.com/"
    }
  },
  contracts: {
    multicall3: {
      address: "0x2CC787Ed364600B0222361C4188308Fa8E68bA60",
      blockCreated: 5977391
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/inEVM.js
var inEVM = /* @__PURE__ */ defineChain({
  id: 2525,
  name: "inEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Injective",
    symbol: "INJ"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.rpc.inevm.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "inEVM Explorer",
      url: "https://inevm.calderaexplorer.xyz",
      apiUrl: "https://inevm.calderaexplorer.xyz/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 118606
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/initVerseGenesis.js
var initVerseGenesis = /* @__PURE__ */ defineChain({
  id: 7234,
  name: "InitVerse Genesis Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "InitVerse",
    symbol: "INI"
  },
  rpcUrls: {
    default: { http: ["http://rpc-testnet.inichain.com"] }
  },
  blockExplorers: {
    default: {
      name: "InitVerseGenesisScan",
      url: "https://genesis-testnet.iniscan.com",
      apiUrl: "https://explorer-testnet-api.inichain.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0cF32CBDd6c437331EA4f85ed2d881A5379B5a6F",
      blockCreated: 16361
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ink.js
var sourceId21 = 1;
var ink = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 57073,
  name: "Ink",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc-gel.inkonchain.com",
        "https://rpc-qnd.inkonchain.com"
      ],
      webSocket: [
        "wss://rpc-gel.inkonchain.com",
        "wss://rpc-qnd.inkonchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.inkonchain.com",
      apiUrl: "https://explorer.inkonchain.com/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId21]: {
        address: "0x10d7b35078d3baabb96dd45a9143b94be65b12cd"
      }
    },
    portal: {
      [sourceId21]: {
        address: "0x5d66c1782664115999c47c9fa5cd031f495d3e4f"
      }
    },
    l1StandardBridge: {
      [sourceId21]: {
        address: "0x88ff1e5b602916615391f55854588efcbb7663f0"
      }
    }
  },
  testnet: false,
  sourceId: sourceId21
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/inkSepolia.js
var sourceId22 = 11155111;
var inkSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 763373,
  name: "Ink Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-gel-sepolia.inkonchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer-sepolia.inkonchain.com/",
      apiUrl: "https://explorer-sepolia.inkonchain.com/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId22]: {
        address: "0x860e626c700af381133d9f4af31412a2d1db3d5d"
      }
    },
    portal: {
      [sourceId22]: {
        address: "0x5c1d29c6c9c8b0800692acc95d700bcb4966a1d7"
      }
    },
    l1StandardBridge: {
      [sourceId22]: {
        address: "0x33f60714bbd74d62b66d79213c348614de51901c"
      }
    }
  },
  testnet: true,
  sourceId: sourceId22
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/iota.js
var iota = /* @__PURE__ */ defineChain({
  id: 8822,
  name: "IOTA EVM",
  network: "iotaevm",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.iotaledger.net"],
      webSocket: ["wss://ws.json-rpc.evm.iotaledger.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.iota.org",
      apiUrl: "https://explorer.evm.iota.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 25022
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/iotaTestnet.js
var iotaTestnet = /* @__PURE__ */ defineChain({
  id: 1075,
  name: "IOTA EVM Testnet",
  network: "iotaevm-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.testnet.iotaledger.net"],
      webSocket: ["wss://ws.json-rpc.evm.testnet.iotaledger.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.testnet.iotaledger.net",
      apiUrl: "https://explorer.evm.testnet.iotaledger.net/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/iotex.js
var iotex = /* @__PURE__ */ defineChain({
  id: 4689,
  name: "IoTeX",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.mainnet.iotex.io"],
      webSocket: ["wss://babel-api.mainnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://iotexscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 22163670
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/iotexTestnet.js
var iotexTestnet = /* @__PURE__ */ defineChain({
  id: 4690,
  name: "IoTeX Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.testnet.iotex.io"],
      webSocket: ["wss://babel-api.testnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://testnet.iotexscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xb5cecD6894c6f473Ec726A176f1512399A2e355d",
      blockCreated: 24347592
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/iSunCoin.js
var iSunCoin = /* @__PURE__ */ defineChain({
  id: 8017,
  name: "iSunCoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ISC",
    symbol: "ISC"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.isuncoin.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "iSunCoin Explorer",
      url: "https://baifa.io/app/chains/8017"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/jbc.js
var jbc = /* @__PURE__ */ defineChain({
  id: 8899,
  name: "JIBCHAIN L1",
  network: "jbc",
  nativeCurrency: { name: "JBC", symbol: "JBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-l1.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-l1.jibchain.net",
      apiUrl: "https://exp-l1.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC",
      blockCreated: 2299048
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/jbcTestnet.js
var jbcTestnet = /* @__PURE__ */ defineChain({
  id: 88991,
  name: "Jibchain Testnet",
  nativeCurrency: { name: "tJBC", symbol: "tJBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.testnet.jibchain.net",
      apiUrl: "https://exp.testnet.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xa1a858ad9041B4741e620355a3F96B3c78e70ecE",
      blockCreated: 32848
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/karura.js
var karura = /* @__PURE__ */ defineChain({
  id: 686,
  name: "Karura",
  network: "karura",
  nativeCurrency: {
    name: "Karura",
    symbol: "KAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-karura.aca-api.network"],
      webSocket: ["wss://eth-rpc-karura.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Karura Blockscout",
      url: "https://blockscout.karura.network",
      apiUrl: "https://blockscout.karura.network/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kakarotSepolia.js
var kakarotSepolia = /* @__PURE__ */ defineChain({
  id: 1802203764,
  name: "Kakarot Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.kakarot.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kakarot Scan",
      url: "https://sepolia.kakarotscan.org"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kakarotStarknetSepolia.js
var kakarotStarknetSepolia = /* @__PURE__ */ defineChain({
  id: 920637907288165,
  name: "Kakarot Starknet Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.kakarot.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kakarot Scan",
      url: "https://sepolia.kakarotscan.org"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kardiaChain.js
var kardiaChain = /* @__PURE__ */ defineChain({
  id: 24,
  name: "KardiaChain Mainnet",
  nativeCurrency: { name: "KAI", symbol: "KAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.kardiachain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "KardiaChain Explorer",
      url: "https://explorer.kardiachain.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kava.js
var kava = /* @__PURE__ */ defineChain({
  id: 2222,
  name: "Kava EVM",
  network: "kava-mainnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Explorer",
      url: "https://kavascan.com",
      apiUrl: "https://kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3661165
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kavaTestnet.js
var kavaTestnet = /* @__PURE__ */ defineChain({
  id: 2221,
  name: "Kava EVM Testnet",
  network: "kava-testnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.testnet.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Testnet Explorer",
      url: "https://testnet.kavascan.com/",
      apiUrl: "https://testnet.kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6",
      blockCreated: 7242179
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kcc.js
var kcc = /* @__PURE__ */ defineChain({
  id: 321,
  name: "KCC Mainnet",
  network: "KCC Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "KCS",
    symbol: "KCS"
  },
  rpcUrls: {
    default: {
      http: ["https://kcc-rpc.com"]
    }
  },
  blockExplorers: {
    default: { name: "KCC Explorer", url: "https://explorer.kcc.io" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11760430
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kinto.js
var kinto = /* @__PURE__ */ defineChain({
  id: 7887,
  name: "Kinto Mainnet",
  network: "Kinto Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.kinto.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Kinto Explorer",
      url: "https://explorer.kinto.xyz"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/klaytn.js
var klaytn = /* @__PURE__ */ defineChain({
  id: 8217,
  name: "Klaytn",
  nativeCurrency: {
    decimals: 18,
    name: "Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-cypress.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://scope.klaytn.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96002415
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kaia.js
var kaia = /* @__PURE__ */ defineChain({
  id: 8217,
  name: "Kaia",
  nativeCurrency: {
    decimals: 18,
    name: "Kaia",
    symbol: "KAIA"
  },
  rpcUrls: {
    default: { http: ["https://public-en.node.kaia.io"] }
  },
  blockExplorers: {
    default: {
      name: "KaiaScan",
      url: "https://kaiascan.io",
      apiUrl: "https://api-cypress.klaytnscope.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96002415
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kairos.js
var kairos = /* @__PURE__ */ defineChain({
  id: 1001,
  name: "Kairos Testnet",
  network: "kairos",
  nativeCurrency: {
    decimals: 18,
    name: "Kairos KAIA",
    symbol: "KAIA"
  },
  rpcUrls: {
    default: { http: ["https://public-en-kairos.node.kaia.io"] }
  },
  blockExplorers: {
    default: {
      name: "KaiaScan",
      url: "https://kairos.kaiascan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 123390593
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/klaytnBaobab.js
var klaytnBaobab = /* @__PURE__ */ defineChain({
  id: 1001,
  name: "Klaytn Baobab Testnet",
  network: "klaytn-baobab",
  nativeCurrency: {
    decimals: 18,
    name: "Baobab Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-baobab.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://baobab.klaytnscope.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 123390593
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/koi.js
var koi = defineChain({
  id: 701,
  name: "Koi Network",
  nativeCurrency: {
    decimals: 18,
    name: "Koi Network Native Token",
    symbol: "KRING"
  },
  rpcUrls: {
    default: {
      http: ["https://koi-rpc.darwinia.network"],
      webSocket: ["wss://koi-rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://koi-scan.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 180001
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kroma.js
var kroma = /* @__PURE__ */ defineChain({
  id: 255,
  name: "Kroma",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Explorer",
      url: "https://blockscout.kroma.network",
      apiUrl: "https://blockscout.kroma.network/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/kromaSepolia.js
var kromaSepolia = /* @__PURE__ */ defineChain({
  id: 2358,
  name: "Kroma Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.sepolia.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Sepolia Explorer",
      url: "https://blockscout.sepolia.kroma.network",
      apiUrl: "https://blockscout.sepolia.kroma.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/l3x.js
var l3x = /* @__PURE__ */ defineChain({
  id: 12324,
  name: "L3X Protocol",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.l3x.com"],
      webSocket: ["wss://rpc-mainnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Mainnet Explorer",
      url: "https://explorer.l3x.com",
      apiUrl: "https://explorer.l3x.com/api/v2"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/l3xTestnet.js
var l3xTestnet = /* @__PURE__ */ defineChain({
  id: 12325,
  name: "L3X Protocol Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.l3x.com"],
      webSocket: ["wss://rpc-testnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Testnet Explorer",
      url: "https://explorer-testnet.l3x.com",
      apiUrl: "https://explorer-testnet.l3x.com/api/v2"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lavita.js
var lavita = /* @__PURE__ */ defineChain({
  id: 360890,
  name: "LAVITA Mainnet",
  nativeCurrency: { name: "vTFUEL", symbol: "vTFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://tsub360890-eth-rpc.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "LAVITA Explorer",
      url: "https://tsub360890-explorer.thetatoken.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lightlinkPegasus.js
var lightlinkPegasus = /* @__PURE__ */ defineChain({
  id: 1891,
  name: "LightLink Pegasus Testnet",
  network: "lightlink-pegasus",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.pegasus.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Pegasus Explorer",
      url: "https://pegasus.lightlink.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lightlinkPhoenix.js
var lightlinkPhoenix = /* @__PURE__ */ defineChain({
  id: 1890,
  name: "LightLink Phoenix Mainnet",
  network: "lightlink-phoenix",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.phoenix.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Phoenix Explorer",
      url: "https://phoenix.lightlink.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/linea/actions/estimateGas.js
async function estimateGas2(client, args) {
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountNotFoundError();
  const account = parseAccount(account_);
  try {
    const { accessList, blockNumber, blockTag, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      data,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    const { baseFeePerGas, gasLimit, priorityFeePerGas } = await client.request({
      method: "linea_estimateGas",
      params: block ? [request, block] : [request]
    });
    return {
      baseFeePerGas: BigInt(baseFeePerGas),
      gasLimit: BigInt(gasLimit),
      priorityFeePerGas: BigInt(priorityFeePerGas)
    };
  } catch (err) {
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/linea/chainConfig.js
var chainConfig4 = {
  fees: {
    estimateFeesPerGas: estimateFeesPerGas2,
    async maxPriorityFeePerGas({ block, client, request }) {
      const response = await estimateFeesPerGas2({
        block,
        client,
        multiply: (x) => x,
        request,
        type: "eip1559"
      });
      if (!response?.maxPriorityFeePerGas)
        return null;
      return response.maxPriorityFeePerGas;
    }
  }
};
async function estimateFeesPerGas2({ client, multiply, request, type }) {
  try {
    const response = await estimateGas2(client, {
      ...request,
      account: request?.account
    });
    const { priorityFeePerGas: maxPriorityFeePerGas } = response;
    const baseFeePerGas = multiply(BigInt(response.baseFeePerGas));
    const maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas;
    if (type === "legacy")
      return { gasPrice: maxFeePerGas };
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  } catch {
    return null;
  }
}

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/linea.js
var linea = /* @__PURE__ */ defineChain({
  ...chainConfig4,
  id: 59144,
  name: "Linea Mainnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.linea.build"],
      webSocket: ["wss://rpc.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://lineascan.build",
      apiUrl: "https://api.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 42
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lineaGoerli.js
var lineaGoerli = /* @__PURE__ */ defineChain({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://api-goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lineaSepolia.js
var lineaSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig4,
  id: 59141,
  name: "Linea Sepolia Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.linea.build"],
      webSocket: ["wss://rpc.sepolia.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.lineascan.build",
      apiUrl: "https://api-sepolia.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 227427
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lineaTestnet.js
var lineaTestnet = /* @__PURE__ */ defineChain({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lisk.js
var sourceId23 = 1;
var lisk = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1135,
  name: "Lisk",
  network: "lisk",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.lisk.com",
      apiUrl: "https://blockscout.lisk.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xA9d71E1dd7ca26F26e656E66d6AA81ed7f745bf0"
    },
    l2OutputOracle: {
      [sourceId23]: {
        address: "0x113cB99283AF242Da0A0C54347667edF531Aa7d6"
      }
    },
    portal: {
      [sourceId23]: {
        address: "0x26dB93F8b8b4f7016240af62F7730979d353f9A7"
      }
    },
    l1StandardBridge: {
      [sourceId23]: {
        address: "0x2658723Bf70c7667De6B25F99fcce13A16D25d08"
      }
    }
  },
  sourceId: sourceId23
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/liskSepolia.js
var sourceId24 = 11155111;
var liskSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 4202,
  network: "lisk-sepolia",
  name: "Lisk Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
      apiUrl: "https://sepolia-blockscout.lisk.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId24]: {
        address: "0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId24]: {
        address: "0xe3d90F21490686Ec7eF37BE788E02dfC12787264"
      }
    },
    l1StandardBridge: {
      [sourceId24]: {
        address: "0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5"
      }
    }
  },
  testnet: true,
  sourceId: sourceId24
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/localhost.js
var localhost = /* @__PURE__ */ defineChain({
  id: 1337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/loop.js
var loop = /* @__PURE__ */ defineChain({
  id: 15551,
  name: "LoopNetwork Mainnet",
  nativeCurrency: {
    name: "LOOP",
    symbol: "LOOP",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://api.mainnetloop.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "LoopNetwork Blockchain Explorer",
      url: "https://explorer.mainnetloop.com/"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lukso.js
var lukso = /* @__PURE__ */ defineChain({
  id: 42,
  network: "lukso",
  name: "LUKSO",
  nativeCurrency: {
    name: "LUKSO",
    symbol: "LYX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.lukso.network"],
      webSocket: ["wss://ws-rpc.mainnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Mainnet Explorer",
      url: "https://explorer.execution.mainnet.lukso.network",
      apiUrl: "https://api.explorer.execution.mainnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 468183
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/luksoTestnet.js
var luksoTestnet = /* @__PURE__ */ defineChain({
  id: 4201,
  name: "LUKSO Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LUKSO Testnet",
    symbol: "LYXt"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lukso.network"],
      webSocket: ["wss://ws-rpc.testnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Testnet Explorer",
      url: "https://explorer.execution.testnet.lukso.network",
      apiUrl: "https://api.explorer.execution.testnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 605348
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lycan.js
var lycan = /* @__PURE__ */ defineChain({
  id: 721,
  name: "Lycan",
  nativeCurrency: {
    decimals: 18,
    name: "Lycan",
    symbol: "LYC"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.lycanchain.com",
        "https://us-east.lycanchain.com",
        "https://us-west.lycanchain.com",
        "https://eu-north.lycanchain.com",
        "https://eu-west.lycanchain.com",
        "https://asia-southeast.lycanchain.com"
      ],
      webSocket: [
        "wss://rpc.lycanchain.com",
        "wss://us-east.lycanchain.com",
        "wss://us-west.lycanchain.com",
        "wss://eu-north.lycanchain.com",
        "wss://eu-west.lycanchain.com",
        "wss://asia-southeast.lycanchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Lycan Explorer",
      url: "https://explorer.lycanchain.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/lyra.js
var lyra = /* @__PURE__ */ defineChain({
  id: 957,
  name: "Lyra Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.lyra.finance"]
    }
  },
  blockExplorers: {
    default: {
      name: "Lyra Explorer",
      url: "https://explorer.lyra.finance",
      apiUrl: "https://explorer.lyra.finance/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1935198
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mainnet.js
var mainnet = /* @__PURE__ */ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cloudflare-eth.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19258213
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mandala.js
var mandala = /* @__PURE__ */ defineChain({
  id: 595,
  name: "Mandala TC9",
  network: "mandala",
  nativeCurrency: {
    name: "Mandala",
    symbol: "mACA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-tc9.aca-staging.network"],
      webSocket: ["wss://eth-rpc-tc9.aca-staging.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mandala Blockscout",
      url: "https://blockscout.mandala.aca-staging.network",
      apiUrl: "https://blockscout.mandala.aca-staging.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/manta.js
var manta = /* @__PURE__ */ defineChain({
  id: 169,
  name: "Manta Pacific Mainnet",
  network: "manta",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://pacific-rpc.manta.network/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Explorer",
      url: "https://pacific-explorer.manta.network",
      apiUrl: "https://pacific-explorer.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 332890
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mantaSepoliaTestnet.js
var mantaSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 3441006,
  name: "Manta Pacific Sepolia Testnet",
  network: "manta-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Manta Sepolia Testnet Explorer",
      url: "https://pacific-explorer.sepolia-testnet.manta.network",
      apiUrl: "https://pacific-explorer.sepolia-testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca54918f7B525C8df894668846506767412b53E3",
      blockCreated: 479584
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mantaTestnet.js
var mantaTestnet = /* @__PURE__ */ defineChain({
  id: 3441005,
  name: "Manta Pacific Testnet",
  network: "manta-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://manta-testnet.calderachain.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Testnet Explorer",
      url: "https://pacific-explorer.testnet.manta.network",
      apiUrl: "https://pacific-explorer.testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C",
      blockCreated: 419915
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mantle.js
var mantle = /* @__PURE__ */ defineChain({
  id: 5e3,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://mantlescan.xyz/",
      apiUrl: "https://api.mantlescan.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 304717
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mantleSepoliaTestnet.js
var mantleSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 5003,
  name: "Mantle Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.sepolia.mantle.xyz/",
      apiUrl: "https://explorer.sepolia.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4584012
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mantleTestnet.js
var mantleTestnet = /* @__PURE__ */ defineChain({
  id: 5001,
  name: "Mantle Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
      apiUrl: "https://explorer.testnet.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 561333
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mapProtocol.js
var mapProtocol = /* @__PURE__ */ defineChain({
  id: 22776,
  name: "MAP Protocol",
  nativeCurrency: {
    decimals: 18,
    name: "MAPO",
    symbol: "MAPO"
  },
  rpcUrls: {
    default: { http: ["https://rpc.maplabs.io"] }
  },
  blockExplorers: {
    default: {
      name: "MAPO Scan",
      url: "https://maposcan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/matchain.js
var matchain = /* @__PURE__ */ defineChain({
  id: 698,
  name: "Matchain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.matchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Matchain Scan",
      url: "https://matchscan.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/matchainTestnet.js
var matchainTestnet = /* @__PURE__ */ defineChain({
  id: 699,
  name: "Matchain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.matchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Matchain Scan",
      url: "https://testnet.matchscan.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mchVerse.js
var mchVerse = /* @__PURE__ */ defineChain({
  id: 29548,
  name: "MCH Verse",
  nativeCurrency: { name: "Oasys", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.oasys.mycryptoheroes.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "MCH Verse Explorer",
      url: "https://explorer.oasys.mycryptoheroes.net",
      apiUrl: "https://explorer.oasys.mycryptoheroes.net/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mekong.js
var mekong = /* @__PURE__ */ defineChain({
  id: 7078815900,
  name: "Mekong Pectra Devnet",
  nativeCurrency: { name: "eth", symbol: "eth", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mekong.ethpandaops.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://explorer.mekong.ethpandaops.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/meld.js
var meld = /* @__PURE__ */ defineChain({
  id: 333000333,
  name: "Meld",
  nativeCurrency: {
    decimals: 18,
    name: "Meld",
    symbol: "MELD"
  },
  rpcUrls: {
    default: { http: ["https://rpc-1.meld.com"] }
  },
  blockExplorers: {
    default: { name: "MELDscan", url: "https://meldscan.io" }
  },
  contracts: {
    multicall3: {
      address: "0x769ee5a8e82c15c1b6e358f62ac8eb6e3abe8dc5",
      blockCreated: 360069
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/merlin.js
var merlin = /* @__PURE__ */ defineChain({
  id: 4200,
  name: "Merlin",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.merlinchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://scan.merlinchain.io",
      apiUrl: "https://scan.merlinchain.io/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metachain.js
var metachain = /* @__PURE__ */ defineChain({
  id: 571,
  name: "MetaChain Mainnet",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.metatime.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://explorer.metatime.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metachainIstanbul.js
var metachainIstanbul = /* @__PURE__ */ defineChain({
  id: 1453,
  name: "MetaChain Istanbul",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://istanbul-rpc.metachain.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://istanbul-explorer.metachain.dev"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metadium.js
var metadium = /* @__PURE__ */ defineChain({
  id: 11,
  name: "Metadium Network",
  nativeCurrency: {
    decimals: 18,
    name: "META",
    symbol: "META"
  },
  rpcUrls: {
    default: { http: ["https://api.metadium.com/prod"] }
  },
  blockExplorers: {
    default: {
      name: "Metadium Explorer",
      url: "https://explorer.metadium.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metalL2.js
var sourceId25 = 1;
var metalL2 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1750,
  name: "Metal L2",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.metall2.com"],
      webSocket: ["wss://rpc.metall2.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.metall2.com",
      apiUrl: "https://explorer.metall2.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId25]: {
        address: "0x3B1F7aDa0Fcc26B13515af752Dd07fB1CAc11426"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    },
    portal: {
      [sourceId25]: {
        address: "0x3F37aBdE2C6b5B2ed6F8045787Df1ED1E3753956"
      }
    },
    l1StandardBridge: {
      [sourceId25]: {
        address: "0x6d0f65D59b55B0FEC5d2d15365154DcADC140BF3"
      }
    }
  },
  sourceId: sourceId25
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/meter.js
var meter = /* @__PURE__ */ defineChain({
  id: 82,
  name: "Meter",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpc.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterScan",
      url: "https://scan.meter.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/meterTestnet.js
var meterTestnet = /* @__PURE__ */ defineChain({
  id: 83,
  name: "Meter Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpctest.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterTestnetScan",
      url: "https://scan-warringstakes.meter.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metis.js
var metis = /* @__PURE__ */ defineChain({
  id: 1088,
  name: "Metis",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://andromeda.metis.io/?owner=1088"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Explorer",
      url: "https://explorer.metis.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2338552
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/metisGoerli.js
var metisGoerli = /* @__PURE__ */ defineChain({
  id: 599,
  name: "Metis Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Metis Goerli",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://goerli.gateway.metisdevops.link"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Goerli Explorer",
      url: "https://goerli.explorer.metisdevops.link",
      apiUrl: "https://goerli.explorer.metisdevops.link/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1006207
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mev.js
var mev = /* @__PURE__ */ defineChain({
  id: 7518,
  name: "MEVerse Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversemainnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://www.meversescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 86881340
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mevTestnet.js
var mevTestnet = /* @__PURE__ */ defineChain({
  id: 4759,
  name: "MEVerse Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversetestnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.meversescan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 64371115
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mint.js
var mint = /* @__PURE__ */ defineChain({
  id: 185,
  name: "Mint Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mintchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mintchain explorer",
      url: "https://explorer.mintchain.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mintSepoliaTestnet.js
var mintSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 1686,
  name: "Mint Sepolia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.mintchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mintchain Testnet explorer",
      url: "https://testnet-explorer.mintchain.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mitosisTestnet.js
var mitosisTestnet = /* @__PURE__ */ defineChain({
  id: 124832,
  name: "Mitosis Testnet",
  nativeCurrency: { name: "MITO", symbol: "MITO", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.mitosis.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mitosis testnet explorer",
      url: "https://testnet.mitosiscan.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/mode.js
var sourceId26 = 1;
var mode = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 34443,
  name: "Mode Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Modescan",
      url: "https://modescan.io"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2465882
    },
    l2OutputOracle: {
      [sourceId26]: {
        address: "0x4317ba146D4933D889518a3e5E11Fe7a53199b04"
      }
    },
    portal: {
      [sourceId26]: {
        address: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07"
      }
    },
    l1StandardBridge: {
      [sourceId26]: {
        address: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21"
      }
    }
  },
  sourceId: sourceId26
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/modeTestnet.js
var sourceId27 = 11155111;
var modeTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 919,
  name: "Mode Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.mode.network",
      apiUrl: "https://sepolia.explorer.mode.network/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId27]: {
        address: "0x2634BD65ba27AB63811c74A63118ACb312701Bfa",
        blockCreated: 3778393
      }
    },
    portal: {
      [sourceId27]: {
        address: "0x320e1580effF37E008F1C92700d1eBa47c1B23fD",
        blockCreated: 3778395
      }
    },
    l1StandardBridge: {
      [sourceId27]: {
        address: "0xbC5C679879B2965296756CD959C3C739769995E2",
        blockCreated: 3778392
      }
    },
    multicall3: {
      address: "0xBAba8373113Fb7a68f195deF18732e01aF8eDfCF",
      blockCreated: 3019007
    }
  },
  testnet: true,
  sourceId: sourceId27
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/moonbaseAlpha.js
var moonbaseAlpha = /* @__PURE__ */ defineChain({
  id: 1287,
  name: "Moonbase Alpha",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbase.moonbeam.network"],
      webSocket: ["wss://wss.api.moonbase.moonbeam.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonbase.moonscan.io",
      apiUrl: "https://moonbase.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1850686
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/moonbeam.js
var moonbeam = /* @__PURE__ */ defineChain({
  id: 1284,
  name: "Moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "GLMR",
    symbol: "GLMR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonbeam.public.blastapi.io"],
      webSocket: ["wss://moonbeam.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonscan.io",
      apiUrl: "https://api-moonbeam.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 609002
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/moonbeamDev.js
var moonbeamDev = /* @__PURE__ */ defineChain({
  id: 1281,
  name: "Moonbeam Development Node",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:9944"],
      webSocket: ["wss://127.0.0.1:9944"]
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/moonriver.js
var moonriver = /* @__PURE__ */ defineChain({
  id: 1285,
  name: "Moonriver",
  nativeCurrency: {
    decimals: 18,
    name: "MOVR",
    symbol: "MOVR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonriver.public.blastapi.io"],
      webSocket: ["wss://moonriver.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonriver.moonscan.io",
      apiUrl: "https://api-moonriver.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1597904
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/morph.js
var morph = /* @__PURE__ */ defineChain({
  id: 2818,
  name: "Morph",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.morphl2.io"],
      webSocket: ["wss://rpc.morphl2.io:8443"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Explorer",
      url: "https://explorer.morphl2.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/morphHolesky.js
var morphHolesky = /* @__PURE__ */ defineChain({
  id: 2810,
  name: "Morph Holesky",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-quicknode-holesky.morphl2.io"],
      webSocket: ["wss://rpc-quicknode-holesky.morphl2.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Holesky Explorer",
      url: "https://explorer-holesky.morphl2.io",
      apiUrl: "https://explorer-api-holesky.morphl2.io/api?"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/morphSepolia.js
var morphSepolia = /* @__PURE__ */ defineChain({
  id: 2710,
  name: "Morph Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.morphl2.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Testnet Explorer",
      url: "https://explorer-testnet.morphl2.io",
      apiUrl: "https://explorer-api-testnet.morphl2.io/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/nahmii.js
var nahmii = /* @__PURE__ */ defineChain({
  id: 5551,
  name: "Nahmii 2 Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://l2.nahmii.io"] }
  },
  blockExplorers: {
    default: {
      name: "Nahmii 2 Explorer",
      url: "https://explorer.n2.nahmii.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/nautilus.js
var nautilus = /* @__PURE__ */ defineChain({
  id: 22222,
  name: "Nautilus Mainnet",
  nativeCurrency: { name: "ZBC", symbol: "ZBC", decimals: 9 },
  rpcUrls: {
    default: {
      http: ["https://api.nautilus.nautchain.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "NautScan",
      url: "https://nautscan.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/neonDevnet.js
var neonDevnet = /* @__PURE__ */ defineChain({
  id: 245022926,
  name: "Neon EVM DevNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://devnet.neonevm.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://devnet.neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 205206112
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/neonMainnet.js
var neonMainnet = /* @__PURE__ */ defineChain({
  id: 245022934,
  network: "neonMainnet",
  name: "Neon EVM MainNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://neon-proxy-mainnet.solana.p2p.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 206545524
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/neoxMainnet.js
var neoxMainnet = /* @__PURE__ */ defineChain({
  id: 47763,
  name: "Neo X Mainnet",
  nativeCurrency: { name: "Gas", symbol: "GAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://mainnet-1.rpc.banelabs.org",
        "https://mainnet-2.rpc.banelabs.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Neo X - Explorer",
      url: "https://xexplorer.neo.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/neoxT4.js
var neoxT4 = /* @__PURE__ */ defineChain({
  id: 12227332,
  name: "Neo X Testnet T4",
  nativeCurrency: { name: "Gas", symbol: "GAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.banelabs.org/"]
    }
  },
  blockExplorers: {
    default: {
      name: "neox-scan",
      url: "https://xt4scan.ngd.network"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/nexi.js
var nexi = /* @__PURE__ */ defineChain({
  id: 4242,
  name: "Nexi",
  nativeCurrency: { name: "Nexi", symbol: "NEXI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.chain.nexi.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "NexiScan",
      url: "https://www.nexiscan.com",
      apiUrl: "https://www.nexiscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E",
      blockCreated: 25770160
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/nexilix.js
var nexilix = /* @__PURE__ */ defineChain({
  id: 240,
  name: "Nexilix Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Nexilix",
    symbol: "NEXILIX"
  },
  rpcUrls: {
    default: { http: ["https://rpcurl.pos.nexilix.com"] }
  },
  blockExplorers: {
    default: {
      name: "NexilixScan",
      url: "https://scan.nexilix.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244",
      blockCreated: 74448
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/oasisTestnet.js
var oasisTestnet = /* @__PURE__ */ defineChain({
  id: 4090,
  network: "oasis-testnet",
  name: "Oasis Testnet",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc1.oasis.bahamutchain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://oasis.ftnscan.com",
      apiUrl: "https://oasis.ftnscan.com/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/oasys.js
var oasys = /* @__PURE__ */ defineChain({
  id: 248,
  name: "Oasys",
  nativeCurrency: { name: "Oasys", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.oasys.games"]
    }
  },
  blockExplorers: {
    default: {
      name: "OasysScan",
      url: "https://scan.oasys.games",
      apiUrl: "https://scan.oasys.games/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/odysseyTestnet.js
var odysseyTestnet = /* @__PURE__ */ defineChain({
  id: 911867,
  name: "Odyssey Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://odyssey.ithaca.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Odyssey Explorer",
      url: "https://odyssey-explorer.ithaca.xyz",
      apiUrl: "https://odyssey-explorer.ithaca.xyz/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/okc.js
var okc = /* @__PURE__ */ defineChain({
  id: 66,
  name: "OKC",
  nativeCurrency: {
    decimals: 18,
    name: "OKT",
    symbol: "OKT"
  },
  rpcUrls: {
    default: { http: ["https://exchainrpc.okex.org"] }
  },
  blockExplorers: {
    default: {
      name: "oklink",
      url: "https://www.oklink.com/okc"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10364792
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/omax.js
var omax = /* @__PURE__ */ defineChain({
  id: 311,
  name: "Omax Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OMAX",
    symbol: "OMAX"
  },
  rpcUrls: {
    default: { http: ["https://mainapi.omaxray.com"] }
  },
  blockExplorers: {
    default: {
      name: "Omax Explorer",
      url: "https://omaxscan.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/oneWorld.js
var oneWorld = /* @__PURE__ */ defineChain({
  id: 309075,
  name: "One World Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OWCT",
    symbol: "OWCT"
  },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.oneworldchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "One World Explorer",
      url: "https://mainnet.oneworldchain.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/oortmainnetDev.js
var oortMainnetDev = /* @__PURE__ */ defineChain({
  id: 9700,
  name: "OORT MainnetDev",
  nativeCurrency: {
    decimals: 18,
    name: "OORT",
    symbol: "OORT"
  },
  rpcUrls: {
    default: { http: ["https://dev-rpc.oortech.com"] }
  },
  blockExplorers: {
    default: {
      name: "OORT MainnetDev Explorer",
      url: "https://dev-scan.oortech.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/opBNB.js
var sourceId28 = 56;
var opBNB = /* @__PURE__ */ defineChain({
  id: 204,
  name: "opBNB",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://opbnb-mainnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opBNB (BSCScan)",
      url: "https://opbnb.bscscan.com",
      apiUrl: "https://api-opbnb.bscscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 512881
    },
    l2OutputOracle: {
      [sourceId28]: {
        address: "0x153CAB79f4767E2ff862C94aa49573294B13D169"
      }
    },
    portal: {
      [sourceId28]: {
        address: "0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519"
      }
    },
    l1StandardBridge: {
      [sourceId28]: {
        address: "0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea"
      }
    }
  },
  sourceId: sourceId28
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/opBNBTestnet.js
var sourceId29 = 97;
var opBNBTestnet = /* @__PURE__ */ defineChain({
  id: 5611,
  name: "opBNB Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://opbnb-testnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opbnbscan",
      url: "https://testnet.opbnbscan.com"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3705108
    },
    l2OutputOracle: {
      [sourceId29]: {
        address: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810"
      }
    },
    portal: {
      [sourceId29]: {
        address: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31"
      }
    },
    l1StandardBridge: {
      [sourceId29]: {
        address: "0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840"
      }
    }
  },
  testnet: true,
  sourceId: sourceId29
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/optimism.js
var sourceId30 = 1;
var optimism = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId30]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [sourceId30]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [sourceId30]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [sourceId30]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: sourceId30
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/optimismGoerli.js
var sourceId31 = 5;
var optimismGoerli = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 420,
  name: "Optimism Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://goerli.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io",
      apiUrl: "https://goerli-optimism.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId31]: {
        address: "0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 49461
    },
    portal: {
      [sourceId31]: {
        address: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383"
      }
    },
    l1StandardBridge: {
      [sourceId31]: {
        address: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8"
      }
    }
  },
  testnet: true,
  sourceId: sourceId31
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/optimismSepolia.js
var sourceId32 = 11155111;
var optimismSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com",
      apiUrl: "https://optimism-sepolia.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId32]: {
        address: "0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1"
      }
    },
    l2OutputOracle: {
      [sourceId32]: {
        address: "0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    },
    portal: {
      [sourceId32]: {
        address: "0x16Fc5058F25648194471939df75CF27A2fdC48BC"
      }
    },
    l1StandardBridge: {
      [sourceId32]: {
        address: "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1"
      }
    }
  },
  testnet: true,
  sourceId: sourceId32
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/optopia.js
var optopia = /* @__PURE__ */ defineChain({
  id: 62050,
  name: "Optopia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet.optopia.ai"] }
  },
  blockExplorers: {
    default: {
      name: "Optopia Explorer",
      url: "https://scan.optopia.ai"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/optopiaTestnet.js
var optopiaTestnet = /* @__PURE__ */ defineChain({
  id: 62049,
  name: "Optopia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.optopia.ai"] }
  },
  blockExplorers: {
    default: {
      name: "Optopia Explorer",
      url: "https://scan-testnet.optopia.ai"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/orderly.js
var orderly = /* @__PURE__ */ defineChain({
  id: 291,
  name: "Orderly",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.orderly.network"] }
  },
  blockExplorers: {
    default: {
      name: "Orderly Explorer",
      url: "https://explorer.orderly.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/orderlySepolia.js
var orderlySepolia = /* @__PURE__ */ defineChain({
  id: 4460,
  name: "Orderly Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://l2-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Orderly Explorer",
      url: "https://explorerl2new-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/otimDevnet.js
var otimDevnet = /* @__PURE__ */ defineChain({
  id: 41144114,
  name: "Otim Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://devnet.otim.xyz"]
    }
  },
  contracts: {
    batchInvoker: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/palm.js
var palm = /* @__PURE__ */ defineChain({
  id: 11297108109,
  name: "Palm",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/palmTestnet.js
var palmTestnet = /* @__PURE__ */ defineChain({
  id: 11297108099,
  name: "Palm Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/pgn.js
var sourceId33 = 1;
var pgn = /* @__PURE__ */ defineChain({
  id: 424,
  network: "pgn",
  name: "PGN",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Explorer",
      url: "https://explorer.publicgoods.network",
      apiUrl: "https://explorer.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [sourceId33]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3380209
    },
    portal: {
      [sourceId33]: {
        address: "0xb26Fd985c5959bBB382BAFdD0b879E149e48116c"
      }
    },
    l1StandardBridge: {
      [sourceId33]: {
        address: "0xD0204B9527C1bA7bD765Fa5CCD9355d38338272b"
      }
    }
  },
  formatters: formatters2,
  sourceId: sourceId33
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/pgnTestnet.js
var sourceId34 = 11155111;
var pgnTestnet = /* @__PURE__ */ defineChain({
  id: 58008,
  network: "pgn-testnet",
  name: "PGN ",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Testnet Explorer",
      url: "https://explorer.sepolia.publicgoods.network",
      apiUrl: "https://explorer.sepolia.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [sourceId34]: {
        address: "0xD5bAc3152ffC25318F848B3DD5dA6C85171BaEEe"
      }
    },
    portal: {
      [sourceId34]: {
        address: "0xF04BdD5353Bb0EFF6CA60CfcC78594278eBfE179"
      }
    },
    l1StandardBridge: {
      [sourceId34]: {
        address: "0xFaE6abCAF30D23e233AC7faF747F2fC3a5a6Bfa3"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3754925
    }
  },
  formatters: formatters2,
  sourceId: sourceId34,
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/phoenix.js
var phoenix = /* @__PURE__ */ defineChain({
  id: 13381,
  name: "Phoenix Blockchain",
  nativeCurrency: { name: "Phoenix", symbol: "PHX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.phoenixplorer.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Phoenixplorer",
      url: "https://phoenixplorer.com",
      apiUrl: "https://phoenixplorer.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x498cF757a575cFF2c2Ed9f532f56Efa797f86442",
      blockCreated: 5620192
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/planq.js
var planq = /* @__PURE__ */ defineChain({
  id: 7070,
  name: "Planq Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "PLQ",
    symbol: "PLQ"
  },
  rpcUrls: {
    default: { http: ["https://evm-rpc.planq.network"] }
  },
  blockExplorers: {
    default: {
      name: "Planq Explorer",
      url: "https://evm.planq.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/playfiAlbireo.js
var playfiAlbireo = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 1612127,
  name: "PlayFi Albireo Testnet",
  network: "albireo",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://albireo-rpc.playfi.ai"],
      webSocket: ["wss://albireo-rpc-ws.playfi.ai/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "PlayFi Albireo Explorer",
      url: "https://albireo-explorer.playfi.ai"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/plinga.js
var plinga = /* @__PURE__ */ defineChain({
  id: 242,
  name: "Plinga",
  nativeCurrency: { name: "Plinga", symbol: "PLINGA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcurl.mainnet.plgchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Plgscan",
      url: "https://www.plgscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0989576160f2e7092908BB9479631b901060b6e4",
      blockCreated: 204489
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/plume.js
var sourceId35 = 1;
var plume = /* @__PURE__ */ defineChain({
  id: 98865,
  name: "Plume Mainnet",
  nativeCurrency: {
    name: "Plume Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.plumenetwork.xyz"],
      webSocket: ["wss://rpc.plumenetwork.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.plumenetwork.xyz",
      apiUrl: "https://explorer.plumenetwork.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 48577
    }
  },
  sourceId: sourceId35
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/plumeDevnet.js
var sourceId36 = 11155111;
var plumeDevnet = /* @__PURE__ */ defineChain({
  id: 98864,
  name: "Plume Devnet",
  nativeCurrency: {
    name: "Plume Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://test-rpc.plumenetwork.xyz"],
      webSocket: ["wss://test-rpc.plumenetwork.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://test-explorer.plumenetwork.xyz",
      apiUrl: "https://test-explorer.plumenetwork.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 481948
    }
  },
  testnet: true,
  sourceId: sourceId36
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/plumeTestnet.js
var sourceId37 = 11155111;
var plumeTestnet = /* @__PURE__ */ defineChain({
  id: 161221135,
  name: "Plume Testnet",
  nativeCurrency: {
    name: "Plume Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.plumenetwork.xyz/http"],
      webSocket: ["wss://testnet-rpc.plumenetwork.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.plumenetwork.xyz",
      apiUrl: "https://testnet-explorer.plumenetwork.xyz/api"
    }
  },
  testnet: true,
  sourceId: sourceId37
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polterTestnet.js
var polterTestnet = /* @__PURE__ */ defineChain({
  id: 631571,
  name: "Polter Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Polter GHST",
    symbol: "GHST"
  },
  rpcUrls: {
    default: {
      http: ["https://geist-polter.g.alchemy.com/public"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://polter-testnet.explorer.alchemy.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11245
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygon.js
var polygon = /* @__PURE__ */ defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygonAmoy.js
var polygonAmoy = /* @__PURE__ */ defineChain({
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com",
      apiUrl: "https://api-amoy.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3127388
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygonMumbai.js
var polygonMumbai = /* @__PURE__ */ defineChain({
  id: 80001,
  name: "Polygon Mumbai",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/polygon_mumbai"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
      apiUrl: "https://api-testnet.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygonZkEvm.js
var polygonZkEvm = /* @__PURE__ */ defineChain({
  id: 1101,
  name: "Polygon zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://zkevm.polygonscan.com",
      apiUrl: "https://api-zkevm.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 57746
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygonZkEvmCardona.js
var polygonZkEvmCardona = /* @__PURE__ */ defineChain({
  id: 2442,
  name: "Polygon zkEVM Cardona",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.cardona.zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://cardona-zkevm.polygonscan.com",
      apiUrl: "https://cardona-zkevm.polygonscan.com/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 114091
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/polygonZkEvmTestnet.js
var polygonZkEvmTestnet = /* @__PURE__ */ defineChain({
  id: 1442,
  name: "Polygon zkEVM Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.public.zkevm-test.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://testnet-zkevm.polygonscan.com",
      apiUrl: "https://testnet-zkevm.polygonscan.com/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 525686
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/pulsechain.js
var pulsechain = /* @__PURE__ */ defineChain({
  id: 369,
  name: "PulseChain",
  nativeCurrency: { name: "Pulse", symbol: "PLS", decimals: 18 },
  testnet: false,
  rpcUrls: {
    default: {
      http: ["https://rpc.pulsechain.com"],
      webSocket: ["wss://ws.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.pulsechain.com",
      apiUrl: "https://api.scan.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/pulsechainV4.js
var pulsechainV4 = /* @__PURE__ */ defineChain({
  id: 943,
  name: "PulseChain V4",
  testnet: true,
  nativeCurrency: { name: "V4 Pulse", symbol: "v4PLS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.v4.testnet.pulsechain.com"],
      webSocket: ["wss://ws.v4.testnet.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.v4.testnet.pulsechain.com",
      apiUrl: "https://scan.v4.testnet.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ql1.js
var ql1 = /* @__PURE__ */ defineChain({
  id: 766,
  name: "QL1",
  nativeCurrency: {
    decimals: 18,
    name: "QOM",
    symbol: "QOM"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.qom.one"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ql1 Explorer",
      url: "https://scan.qom.one"
    }
  },
  contracts: {
    multicall3: {
      address: "0x7A52370716ea730585884F5BDB0f6E60C39b8C64"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/qMainnet.js
var qMainnet = /* @__PURE__ */ defineChain({
  id: 35441,
  name: "Q Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.q.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Mainnet Explorer",
      url: "https://explorer.q.org",
      apiUrl: "https://explorer.q.org/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/qTestnet.js
var qTestnet = /* @__PURE__ */ defineChain({
  id: 35443,
  name: "Q Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.qtestnet.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Testnet Explorer",
      url: "https://explorer.qtestnet.org",
      apiUrl: "https://explorer.qtestnet.org/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/real.js
var real = /* @__PURE__ */ defineChain({
  id: 111188,
  name: "re.al",
  nativeCurrency: {
    name: "reETH",
    decimals: 18,
    symbol: "reETH"
  },
  rpcUrls: {
    default: { http: ["https://real.drpc.org"] }
  },
  blockExplorers: {
    default: {
      name: "re.al Explorer",
      url: "https://explorer.re.al",
      apiUrl: "https://explorer.re.al/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 695
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/redbellyMainnet.js
var redbellyMainnet = /* @__PURE__ */ defineChain({
  id: 151,
  name: "Redbelly Network Mainnet",
  nativeCurrency: {
    name: "Redbelly Native Coin",
    symbol: "RBNT",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://governors.mainnet.redbelly.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Routescan",
      url: "https://redbelly.routescan.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/151/etherscan/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/redbellyTestnet.js
var redbellyTestnet = /* @__PURE__ */ defineChain({
  id: 153,
  name: "Redbelly Network Testnet",
  nativeCurrency: {
    name: "Redbelly Native Coin",
    symbol: "RBNT",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://governors.testnet.redbelly.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Routescan",
      url: "https://redbelly.testnet.routescan.io",
      apiUrl: "https://api.routescan.io/v2/network/testnet/evm/153_2/etherscan/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/redstone.js
var sourceId38 = 1;
var redstone = defineChain({
  ...chainConfig2,
  name: "Redstone",
  id: 690,
  sourceId: sourceId38,
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://rpc.redstonechain.com"],
      webSocket: ["wss://rpc.redstonechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.redstone.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId38]: {
        address: "0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",
        blockCreated: 19578329
      }
    },
    l2OutputOracle: {
      [sourceId38]: {
        address: "0xa426A052f657AEEefc298b3B5c35a470e4739d69",
        blockCreated: 19578337
      }
    },
    l1StandardBridge: {
      [sourceId38]: {
        address: "0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69",
        blockCreated: 19578331
      }
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rei.js
var rei = /* @__PURE__ */ defineChain({
  id: 47805,
  name: "REI Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "REI",
    symbol: "REI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.rei.network"],
      webSocket: ["wss://rpc.rei.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "REI Scan",
      url: "https://scan.rei.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/reyaNetwork.js
var reyaNetwork = /* @__PURE__ */ defineChain({
  id: 1729,
  name: "Reya Network",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://rpc.reya.network"],
      webSocket: ["wss://ws.reya.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Reya Network Explorer",
      url: "https://explorer.reya.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rollux.js
var rollux = /* @__PURE__ */ defineChain({
  id: 570,
  name: "Rollux Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.rollux.com"],
      webSocket: ["wss://rpc.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxExplorer",
      url: "https://explorer.rollux.com",
      apiUrl: "https://explorer.rollux.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 119222
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rolluxTestnet.js
var rolluxTestnet = /* @__PURE__ */ defineChain({
  id: 57e3,
  name: "Rollux Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-tanenbaum.rollux.com/"],
      webSocket: ["wss://rpc-tanenbaum.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxTestnetExplorer",
      url: "https://rollux.tanenbaum.io",
      apiUrl: "https://rollux.tanenbaum.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1813675
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ronin.js
var ronin = /* @__PURE__ */ defineChain({
  id: 2020,
  name: "Ronin",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ronin Explorer",
      url: "https://app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 26023535
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/root.js
var root = /* @__PURE__ */ defineChain({
  id: 7668,
  name: "The Root Network",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP"
  },
  rpcUrls: {
    default: {
      http: ["https://root.rootnet.live/archive"],
      webSocket: ["wss://root.rootnet.live/archive/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Rootscan",
      url: "https://rootscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc9C2E2429AeC354916c476B30d729deDdC94988d",
      blockCreated: 9218338
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rootPorcini.js
var rootPorcini = /* @__PURE__ */ defineChain({
  id: 7672,
  name: "The Root Network - Porcini",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP"
  },
  rpcUrls: {
    default: {
      http: ["https://porcini.rootnet.app/archive"],
      webSocket: ["wss://porcini.rootnet.app/archive/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Rootscan",
      url: "https://porcini.rootscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc9C2E2429AeC354916c476B30d729deDdC94988d",
      blockCreated: 10555692
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rootstock.js
var rootstock = /* @__PURE__ */ defineChain({
  id: 30,
  name: "Rootstock Mainnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "RBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.rsk.co"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4249540
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rootstockTestnet.js
var rootstockTestnet = /* @__PURE__ */ defineChain({
  id: 31,
  name: "Rootstock Testnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "tRBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.testnet.rootstock.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rss3.js
var sourceId39 = 1;
var rss3 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 12553,
  name: "RSS3 VSL Mainnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Mainnet Scan",
      url: "https://scan.rss3.io",
      apiUrl: "https://scan.rss3.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId39]: {
        address: "0xE6f24d2C32B3109B18ed33cF08eFb490b1e09C10"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14193
    },
    portal: {
      [sourceId39]: {
        address: "0x6A12432491bbbE8d3babf75F759766774C778Db4",
        blockCreated: 19387057
      }
    },
    l1StandardBridge: {
      [sourceId39]: {
        address: "0x4cbab69108Aa72151EDa5A3c164eA86845f18438"
      }
    }
  },
  sourceId: sourceId39
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/rss3Sepolia.js
var sourceId40 = 11155111;
var rss3Sepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2331,
  name: "RSS3 VSL Sepolia Testnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Sepolia Testnet Scan",
      url: "https://scan.testnet.rss3.io",
      apiUrl: "https://scan.testnet.rss3.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId40]: {
        address: "0xDb5c46C3Eaa6Ed6aE8b2379785DF7dd029C0dC81"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 55697
    },
    portal: {
      [sourceId40]: {
        address: "0xcBD77E8E1E7F06B25baDe67142cdE82652Da7b57",
        blockCreated: 5345035
      }
    },
    l1StandardBridge: {
      [sourceId40]: {
        address: "0xdDD29bb63B0839FB1cE0eE439Ff027738595D07B"
      }
    }
  },
  testnet: true,
  sourceId: sourceId40
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/saakuru.js
var saakuru = /* @__PURE__ */ defineChain({
  id: 7225878,
  name: "Saakuru Mainnet",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.saakuru.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Saakuru Explorer",
      url: "https://explorer.saakuru.network"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/saigon.js
var saigon = /* @__PURE__ */ defineChain({
  id: 2021,
  name: "Saigon Testnet",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://saigon-testnet.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Saigon Explorer",
      url: "https://saigon-app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18736871
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sanko.js
var sanko = /* @__PURE__ */ defineChain({
  id: 1996,
  name: "Sanko",
  nativeCurrency: { name: "DMT", symbol: "DMT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.sanko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sanko Explorer",
      url: "https://explorer.sanko.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 37
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sapphire.js
var sapphire = /* @__PURE__ */ defineChain({
  id: 23294,
  name: "Oasis Sapphire",
  network: "sapphire",
  nativeCurrency: { name: "Sapphire Rose", symbol: "ROSE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sapphire.oasis.io"],
      webSocket: ["wss://sapphire.oasis.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/mainnet/sapphire"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 734531
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sapphireTestnet.js
var sapphireTestnet = /* @__PURE__ */ defineChain({
  id: 23295,
  name: "Oasis Sapphire Testnet",
  network: "sapphire-testnet",
  nativeCurrency: { name: "Sapphire Test Rose", symbol: "TEST", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.sapphire.oasis.dev"],
      webSocket: ["wss://testnet.sapphire.oasis.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/testnet/sapphire"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/satoshivm.js
var satoshiVM = /* @__PURE__ */ defineChain({
  id: 3109,
  name: "SatoshiVM Alpha Mainnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://alpha-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://svmscan.io",
      apiUrl: "https://svmscan.io/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/satoshivmTestnet.js
var satoshiVMTestnet = /* @__PURE__ */ defineChain({
  id: 3110,
  name: "SatoshiVM Testnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://test-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://testnet.svmscan.io",
      apiUrl: "https://testnet.svmscan.io/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/scroll.js
var scroll = /* @__PURE__ */ defineChain({
  id: 534352,
  name: "Scroll",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.scroll.io"],
      webSocket: ["wss://wss-rpc.scroll.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://scrollscan.com",
      apiUrl: "https://api.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/scrollSepolia.js
var scrollSepolia = /* @__PURE__ */ defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://sepolia.scrollscan.com",
      apiUrl: "https://api-sepolia.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9473
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sei.js
var sei = /* @__PURE__ */ defineChain({
  id: 1329,
  name: "Sei Network",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc.sei-apis.com/"],
      webSocket: ["wss://evm-ws.sei-apis.com/"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com",
      apiUrl: "https://seitrace.com/pacific-1/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/seiDevnet.js
var seiDevnet = /* @__PURE__ */ defineChain({
  id: 713715,
  name: "Sei Devnet",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-arctic-1.sei-apis.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/seiTestnet.js
var seiTestnet = /* @__PURE__ */ defineChain({
  id: 1328,
  name: "Sei Testnet",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-testnet.sei-apis.com"],
      webSocket: ["wss://evm-ws-testnet.sei-apis.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sepolia.js
var sepolia = /* @__PURE__ */ defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.drpc.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5317080
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shape.js
var sourceId41 = 1;
var shape = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 360,
  name: "Shape",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.shape.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "shapescan",
      url: "https://shapescan.xyz",
      apiUrl: "https://shapescan.xyz/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId41]: {
        address: "0x6Ef8c69CfE4635d866e3E02732068022c06e724D",
        blockCreated: 20369940
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1
    },
    portal: {
      [sourceId41]: {
        address: "0xEB06fFa16011B5628BaB98E29776361c83741dd3",
        blockCreated: 20369933
      }
    },
    l1StandardBridge: {
      [sourceId41]: {
        address: "0x62Edd5f4930Ea92dCa3fB81689bDD9b9d076b57B",
        blockCreated: 20369935
      }
    }
  },
  sourceId: sourceId41
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shapeSepolia.js
var sourceId42 = 11155111;
var shapeSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 11011,
  name: "Shape Sepolia Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.shape.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer-sepolia.shape.network/",
      apiUrl: "https://explorer-sepolia.shape.network/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1
    }
  },
  testnet: true,
  sourceId: sourceId42
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shardeumSphinx.js
var shardeumSphinx = /* @__PURE__ */ defineChain({
  id: 8082,
  name: "Shardeum Sphinx",
  nativeCurrency: { name: "SHARDEUM", symbol: "SHM", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sphinx.shardeum.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shardeum Explorer",
      url: "https://explorer-sphinx.shardeum.org"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shibarium.js
var shibarium = /* @__PURE__ */ defineChain({
  id: 109,
  name: "Shibarium",
  network: "shibarium",
  nativeCurrency: { name: "Bone", symbol: "BONE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.shibrpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://shibariumscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0x864Bf681ADD6052395188A89101A1B37d3B4C961",
      blockCreated: 265900
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shibariumTestnet.js
var shibariumTestnet = /* @__PURE__ */ defineChain({
  id: 157,
  name: "Puppynet Shibarium",
  nativeCurrency: {
    decimals: 18,
    name: "Bone",
    symbol: "BONE"
  },
  rpcUrls: {
    default: { http: ["https://puppynet.shibrpc.com"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://puppyscan.shib.io",
      apiUrl: "https://puppyscan.shib.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xA4029b74FBA366c926eDFA7Dd10B21C621170a4c",
      blockCreated: 3035769
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shiden.js
var shiden = /* @__PURE__ */ defineChain({
  id: 336,
  name: "Shiden",
  nativeCurrency: {
    decimals: 18,
    name: "SDN",
    symbol: "SDN"
  },
  rpcUrls: {
    default: {
      http: ["https://shiden.public.blastapi.io"],
      webSocket: ["wss://shiden-rpc.dwellir.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shiden Scan",
      url: "https://shiden.subscan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shimmer.js
var shimmer = /* @__PURE__ */ defineChain({
  id: 148,
  name: "Shimmer",
  network: "shimmer",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.shimmer.network",
      apiUrl: "https://explorer.evm.shimmer.network/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/shimmerTestnet.js
var shimmerTestnet = /* @__PURE__ */ defineChain({
  id: 1073,
  name: "Shimmer Testnet",
  network: "shimmer-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.testnet.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.testnet.shimmer.network",
      apiUrl: "https://explorer.evm.testnet.shimmer.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/silicon.js
var silicon = /* @__PURE__ */ defineChain({
  id: 2355,
  name: "Silicon zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.silicon.network",
        "https://silicon-mainnet.nodeinfra.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SiliconScope",
      url: "https://scope.silicon.network"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/siliconSepolia.js
var siliconSepolia = /* @__PURE__ */ defineChain({
  id: 1722641160,
  name: "Silicon Sepolia zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc-sepolia.silicon.network",
        "https://silicon-testnet.nodeinfra.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SiliconSepoliaScope",
      url: "https://scope-sepolia.silicon.network"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sixProtocol.js
var sixProtocol = /* @__PURE__ */ defineChain({
  id: 98,
  name: "Six Protocol",
  nativeCurrency: {
    decimals: 18,
    name: "SIX",
    symbol: "SIX"
  },
  rpcUrls: {
    default: {
      http: ["https://sixnet-rpc-evm.sixprotocol.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Six Protocol Scan",
      url: "https://sixscan.io/sixnet"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/brawl.js
var skaleBlockBrawlers = /* @__PURE__ */ defineChain({
  id: 391845894,
  name: "SKALE | Block Brawlers",
  nativeCurrency: { name: "BRAWL", symbol: "BRAWL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/frayed-decent-antares"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/frayed-decent-antares"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://frayed-decent-antares.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/calypso.js
var skaleCalypso = /* @__PURE__ */ defineChain({
  id: 1564830818,
  name: "SKALE | Calypso NFT Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/honorable-steel-rasalhague"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3107626
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/calypsoTestnet.js
var skaleCalypsoTestnet = /* @__PURE__ */ defineChain({
  id: 974399131,
  name: "SKALE Calypso Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/giant-half-dual-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/giant-half-dual-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 103220
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/cryptoBlades.js
var skaleCryptoBlades = /* @__PURE__ */ defineChain({
  id: 1026062157,
  name: "SKALE | CryptoBlades",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/affectionate-immediate-pollux"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/cryptoColosseum.js
var skaleCryptoColosseum = /* @__PURE__ */ defineChain({
  id: 1032942172,
  name: "SKALE | Crypto Colosseum",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/haunting-devoted-deneb"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/haunting-devoted-deneb"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/europa.js
var skaleEuropa = /* @__PURE__ */ defineChain({
  id: 2046399126,
  name: "SKALE | Europa Liquidity Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/elated-tan-skat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/elated-tan-skat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://elated-tan-skat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3113495
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/europaTestnet.js
var skaleEuropaTestnet = /* @__PURE__ */ defineChain({
  id: 1444673419,
  name: "SKALE Europa Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/juicy-low-small-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 110858
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/exorde.js
var skaleExorde = /* @__PURE__ */ defineChain({
  id: 2139927552,
  name: "SKALE | Exorde",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/light-vast-diphda"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/light-vast-diphda"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://light-vast-diphda.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/humanProtocol.js
var skaleHumanProtocol = /* @__PURE__ */ defineChain({
  id: 1273227453,
  name: "SKALE | Human Protocol",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/wan-red-ain"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/wan-red-ain"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://wan-red-ain.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/nebula.js
var skaleNebula = /* @__PURE__ */ defineChain({
  id: 1482601649,
  name: "SKALE | Nebula Gaming Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://green-giddy-denebola.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2372986
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/nebulaTestnet.js
var skaleNebulaTestnet = /* @__PURE__ */ defineChain({
  id: 37084624,
  name: "SKALE Nebula Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/lanky-ill-funny-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 105141
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/razor.js
var skaleRazor = /* @__PURE__ */ defineChain({
  id: 278611351,
  name: "SKALE | Razor Network",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/turbulent-unique-scheat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/turbulent-unique-scheat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/titan.js
var skaleTitan = /* @__PURE__ */ defineChain({
  id: 1350216234,
  name: "SKALE | Titan Community Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/parallel-stormy-spica"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/parallel-stormy-spica"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2076458
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/skale/titanTestnet.js
var skaleTitanTestnet = /* @__PURE__ */ defineChain({
  id: 1020352220,
  name: "SKALE Titan Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/aware-fake-trim-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/aware-fake-trim-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 104072
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sketchpad.js
var sketchpad = /* @__PURE__ */ defineChain({
  id: 984123,
  name: "Forma Sketchpad",
  network: "sketchpad",
  nativeCurrency: {
    symbol: "TIA",
    name: "TIA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sketchpad-1.forma.art"],
      webSocket: ["wss://ws.sketchpad-1.forma.art"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sketchpad Explorer",
      url: "https://explorer.sketchpad-1.forma.art"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/snax.js
var sourceId43 = 1;
var snax = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2192,
  network: "snaxchain-mainnet",
  name: "SnaxChain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.snaxchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Snax Explorer",
      url: "https://explorer.snaxchain.io",
      apiUrl: "https://explorer.snaxchain.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId43]: {
        address: "0x472562Fcf26D6b2793f8E0b0fB660ba0E5e08A46"
      }
    },
    l2OutputOracle: {
      [sourceId43]: {
        address: "0x2172e492Fc807F5d5645D0E3543f139ECF539294"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId43]: {
        address: "0x79f446D024d74D0Bb6E699C131c703463c5D65E9"
      }
    },
    l1StandardBridge: {
      [sourceId43]: {
        address: "0x6534Bdb6b5c060d3e6aa833433333135eFE8E0aA"
      }
    }
  },
  sourceId: sourceId43
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/snaxTestnet.js
var sourceId44 = 11155111;
var snaxTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 13001,
  network: "snaxchain-testnet",
  name: "SnaxChain Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.snaxchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Snax Explorer",
      url: "https://testnet-explorer.snaxchain.io",
      apiUrl: "https://testnet-explorer.snaxchain.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId44]: {
        address: "0x206a75d89d45F146C54020F132FF93bEDD09f55E"
      }
    },
    l2OutputOracle: {
      [sourceId44]: {
        address: "0x60e3A368a4cdCEf85ffB964e372726F56A46221e"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId44]: {
        address: "0xb5afdd0E8dDF081Ef90e8A3e0c7b5798e66E954E"
      }
    },
    l1StandardBridge: {
      [sourceId44]: {
        address: "0xbd37E1a59D4C00C9A46F75018dffd84061bC5f74"
      }
    }
  },
  testnet: true,
  sourceId: sourceId44
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/soneiumMinato.js
var sourceId45 = 11155111;
var soneiumMinato = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1946,
  name: "Soneium Minato Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.minato.soneium.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://soneium-minato.blockscout.com",
      apiUrl: "https://soneium-minato.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId45]: {
        address: "0xB3Ad2c38E6e0640d7ce6aA952AB3A60E81bf7a01"
      }
    },
    l2OutputOracle: {
      [sourceId45]: {
        address: "0x710e5286C746eC38beeB7538d0146f60D27be343"
      }
    },
    portal: {
      [sourceId45]: {
        address: "0x65ea1489741A5D72fFdD8e6485B216bBdcC15Af3",
        blockCreated: 6466136
      }
    },
    l1StandardBridge: {
      [sourceId45]: {
        address: "0x5f5a404A5edabcDD80DB05E8e54A78c9EBF000C2",
        blockCreated: 6466136
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1
    }
  },
  testnet: true,
  sourceId: sourceId45
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sonic.js
var sonic = /* @__PURE__ */ defineChain({
  id: 146,
  name: "Sonic",
  nativeCurrency: {
    decimals: 18,
    name: "Sonic",
    symbol: "S"
  },
  rpcUrls: {
    default: { http: ["https://rpc.soniclabs.com"] }
  },
  blockExplorers: {
    default: {
      name: "Sonic Explorer",
      url: "https://sonicscan.org/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 60
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sonicTestnet.js
var sonicTestnet = /* @__PURE__ */ defineChain({
  id: 64165,
  name: "Sonic Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sonic",
    symbol: "S"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.soniclabs.com"] }
  },
  blockExplorers: {
    default: {
      name: "Sonic Testnet Explorer",
      url: "https://testnet.soniclabs.com/"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/songbird.js
var songbird = /* @__PURE__ */ defineChain({
  id: 19,
  name: "Songbird Canary-Network",
  nativeCurrency: {
    decimals: 18,
    name: "Songbird",
    symbol: "SGB"
  },
  rpcUrls: {
    default: { http: ["https://songbird-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Songbird Explorer",
      url: "https://songbird-explorer.flare.network",
      apiUrl: "https://songbird-explorer.flare.network/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/songbirdTestnet.js
var songbirdTestnet = /* @__PURE__ */ defineChain({
  id: 16,
  name: "Songbird Testnet Coston",
  nativeCurrency: {
    decimals: 18,
    name: "Coston Flare",
    symbol: "CFLR"
  },
  rpcUrls: {
    default: { http: ["https://coston-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston Explorer",
      url: "https://coston-explorer.flare.network",
      apiUrl: "https://coston-explorer.flare.network/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sophon.js
var sophon = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 50104,
  name: "Sophon",
  nativeCurrency: {
    decimals: 18,
    name: "Sophon",
    symbol: "SOPH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sophon.xyz"],
      webSocket: ["wss://rpc.sophon.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sophon Block Explorer",
      url: "https://explorer.sophon.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0x5f4867441d2416cA88B1b3fd38f21811680CD2C8",
      blockCreated: 116
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/sophonTestnet.js
var sophonTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 531050104,
  name: "Sophon Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sophon",
    symbol: "SOPH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.sophon.xyz"],
      webSocket: ["wss://rpc.testnet.sophon.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sophon Block Explorer",
      url: "https://explorer.testnet.sophon.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0x83c04d112adedA2C6D9037bb6ecb42E7f0b108Af",
      blockCreated: 15642
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/spicy.js
var spicy = /* @__PURE__ */ defineChain({
  id: 88882,
  name: "Chiliz Spicy Testnet",
  network: "chiliz-spicy-Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://spicy-rpc.chiliz.com",
        "https://chiliz-spicy-rpc.publicnode.com"
      ],
      webSocket: [
        "wss://spicy-rpc-ws.chiliz.com",
        "wss://chiliz-spicy-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "http://spicy-explorer.chiliz.com",
      apiUrl: "http://spicy-explorer.chiliz.com/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/step.js
var step = /* @__PURE__ */ defineChain({
  id: 1234,
  name: "Step Network",
  nativeCurrency: { name: "FITFI", symbol: "FITFI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.step.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Step Scan",
      url: "https://stepscan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/storyOdyssey.js
var storyOdyssey = /* @__PURE__ */ defineChain({
  id: 1516,
  name: "Story Odyssey",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP"
  },
  rpcUrls: {
    default: { http: ["https://rpc.odyssey.storyrpc.io"] }
  },
  blockExplorers: {
    default: {
      name: "Story Odyssey Explorer",
      url: "https://odyssey.storyscan.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/storyTestnet.js
var storyTestnet = /* @__PURE__ */ defineChain({
  id: 1513,
  name: "Story Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP"
  },
  rpcUrls: {
    default: { http: ["https://testnet.storyrpc.io"] }
  },
  blockExplorers: {
    default: {
      name: "Story Testnet Explorer",
      url: "https://testnet.storyscan.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/stratis.js
var stratis = /* @__PURE__ */ defineChain({
  id: 105105,
  name: "Stratis Mainnet",
  network: "stratis",
  nativeCurrency: {
    name: "Stratis",
    symbol: "STRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Stratis Explorer",
      url: "https://explorer.stratisevm.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/superlumio.js
var superlumio = /* @__PURE__ */ defineChain({
  id: 8866,
  name: "SuperLumio",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.lumio.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Lumio explorer",
      url: "https://explorer.lumio.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/superposition.js
var superposition = /* @__PURE__ */ defineChain({
  id: 55244,
  name: "Superposition",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.superposition.so"] }
  },
  blockExplorers: {
    default: {
      name: "Superposition Explorer",
      url: "https://explorer.superposition.so"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 39
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/superseed.js
var sourceId46 = 1;
var superseed = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 5330,
  name: "Superseed",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.superseed.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Superseed Explorer",
      url: "https://explorer.superseed.xyz",
      apiUrl: "https://explorer.superseed.xyz/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId46]: {
        address: "0x8b097CF1f9BbD9cbFD0DD561858a1FCbC8857Be0",
        blockCreated: 20737481
      }
    },
    l2OutputOracle: {
      [sourceId46]: {
        address: "0x693A0F8854F458D282DE3C5b69E8eE5EEE8aA949",
        blockCreated: 20737481
      }
    },
    portal: {
      [sourceId46]: {
        address: "0x2c2150aa5c75A24fB93d4fD2F2a895D618054f07",
        blockCreated: 20737481
      }
    },
    l1StandardBridge: {
      [sourceId46]: {
        address: "0x8b0576E39F1233679109F9b40cFcC2a7E0901Ede",
        blockCreated: 20737481
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  },
  sourceId: sourceId46
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/superseedSepolia.js
var sourceId47 = 11155111;
var superseedSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 53302,
  name: "Superseed Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.superseed.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Superseed Sepolia Explorer",
      url: "https://sepolia-explorer.superseed.xyz",
      apiUrl: "https://sepolia-explorer.superseed.xyz/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    },
    portal: {
      [sourceId47]: {
        address: "0x7A0db8C51432d2C3eb4e8f360a2EeB26FF2809fB",
        blockCreated: 5523438
      }
    },
    l1StandardBridge: {
      [sourceId47]: {
        address: "0x2B227A603fAAdB3De0ED050b63ADD232B5f2c28C",
        blockCreated: 5523442
      }
    }
  },
  testnet: true,
  sourceId: sourceId47
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/swan.js
var swan = /* @__PURE__ */ defineChain({
  id: 254,
  name: "Swan Chain Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.swanchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://swanscan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/swanProximaTestnet.js
var swanProximaTestnet = /* @__PURE__ */ defineChain({
  id: 20241133,
  name: "Swan Proxima Testnet",
  nativeCurrency: { name: "Swan Ether", symbol: "sETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-proxima.swanchain.io	"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://proxima-explorer.swanchain.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/swanSaturnTestnet.js
var swanSaturnTestnet = /* @__PURE__ */ defineChain({
  id: 2024,
  name: "Swan Saturn Testnet",
  nativeCurrency: { name: "Swan Ether", symbol: "sETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://saturn-rpc.swanchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://saturn-explorer.swanchain.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/swissdlt.js
var swissdlt = /* @__PURE__ */ defineChain({
  id: 94,
  name: "SwissDLT Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BCTS",
    symbol: "BCTS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.swissdlt.ch"]
    }
  },
  blockExplorers: {
    default: {
      name: "SwissDLT Explorer",
      url: "https://explorer.swissdlt.ch"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/syscoin.js
var syscoin = /* @__PURE__ */ defineChain({
  id: 57,
  name: "Syscoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.syscoin.org"],
      webSocket: ["wss://rpc.syscoin.org/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinExplorer",
      url: "https://explorer.syscoin.org",
      apiUrl: "https://explorer.syscoin.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 287139
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/syscoinTestnet.js
var syscoinTestnet = /* @__PURE__ */ defineChain({
  id: 5700,
  name: "Syscoin Tanenbaum Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tanenbaum.io"],
      webSocket: ["wss://rpc.tanenbaum.io/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinTestnetExplorer",
      url: "https://tanenbaum.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 271288
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taiko.js
var taiko = /* @__PURE__ */ defineChain({
  id: 167e3,
  name: "Taiko Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taiko.xyz"],
      webSocket: ["wss://ws.mainnet.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://taikoscan.io",
      apiUrl: "https://api.taikoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcb2436774C3e191c85056d248EF4260ce5f27A9D"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taikoHekla.js
var taikoHekla = /* @__PURE__ */ defineChain({
  id: 167009,
  name: "Taiko Hekla L2",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.hekla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://hekla.taikoscan.network"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 59757
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taikoJolnir.js
var taikoJolnir = /* @__PURE__ */ defineChain({
  id: 167007,
  name: "Taiko Jolnir (Alpha-5 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.jolnir.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.jolnir.taiko.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 732706
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taikoKatla.js
var taikoKatla = /* @__PURE__ */ defineChain({
  id: 167008,
  name: "Taiko Katla (Alpha-6 Testnet)",
  network: "tko-katla",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.katla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.katla.taiko.xyz"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taikoTestnetSepolia.js
var taikoTestnetSepolia = /* @__PURE__ */ defineChain({
  id: 167005,
  name: "Taiko (Alpha-3 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.test.taiko.xyz"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taraxa.js
var taraxa = /* @__PURE__ */ defineChain({
  id: 841,
  name: "Taraxa Mainnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.mainnet.taraxa.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/taraxaTestnet.js
var taraxaTestnet = /* @__PURE__ */ defineChain({
  id: 842,
  name: "Taraxa Testnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.testnet.taraxa.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/telcoinTestnet.js
var telcoinTestnet = /* @__PURE__ */ defineChain({
  id: 2017,
  name: "Telcoin Adiri Testnet",
  nativeCurrency: { name: "Telcoin", symbol: "TEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.telcoin.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "telscan",
      url: "https://telscan.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/telos.js
var telos = /* @__PURE__ */ defineChain({
  id: 40,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan",
      url: "https://www.teloscan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 246530709
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/telosTestnet.js
var telosTestnet = /* @__PURE__ */ defineChain({
  id: 41,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://testnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan (testnet)",
      url: "https://testnet.teloscan.io/"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/tenet.js
var tenet = /* @__PURE__ */ defineChain({
  id: 1559,
  name: "Tenet",
  network: "tenet-mainnet",
  nativeCurrency: {
    name: "TENET",
    symbol: "TENET",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.tenet.org"] }
  },
  blockExplorers: {
    default: {
      name: "TenetScan Mainnet",
      url: "https://tenetscan.io",
      apiUrl: "https://tenetscan.io/api"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/thaiChain.js
var thaiChain = /* @__PURE__ */ defineChain({
  id: 7,
  name: "ThaiChain",
  nativeCurrency: { name: "TCH", symbol: "TCH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.thaichain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.thaichain.org",
      apiUrl: "https://exp.thaichain.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0DaD6130e832c21719C5CE3bae93454E16A84826",
      blockCreated: 4806386
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/that.js
var that = /* @__PURE__ */ defineChain({
  id: 8428,
  name: "THAT Mainnet",
  nativeCurrency: { name: "THAT", symbol: "THAT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.thatchain.io/mainnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://that.blockscout.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/theta.js
var theta = /* @__PURE__ */ defineChain({
  id: 361,
  name: "Theta Mainnet",
  nativeCurrency: { name: "TFUEL", symbol: "TFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Theta Explorer",
      url: "https://explorer.thetatoken.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/thetaTestnet.js
var thetaTestnet = /* @__PURE__ */ defineChain({
  id: 365,
  name: "Theta Testnet",
  nativeCurrency: { name: "TFUEL", symbol: "TFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Theta Explorer",
      url: "https://testnet-explorer.thetatoken.org"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/thunderCore.js
var thunderCore = /* @__PURE__ */ defineChain({
  id: 108,
  name: "ThunderCore Mainnet",
  nativeCurrency: { name: "TT", symbol: "TT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.thundercore.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "ThunderCore Explorer",
      url: "https://explorer-mainnet.thundercore.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/thunderTestnet.js
var thunderTestnet = /* @__PURE__ */ defineChain({
  id: 997,
  name: "5ireChain Thunder Testnet",
  nativeCurrency: { name: "5ire Token", symbol: "5IRE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.5ire.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "5ireChain Thunder Explorer",
      url: "https://testnet.5irescan.io/"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/tiktrixTestnet.js
var tiktrixTestnet = /* @__PURE__ */ defineChain({
  id: 62092,
  name: "TikTrix Testnet",
  nativeCurrency: {
    name: "tTTX",
    symbol: "tTTX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://tiktrix-rpc.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "TikTrix Testnet Explorer",
      url: "https://tiktrix.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/tomb.js
var tomb = /* @__PURE__ */ defineChain({
  id: 6969,
  name: "Tomb Mainnet",
  nativeCurrency: { name: "TOMB", symbol: "TOMB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.tombchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Tomb Explorer",
      url: "https://tombscout.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/treasure.js
var treasure = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 61166,
  name: "Treasure",
  nativeCurrency: {
    decimals: 18,
    name: "MAGIC",
    symbol: "MAGIC"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.treasure.lol"],
      webSocket: ["wss://rpc.treasure.lol/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Treasure Block Explorer",
      url: "https://treasurescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0x2e29fe39496a56856D8698bD43e1dF4D0CE6266a",
      blockCreated: 101
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/treasureTopaz.js
var treasureTopaz = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 978658,
  name: "Treasure Topaz Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MAGIC",
    symbol: "MAGIC"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.topaz.treasure.lol"],
      webSocket: ["wss://rpc.topaz.treasure.lol/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Treasure Topaz Block Explorer",
      url: "https://topaz.treasurescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963",
      blockCreated: 108112
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/tron.js
var tron = /* @__PURE__ */ defineChain({
  id: 728126428,
  name: "Tron",
  nativeCurrency: { name: "TRON", symbol: "TRX", decimals: 6 },
  rpcUrls: {
    default: {
      http: ["https://api.trongrid.io/jsonrpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Tronscan",
      url: "https://tronscan.org",
      apiUrl: "https://apilist.tronscanapi.com/api"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ubiq.js
var ubiq = /* @__PURE__ */ defineChain({
  id: 8,
  name: "Ubiq Mainnet",
  nativeCurrency: { name: "UBQ", symbol: "UBQ", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://pyrus2.ubiqscan.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ubiq Scan",
      url: "https://ubiqscan.io"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ultron.js
var ultron = /* @__PURE__ */ defineChain({
  id: 1231,
  name: "Ultron Mainnet",
  nativeCurrency: { name: "ULX", symbol: "ULX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ultron-rpc.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ultron Scan",
      url: "https://ulxscan.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/ultronTestnet.js
var ultronTestnet = /* @__PURE__ */ defineChain({
  id: 1230,
  name: "Ultron Testnet",
  nativeCurrency: { name: "ULX", symbol: "ULX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ultron-dev.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ultron Scan",
      url: "https://explorer.ultron-dev.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/unichainSepolia.js
var sourceId48 = 11155111;
var unichainSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1301,
  name: "Unichain Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.unichain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Uniscan",
      url: "https://sepolia.uniscan.xyz",
      apiUrl: "https://api-sepolia.uniscan.xyz/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    portal: {
      [sourceId48]: {
        address: "0x0d83dab629f0e0F9d36c0Cbc89B69a489f0751bD"
      }
    },
    l1StandardBridge: {
      [sourceId48]: {
        address: "0xea58fcA6849d79EAd1f26608855c2D6407d54Ce2"
      }
    },
    disputeGameFactory: {
      [sourceId48]: {
        address: "0xeff73e5aa3B9AEC32c659Aa3E00444d20a84394b"
      }
    }
  },
  testnet: true,
  sourceId: sourceId48
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/unique.js
var unique = /* @__PURE__ */ defineChain({
  id: 8880,
  name: "Unique Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "UNQ",
    symbol: "UNQ"
  },
  rpcUrls: {
    default: { http: ["https://rpc.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Unique Subscan",
      url: "https://unique.subscan.io/"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/uniqueOpal.js
var uniqueOpal = /* @__PURE__ */ defineChain({
  id: 8882,
  name: "Opal Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "OPL",
    symbol: "OPL"
  },
  rpcUrls: {
    default: { http: ["https://rpc-opal.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Opal Subscan",
      url: "https://opal.subscan.io/"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/uniqueQuartz.js
var uniqueQuartz = /* @__PURE__ */ defineChain({
  id: 8881,
  name: "Quartz Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "QTZ",
    symbol: "QTZ"
  },
  rpcUrls: {
    default: { http: ["https://rpc-quartz.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Quartz Subscan",
      url: "https://quartz.subscan.io/"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/unreal.js
var unreal = /* @__PURE__ */ defineChain({
  id: 18233,
  name: "Unreal",
  nativeCurrency: {
    name: "reETH",
    decimals: 18,
    symbol: "reETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.unreal-orbit.gelato.digital"] }
  },
  blockExplorers: {
    default: {
      name: "Unreal Explorer",
      url: "https://unreal.blockscout.com",
      apiUrl: "https://unreal.blockscout.com/api/v2"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x8b6B0e60D8CD84898Ea8b981065A12F876eA5677",
      blockCreated: 1745
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/vanar.js
var vanar = /* @__PURE__ */ defineChain({
  id: 2040,
  name: "Vanar Mainnet",
  nativeCurrency: { name: "VANRY", symbol: "VANRY", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.vanarchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vanar Mainnet Explorer",
      url: "https://explorer.vanarchain.com/"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/vechain.js
var vechain = /* @__PURE__ */ defineChain({
  id: 100009,
  name: "Vechain",
  nativeCurrency: { name: "VeChain", symbol: "VET", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.vechain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vechain Explorer",
      url: "https://explore.vechain.org"
    },
    vechainStats: {
      name: "Vechain Stats",
      url: "https://vechainstats.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/velas.js
var velas = /* @__PURE__ */ defineChain({
  id: 106,
  name: "Velas EVM Mainnet",
  nativeCurrency: { name: "VLX", symbol: "VLX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmexplorer.velas.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Velas Explorer",
      url: "https://evmexplorer.velas.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 55883577
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/viction.js
var viction = /* @__PURE__ */ defineChain({
  id: 88,
  name: "Viction",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "VIC Scan",
      url: "https://vicscan.xyz"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/victionTestnet.js
var victionTestnet = /* @__PURE__ */ defineChain({
  id: 89,
  name: "Viction Testnet",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "VIC Scan",
      url: "https://testnet.vicscan.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 12170179
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/vision.js
var vision = /* @__PURE__ */ defineChain({
  id: 888888,
  name: "Vision",
  nativeCurrency: { name: "VISION", symbol: "VS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://infragrid.v.network/ethereum/compatible"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vision Scan",
      url: "https://visionscan.org"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/visionTestnet.js
var visionTestnet = /* @__PURE__ */ defineChain({
  id: 666666,
  name: "Vision Testnet",
  nativeCurrency: { name: "VISION", symbol: "VS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://vpioneer.infragrid.v.network/ethereum/compatible"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vision Scan",
      url: "https://visionscan.org/?chain=vpioneer"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/wanchain.js
var wanchain = /* @__PURE__ */ defineChain({
  id: 888,
  name: "Wanchain",
  nativeCurrency: { name: "WANCHAIN", symbol: "WAN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://gwan-ssl.wandevs.org:56891",
        "https://gwan2-ssl.wandevs.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScan",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB",
      blockCreated: 25312390
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/wanchainTestnet.js
var wanchainTestnet = /* @__PURE__ */ defineChain({
  id: 999,
  name: "Wanchain Testnet",
  nativeCurrency: { name: "WANCHAIN", symbol: "WANt", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://gwan-ssl.wandevs.org:46891"]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScanTest",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0x11c89bF4496c39FB80535Ffb4c92715839CC5324",
      blockCreated: 24743448
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/weavevmAlphanet.js
var weaveVMAlphanet = /* @__PURE__ */ defineChain({
  id: 9496,
  name: "WeaveVM Alphanet",
  nativeCurrency: { name: "Testnet WeaveVM", symbol: "tWVM", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.wvm.dev"] }
  },
  blockExplorers: {
    default: {
      name: "WeaveVM Alphanet Explorer",
      url: "https://explorer.wvm.dev"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/wemix.js
var wemix = /* @__PURE__ */ defineChain({
  id: 1111,
  name: "WEMIX",
  network: "wemix-mainnet",
  nativeCurrency: { name: "WEMIX", symbol: "WEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://explorer.wemix.com"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/wemixTestnet.js
var wemixTestnet = /* @__PURE__ */ defineChain({
  id: 1112,
  name: "WEMIX Testnet",
  network: "wemix-testnet",
  nativeCurrency: { name: "WEMIX", symbol: "tWEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.test.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://testnet.wemixscan.com",
      apiUrl: "https://testnet.wemixscan.com/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/worldchain.js
var sourceId49 = 1;
var worldchain = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 480,
  name: "World Chain",
  network: "worldchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://worldchain-mainnet.g.alchemy.com/public"] }
  },
  blockExplorers: {
    default: {
      name: "Worldscan",
      url: "https://worldscan.org",
      apiUrl: "https://api.worldscan.org/api"
    },
    blockscout: {
      name: "Blockscout",
      url: "https://worldchain-mainnet.explorer.alchemy.com",
      apiUrl: "https://worldchain-mainnet.explorer.alchemy.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    disputeGameFactory: {
      [sourceId49]: {
        address: "0x0E90dCAFBC242D2C861A20Bb20EC8E7182965a52"
      }
    },
    l2OutputOracle: {
      [sourceId49]: {
        address: "0x19A6d1E9034596196295CF148509796978343c5D"
      }
    },
    portal: {
      [sourceId49]: {
        address: "0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C"
      }
    },
    l1StandardBridge: {
      [sourceId49]: {
        address: "0x470458C91978D2d929704489Ad730DC3E3001113"
      }
    }
  },
  testnet: false,
  sourceId: sourceId49
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/worldchainSepolia.js
var sourceId50 = 11155111;
var worldchainSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 4801,
  name: "World Chain Sepolia",
  network: "worldchain-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://worldchain-sepolia.g.alchemy.com/public"] },
    public: { http: ["https://worldchain-sepolia.g.alchemy.com/public"] }
  },
  blockExplorers: {
    default: {
      name: "Worldscan Sepolia",
      url: "https://sepolia.worldscan.org"
    },
    blockscout: {
      name: "Blockscout",
      url: "https://worldchain-sepolia.explorer.alchemy.com",
      apiUrl: "https://worldchain-sepolia.explorer.alchemy.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    disputeGameFactory: {
      [sourceId50]: {
        address: "0x8cF97Ee616C986a070F5020d973b456D0120C253"
      }
    },
    l2OutputOracle: {
      [sourceId50]: {
        address: "0xc8886f8BAb6Eaeb215aDB5f1c686BF699248300e"
      }
    },
    portal: {
      [sourceId50]: {
        address: "0xFf6EBa109271fe6d4237EeeD4bAb1dD9A77dD1A4"
      }
    },
    l1StandardBridge: {
      [sourceId50]: {
        address: "0xd7DF54b3989855eb66497301a4aAEc33Dbb3F8DE"
      }
    }
  },
  testnet: true,
  sourceId: sourceId50
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/worldLand.js
var worldLand = /* @__PURE__ */ defineChain({
  id: 103,
  name: "WorldLand Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "WLC",
    symbol: "WLC"
  },
  rpcUrls: {
    default: {
      http: ["https://seoul.worldland.foundation"]
    }
  },
  blockExplorers: {
    default: {
      name: "WorldLand Scan",
      url: "https://scan.worldland.foundation"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xai.js
var xai = /* @__PURE__ */ defineChain({
  id: 660279,
  name: "Xai Mainnet",
  nativeCurrency: { name: "Xai", symbol: "XAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.xai-chain.net"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 222549
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xaiTestnet.js
var xaiTestnet = /* @__PURE__ */ defineChain({
  id: 37714555429,
  name: "Xai Testnet",
  nativeCurrency: { name: "sXai", symbol: "sXAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-v2.xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer-v2.xai-chain.net"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xdc.js
var xdc = /* @__PURE__ */ defineChain({
  id: 50,
  name: "XinFin Network",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xdcrpc.com"] }
  },
  blockExplorers: {
    default: {
      name: "XDCScan",
      url: "https://xdcscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0B1795ccA8E4eC4df02346a082df54D437F8D9aF",
      blockCreated: 75884020
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xdcTestnet.js
var xdcTestnet = /* @__PURE__ */ defineChain({
  id: 51,
  name: "Apothem Network",
  nativeCurrency: {
    decimals: 18,
    name: "TXDC",
    symbol: "TXDC"
  },
  rpcUrls: {
    default: { http: ["https://erpc.apothem.network"] }
  },
  blockExplorers: {
    default: {
      name: "XDCScan",
      url: "https://testnet.xdcscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 59765389
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xLayer.js
var xLayer = /* @__PURE__ */ defineChain({
  id: 196,
  name: "X Layer Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xlayer.tech"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/xlayer",
      apiUrl: "https://www.oklink.com/api/v5/explorer/xlayer/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 47416
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xLayerTestnet.js
var xLayerTestnet = /* @__PURE__ */ defineChain({
  id: 195,
  name: "X1 Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://xlayertestrpc.okx.com"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/xlayer-test"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 624344
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xrOne.js
var xrOne = /* @__PURE__ */ defineChain({
  id: 273,
  name: "XR One",
  nativeCurrency: {
    decimals: 18,
    name: "XR",
    symbol: "XR"
  },
  rpcUrls: {
    default: { http: ["https://xr-one.calderachain.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://xr-one.calderaexplorer.xyz"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/xrSepolia.js
var xrSepolia = /* @__PURE__ */ defineChain({
  id: 2730,
  name: "XR Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "tXR",
    symbol: "tXR"
  },
  rpcUrls: {
    default: { http: ["https://xr-sepolia-testnet.rpc.caldera.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://xr-sepolia-testnet.explorer.caldera.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/yooldoVerse.js
var yooldoVerse = /* @__PURE__ */ defineChain({
  id: 50005,
  name: "Yooldo Verse",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Explorer",
      url: "https://explorer.yooldo-verse.xyz"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/yooldoVerseTestnet.js
var yooldoVerseTestnet = /* @__PURE__ */ defineChain({
  id: 50006,
  name: "Yooldo Verse Testnet",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Testnet Explorer",
      url: "https://explorer.testnet.yooldo-verse.xyz"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zenchainTestnet.js
var zenchainTestnet = /* @__PURE__ */ defineChain({
  id: 8408,
  name: "Zenchain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ZCX",
    symbol: "ZCX"
  },
  rpcUrls: {
    default: {
      http: ["https://zenchain-testnet.api.onfinality.io/public"],
      webSocket: ["wss://zenchain-testnet.api.onfinality.io/public-ws"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 230019
    }
  },
  blockExplorers: {
    default: {
      name: "Zentrace",
      url: "https://zentrace.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zeniq.js
var zeniq = /* @__PURE__ */ defineChain({
  id: 383414847825,
  name: "Zeniq Mainnet",
  nativeCurrency: { name: "ZENIQ", symbol: "ZENIQ", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.zeniq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zeniq Explorer",
      url: "https://zeniqscan.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zetachain.js
var zetachain = /* @__PURE__ */ defineChain({
  id: 7e3,
  name: "ZetaChain",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "ZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1632781
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://explorer.zetachain.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zetachainAthensTestnet.js
var zetachainAthensTestnet = /* @__PURE__ */ defineChain({
  id: 7001,
  name: "ZetaChain Athens Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "aZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2715217
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://athens.explorer.zetachain.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zhejiang.js
var zhejiang = /* @__PURE__ */ defineChain({
  id: 1337803,
  name: "Zhejiang",
  nativeCurrency: { name: "Zhejiang Ether", symbol: "ZhejETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.zhejiang.ethpandaops.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beaconchain",
      url: "https://zhejiang.beaconcha.in"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zilliqa.js
var zilliqa = /* @__PURE__ */ defineChain({
  id: 32769,
  name: "Zilliqa",
  network: "zilliqa",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.zilliqa.com"
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zilliqaTestnet.js
var zilliqaTestnet = /* @__PURE__ */ defineChain({
  id: 33101,
  name: "Zilliqa Testnet",
  network: "zilliqa-testnet",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dev-api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.testnet.zilliqa.com"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zircuit.js
var sourceId51 = 1;
var zircuit = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 48900,
  name: "Zircuit Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: [
        "https://zircuit1-mainnet.p2pify.com",
        "https://zircuit1-mainnet.liquify.com",
        "https://zircuit-mainnet.drpc.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Zircuit Explorer",
      url: "https://explorer.zircuit.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    },
    l2OutputOracle: {
      [sourceId51]: {
        address: "0x92Ef6Af472b39F1b363da45E35530c24619245A4"
      }
    },
    portal: {
      [sourceId51]: {
        address: "0x17bfAfA932d2e23Bd9B909Fd5B4D2e2a27043fb1"
      }
    },
    l1StandardBridge: {
      [sourceId51]: {
        address: "0x386B76D9cA5F5Fb150B6BFB35CF5379B22B26dd8"
      }
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zircuitTestnet.js
var sourceId52 = 11155111;
var zircuitTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 48899,
  name: "Zircuit Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://zircuit1-testnet.p2pify.com",
        "https://zircuit1-testnet.liquify.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Zircuit Testnet Explorer",
      url: "https://explorer.testnet.zircuit.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 6040287
    },
    l2OutputOracle: {
      [sourceId52]: {
        address: "0x740C2dac453aEf7140809F80b72bf0e647af8148"
      }
    },
    portal: {
      [sourceId52]: {
        address: "0x787f1C8c5924178689E0560a43D848bF8E54b23e"
      }
    },
    l1StandardBridge: {
      [sourceId52]: {
        address: "0x0545c5fe980098C16fcD0eCB5E79753afa6d9af9"
      }
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zkFair.js
var zkFair = /* @__PURE__ */ defineChain({
  id: 42766,
  name: "ZKFair Mainnet",
  network: "zkfair-mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://scan.zkfair.io",
      apiUrl: "https://scan.zkfair.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6090959
    }
  },
  testnet: false
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zkFairTestnet.js
var zkFairTestnet = /* @__PURE__ */ defineChain({
  id: 43851,
  name: "ZKFair Testnet",
  network: "zkfair-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://testnet-scan.zkfair.io"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zkLinkNova.js
var zkLinkNova = /* @__PURE__ */ defineChain({
  id: 810180,
  name: "zkLink Nova",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.zklink.io"] }
  },
  blockExplorers: {
    default: {
      name: "zkLink Nova Block Explorer",
      url: "https://explorer.zklink.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zkLinkNovaSepoliaTestnet.js
var zkLinkNovaSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 810181,
  name: "zkLink Nova Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://sepolia.rpc.zklink.io"] }
  },
  blockExplorers: {
    default: {
      name: "zkLink Nova Block Explorer",
      url: "https://sepolia.explorer.zklink.io"
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksync.js
var zksync = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 324,
  name: "ZKsync Era",
  network: "zksync-era",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.era.zksync.io"],
      webSocket: ["wss://mainnet.era.zksync.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://era.zksync.network/",
      apiUrl: "https://api-era.zksync.network/api"
    },
    native: {
      name: "ZKsync Explorer",
      url: "https://explorer.zksync.io/",
      apiUrl: "https://block-explorer-api.mainnet.zksync.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 45659388
    }
  }
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncInMemoryNode.js
var zksyncInMemoryNode = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 260,
  name: "ZKsync InMemory Node",
  network: "zksync-in-memory-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:8011"]
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncLocalCustomHyperchain.js
var zksyncLocalCustomHyperchain = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 272,
  name: "ZKsync CLI Local Custom Hyperchain",
  nativeCurrency: { name: "BAT", symbol: "BAT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15200"],
      webSocket: ["ws://localhost:15201"]
    }
  },
  blockExplorers: {
    default: {
      name: "ZKsync explorer",
      url: "http://localhost:15005/",
      apiUrl: "http://localhost:15005/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncLocalHyperchain.js
var zksyncLocalHyperchain = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 270,
  name: "ZKsync CLI Local Hyperchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15100"],
      webSocket: ["ws://localhost:15101"]
    }
  },
  blockExplorers: {
    default: {
      name: "ZKsync explorer",
      url: "http://localhost:15005/",
      apiUrl: "http://localhost:15005/api"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncLocalHyperchainL1.js
var zksyncLocalHyperchainL1 = /* @__PURE__ */ defineChain({
  id: 9,
  name: "ZKsync CLI Local Hyperchain L1",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15045"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "http://localhost:15001/",
      apiUrl: "http://localhost:15001/api/v2"
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncLocalNode.js
var zksyncLocalNode = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 270,
  name: "ZKsync CLI Local Node",
  network: "zksync-cli-local-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:3050"]
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zksyncSepoliaTestnet.js
var zksyncSepoliaTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 300,
  name: "ZKsync Sepolia Testnet",
  network: "zksync-sepolia-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
      webSocket: ["wss://sepolia.era.zksync.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia-era.zksync.network/",
      apiUrl: "https://api-sepolia-era.zksync.network/api"
    },
    native: {
      name: "ZKsync Explorer",
      url: "https://sepolia.explorer.zksync.io/",
      blockExplorerApi: "https://block-explorer-api.sepolia.zksync.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 3855712
    }
  },
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zora.js
var sourceId53 = 1;
var zora = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 7777777,
  name: "Zora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zora.energy"],
      webSocket: ["wss://rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.zora.energy",
      apiUrl: "https://explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId53]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882
    },
    portal: {
      [sourceId53]: {
        address: "0x1a0ad011913A150f69f6A19DF447A0CfD9551054"
      }
    },
    l1StandardBridge: {
      [sourceId53]: {
        address: "0x3e2Ea9B92B7E48A52296fD261dc26fd995284631"
      }
    }
  },
  sourceId: sourceId53
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zoraSepolia.js
var sourceId54 = 11155111;
var zoraSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 999999999,
  name: "Zora Sepolia",
  network: "zora-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Sepolia",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.rpc.zora.energy"],
      webSocket: ["wss://sepolia.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zora Sepolia Explorer",
      url: "https://sepolia.explorer.zora.energy/",
      apiUrl: "https://sepolia.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId54]: {
        address: "0x2615B481Bd3E5A1C0C7Ca3Da1bdc663E8615Ade9"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 83160
    },
    portal: {
      [sourceId54]: {
        address: "0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f"
      }
    },
    l1StandardBridge: {
      [sourceId54]: {
        address: "0x5376f1D543dcbB5BD416c56C189e4cB7399fCcCB"
      }
    }
  },
  sourceId: sourceId54,
  testnet: true
});

// ../../node_modules/.pnpm/viem@2.21.58_bufferutil@4.0.9_typescript@5.6.3_utf-8-validate@5.0.10_zod@3.24.2/node_modules/viem/_esm/chains/definitions/zoraTestnet.js
var sourceId55 = 5;
var zoraTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 999,
  name: "Zora Goerli Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Goerli",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.zora.energy"],
      webSocket: ["wss://testnet.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.explorer.zora.energy",
      apiUrl: "https://testnet.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 189123
    },
    portal: {
      [sourceId55]: {
        address: "0xDb9F51790365e7dc196e7D072728df39Be958ACe"
      }
    }
  },
  sourceId: sourceId55,
  testnet: true
});

// src/constants.ts
var EVM_WALLET_DATA_CACHE_KEY = "evm/wallet/data";
var EVM_SERVICE_NAME = "evmService";
var CACHE_REFRESH_INTERVAL_MS = 60 * 1e3;

// src/providers/wallet.ts
var WalletProvider = class {
  cacheKey = "evm/wallet";
  chains = {};
  account;
  runtime;
  constructor(accountOrPrivateKey, runtime, chains) {
    this.setAccount(accountOrPrivateKey);
    if (chains) {
      this.chains = chains;
    }
    this.runtime = runtime;
  }
  getAddress() {
    return this.account.address;
  }
  getPublicClient(chainName) {
    const transport = this.createHttpTransport(chainName);
    const publicClient = createPublicClient({
      chain: this.chains[chainName],
      transport
    });
    return publicClient;
  }
  getWalletClient(chainName) {
    const transport = this.createHttpTransport(chainName);
    const walletClient = createWalletClient({
      chain: this.chains[chainName],
      transport,
      account: this.account
    });
    return walletClient;
  }
  getTestClient() {
    return createTestClient({
      chain: hardhat,
      mode: "hardhat",
      transport: http()
    }).extend(publicActions).extend(walletActions);
  }
  getChainConfigs(chainName) {
    const chain = this.chains[chainName];
    if (!chain?.id) {
      throw new Error(`Invalid chain name: ${chainName}`);
    }
    return chain;
  }
  getSupportedChains() {
    return Object.keys(this.chains);
  }
  async getWalletBalances() {
    const cacheKey2 = path.join(this.cacheKey, "walletBalances");
    const cachedData = await this.runtime.getCache(cacheKey2);
    if (cachedData) {
      elizaLogger.log(`Returning cached wallet balances`);
      return cachedData;
    }
    const balances = {};
    const chainNames = this.getSupportedChains();
    await Promise.all(
      chainNames.map(async (chainName) => {
        try {
          const balance = await this.getWalletBalanceForChain(chainName);
          if (balance !== null) {
            balances[chainName] = balance;
          }
        } catch (error) {
          elizaLogger.error(`Error getting balance for ${chainName}:`, error);
        }
      })
    );
    await this.runtime.setCache(cacheKey2, balances);
    elizaLogger.log("Wallet balances cached");
    return balances;
  }
  async getWalletBalanceForChain(chainName) {
    try {
      const client = this.getPublicClient(chainName);
      const balance = await client.getBalance({
        address: this.account.address
      });
      return formatUnits(balance, 18);
    } catch (error) {
      console.error(`Error getting wallet balance for ${chainName}:`, error);
      return null;
    }
  }
  addChain(chain) {
    this.addChains(chain);
  }
  setAccount = (accountOrPrivateKey) => {
    if (typeof accountOrPrivateKey === "string") {
      this.account = privateKeyToAccount(accountOrPrivateKey);
    } else {
      this.account = accountOrPrivateKey;
    }
  };
  addChains = (chains) => {
    if (!chains) {
      return;
    }
    this.chains = { ...this.chains, ...chains };
  };
  createHttpTransport = (chainName) => {
    const chain = this.chains[chainName];
    if (!chain) {
      throw new Error(`Chain not found: ${chainName}`);
    }
    if (chain.rpcUrls.custom) {
      return http(chain.rpcUrls.custom.http[0]);
    }
    return http(chain.rpcUrls.default.http[0]);
  };
  static genChainFromName(chainName, customRpcUrl) {
    const baseChain = chains_exports[chainName];
    if (!baseChain?.id) {
      throw new Error("Invalid chain name");
    }
    const viemChain = customRpcUrl ? {
      ...baseChain,
      rpcUrls: {
        ...baseChain.rpcUrls,
        custom: {
          http: [customRpcUrl]
        }
      }
    } : baseChain;
    return viemChain;
  }
};
var CELO_SUPPORTED_CHAINS = ["celo", "alfajores"];
var genChainsFromRuntime = (runtime) => {
  let configuredChains = [];
  if (runtime?.character?.settings && typeof runtime.character.settings === "object" && "evm" in runtime.character.settings && Array.isArray(runtime.character.settings.evm)) {
    configuredChains = runtime.character.settings.evm;
  }
  const chainsToUse = configuredChains.filter((chain) => CELO_SUPPORTED_CHAINS.includes(chain));
  if (!chainsToUse.length) {
    throw new Error('No supported Celo chains configured. Please configure either "celo" or "alfajores".');
  }
  const chains = {};
  for (const chainName of chainsToUse) {
    try {
      let rpcUrl = runtime.getSetting(`ETHEREUM_PROVIDER_${chainName.toUpperCase()}`);
      if (!rpcUrl) {
        rpcUrl = runtime.getSetting(`EVM_PROVIDER_${chainName.toUpperCase()}`);
      }
      if (!chains_exports[chainName]) {
        elizaLogger.warn(`Chain ${chainName} not found in viem chains, skipping`);
        continue;
      }
      const chain = WalletProvider.genChainFromName(chainName, rpcUrl);
      chains[chainName] = chain;
      elizaLogger.log(`Configured chain: ${chainName}`);
    } catch (error) {
      elizaLogger.error(`Error configuring chain ${chainName}:`, error);
    }
  }
  return chains;
};
var initWalletProvider = async (runtime) => {
  const teeMode = runtime.getSetting("TEE_MODE") || TEEMode.OFF;
  const chains = genChainsFromRuntime(runtime);
  if (teeMode !== TEEMode.OFF) {
    const walletSecretSalt = runtime.getSetting("WALLET_SECRET_SALT");
    if (!walletSecretSalt) {
      throw new Error("WALLET_SECRET_SALT required when TEE_MODE is enabled");
    }
    return new LazyTeeWalletProvider(runtime, walletSecretSalt, chains);
  }
  const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY is missing");
  }
  return new WalletProvider(privateKey, runtime, chains);
};
var LazyTeeWalletProvider = class extends WalletProvider {
  teeWallet = null;
  initPromise = null;
  walletSecretSalt;
  constructor(runtime, walletSecretSalt, chains) {
    super(
      "0x0000000000000000000000000000000000000000000000000000000000000001",
      runtime,
      chains
    );
    this.walletSecretSalt = walletSecretSalt;
  }
  async ensureInitialized() {
    if (this.teeWallet) return;
    if (!this.initPromise) {
      this.initPromise = this.initializeTeeWallet();
    }
    await this.initPromise;
  }
  async initializeTeeWallet() {
    const teeService = this.runtime.getService(ServiceType.TEE);
    if (!teeService) {
      throw new Error(
        "TEE service not found - ensure TEE plugin is registered before using TEE-dependent features"
      );
    }
    if (typeof teeService.deriveEcdsaKeypair !== "function") {
      throw new Error("TEE service does not implement deriveEcdsaKeypair method");
    }
    const { keypair, attestation } = await teeService.deriveEcdsaKeypair(
      this.walletSecretSalt,
      "evm",
      this.runtime.agentId
    );
    this.teeWallet = new WalletProvider(keypair, this.runtime, this.chains);
    this.account = this.teeWallet.account;
  }
  // Override methods that need the initialized wallet
  getAddress() {
    if (!this.teeWallet) {
      throw new Error(
        "TEE wallet not initialized yet. Ensure async operations complete before using synchronous methods."
      );
    }
    return this.teeWallet.getAddress();
  }
  getPublicClient(chainName) {
    if (!this.teeWallet) {
      return super.getPublicClient(chainName);
    }
    return this.teeWallet.getPublicClient(chainName);
  }
  getWalletClient(chainName) {
    if (!this.teeWallet) {
      throw new Error(
        "TEE wallet not initialized yet. Ensure async operations complete before using wallet client."
      );
    }
    return this.teeWallet.getWalletClient(chainName);
  }
  async getWalletBalances() {
    await this.ensureInitialized();
    return this.teeWallet.getWalletBalances();
  }
  async getWalletBalanceForChain(chainName) {
    await this.ensureInitialized();
    return this.teeWallet.getWalletBalanceForChain(chainName);
  }
};
var evmWalletProvider = {
  name: "EVMWalletProvider",
  async get(runtime, _message, state) {
    try {
      const evmService = runtime.getService(EVM_SERVICE_NAME);
      if (!evmService) {
        elizaLogger.warn("EVM service not found, falling back to direct fetching");
        return await directFetchWalletData(runtime, state);
      }
      const walletData = await evmService.getCachedData();
      if (!walletData) {
        elizaLogger.warn("No cached wallet data available, falling back to direct fetching");
        return await directFetchWalletData(runtime, state);
      }
      const agentName = state?.agentName || "The agent";
      const balanceText = walletData.chains.map((chain) => `${chain.name}: ${chain.balance} ${chain.symbol}`).join("\n");
      return {
        text: `${agentName}'s EVM Wallet Address: ${walletData.address}

Balances:
${balanceText}`,
        data: {
          address: walletData.address,
          chains: walletData.chains
        },
        values: {
          address: walletData.address,
          chains: JSON.stringify(walletData.chains)
        }
      };
    } catch (error) {
      console.error("Error in EVM wallet provider:", error);
      return {
        text: "Error getting EVM wallet provider",
        data: {},
        values: {}
      };
    }
  }
};
async function directFetchWalletData(runtime, state) {
  try {
    const walletProvider = await initWalletProvider(runtime);
    const address = walletProvider.getAddress();
    const balances = await walletProvider.getWalletBalances();
    const agentName = state?.agentName || "The agent";
    const chainDetails = Object.entries(balances).map(([chainName, balance]) => {
      const chain = walletProvider.getChainConfigs(chainName);
      return {
        chainName,
        balance,
        symbol: chain.nativeCurrency.symbol,
        chainId: chain.id,
        name: chain.name
      };
    });
    const balanceText = chainDetails.map((chain) => `${chain.name}: ${chain.balance} ${chain.symbol}`).join("\n");
    return {
      text: `${agentName}'s EVM Wallet Address: ${address}

Balances:
${balanceText}`,
      data: {
        address,
        chains: chainDetails
      },
      values: {
        address,
        chains: JSON.stringify(chainDetails)
      }
    };
  } catch (error) {
    console.error("Error fetching wallet data directly:", error);
    return {
      text: "Error getting EVM wallet provider",
      data: {},
      values: {}
    };
  }
}

// src/templates/index.ts
var transferTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{chainBalances}}

Extract the following information about the requested token transfer:
- Chain to execute on (must be one of the supported chains)
- Amount to transfer (only number without coin symbol, e.g., "0.1")
- Recipient address (must be a valid Ethereum address)
- Token symbol or address (if not a native token transfer)

Respond with an XML block containing only the extracted values. Use null for any values that cannot be determined.

<response>
    <fromChain>{{supportedChains}} | null</fromChain>
    <amount>string | null</amount>
    <toAddress>string | null</toAddress>
    <token>string | null</token>
</response>

IMPORTANT: Your response must ONLY contain the <response></response> XML block above. Do not include any text, thinking, or reasoning before or after this XML block. Start your response immediately with <response> and end with </response>.
`;
var bridgeTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{chainBalances}}

Extract the following information about the requested token bridge:
- Token symbol or address to bridge
- Source chain
- Destination chain
- Amount to bridge: Must be a string representing the amount in ether (only number without coin symbol, e.g., "0.1")
- Destination address (if specified)

Respond with an XML block containing only the extracted values. Use empty tags for any values that cannot be determined.

<response>
    <token>string | null</token>
    <fromChain>{{supportedChains}} | null</fromChain>
    <toChain>{{supportedChains}} | null</toChain>
    <amount>string | null</amount>
    <toAddress>string | null</toAddress>
</response>

IMPORTANT: Your response must ONLY contain the <response></response> XML block above. Do not include any text, thinking, or reasoning before or after this XML block. Start your response immediately with <response> and end with </response>.
`;
var swapTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{chainBalances}}

Extract the following information about the requested token swap:
- Input token symbol or address (the token being sold)
- Output token symbol or address (the token being bought)
- Amount to swap: Must be a string representing the amount in ether (only number without coin symbol, e.g., "0.1")
- Chain to execute on

Respond with an XML block containing only the extracted values. Use empty tags for any values that cannot be determined.

<response>
    <inputToken>string | null</inputToken>
    <outputToken>string | null</outputToken>
    <amount>string | null</amount>
    <chain>{{supportedChains}} | null</chain>
</response>

IMPORTANT: Your response must ONLY contain the <response></response> XML block above. Do not include any text, thinking, or reasoning before or after this XML block. Start your response immediately with <response> and end with </response>.
`;

// src/actions/bridge.ts
var BridgeAction = class {
  constructor(walletProvider) {
    this.walletProvider = walletProvider;
    this.config = createConfig({
      integrator: "eliza-agent",
      providers: [
        EVM({
          getWalletClient: async () => {
            const firstChain = Object.keys(this.walletProvider.chains)[0];
            return this.walletProvider.getWalletClient(firstChain);
          },
          switchChain: async (chainId) => {
            logger.debug(`LiFi requesting chain switch to ${chainId}...`);
            const chainName = this.getChainNameById(chainId);
            return this.walletProvider.getWalletClient(chainName);
          }
        })
      ],
      // Custom chains configuration
      chains: Object.values(this.walletProvider.chains).map((config) => ({
        id: config.id,
        name: config.name,
        key: config.name.toLowerCase(),
        chainType: "EVM",
        nativeToken: {
          ...config.nativeCurrency,
          chainId: config.id,
          address: "0x0000000000000000000000000000000000000000",
          coinKey: config.nativeCurrency.symbol
        },
        metamask: {
          chainId: `0x${config.id.toString(16)}`,
          chainName: config.name,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: [config.rpcUrls.default.http[0]],
          blockExplorerUrls: [config?.blockExplorers?.default?.url]
        },
        diamondAddress: "0x0000000000000000000000000000000000000000",
        coin: config.nativeCurrency.symbol,
        mainnet: true
      })),
      // Enable automatic route optimization
      routeOptions: {
        maxPriceImpact: 0.4,
        // 40% max price impact
        slippage: 5e-3
        // 0.5% slippage tolerance
      }
    });
  }
  config;
  activeRoutes = /* @__PURE__ */ new Map();
  getChainNameById(chainId) {
    const chain = Object.entries(this.walletProvider.chains).find(
      ([_, config]) => config.id === chainId
    );
    if (!chain) {
      throw new Error(`Chain with ID ${chainId} not found`);
    }
    return chain[0];
  }
  /**
   * Resolves a token symbol or address to a valid contract address using LiFi SDK
   */
  async resolveTokenAddress(tokenSymbolOrAddress, chainId) {
    if (tokenSymbolOrAddress.startsWith("0x") && tokenSymbolOrAddress.length === 42) {
      return tokenSymbolOrAddress;
    }
    if (tokenSymbolOrAddress === "0x0000000000000000000000000000000000000000") {
      return tokenSymbolOrAddress;
    }
    try {
      const token = await getToken(chainId, tokenSymbolOrAddress);
      return token.address;
    } catch (error) {
      elizaLogger2.error(
        `Failed to resolve token ${tokenSymbolOrAddress} on chain ${chainId}:`,
        error
      );
      return tokenSymbolOrAddress;
    }
  }
  /**
   * Get token decimals for proper amount parsing - works for any token
   */
  async getTokenDecimals(tokenAddress, chainName) {
    const chainConfig5 = this.walletProvider.getChainConfigs(chainName);
    if (tokenAddress === "0x0000000000000000000000000000000000000000" || tokenAddress.toUpperCase() === chainConfig5.nativeCurrency.symbol.toUpperCase()) {
      return chainConfig5.nativeCurrency.decimals;
    }
    try {
      const decimalsAbi = parseAbi(["function decimals() view returns (uint8)"]);
      const decimals = await this.walletProvider.getPublicClient(chainName).readContract({
        address: tokenAddress,
        abi: decimalsAbi,
        functionName: "decimals"
      });
      return decimals;
    } catch (error) {
      elizaLogger2.error(`Failed to get decimals for token ${tokenAddress} on ${chainName}:`, error);
      return 18;
    }
  }
  createExecutionOptions(routeId, onProgress) {
    return {
      // Gas optimization hook - modify transaction requests for better gas prices
      updateTransactionRequestHook: async (txRequest) => {
        try {
          if (txRequest.gas) {
            txRequest.gas = BigInt(txRequest.gas) * BigInt(110) / BigInt(100);
          }
          if (txRequest.gasPrice) {
            txRequest.gasPrice = BigInt(txRequest.gasPrice) * BigInt(105) / BigInt(100);
          }
          return txRequest;
        } catch (error) {
          console.warn("\u26A0\uFE0F Gas optimization failed, using default values:", error);
          return txRequest;
        }
      },
      // Exchange rate update handler for better UX
      acceptExchangeRateUpdateHook: async (params) => {
        const { toToken, oldToAmount, newToAmount } = params;
        const oldAmountFormatted = formatUnits(BigInt(oldToAmount), toToken.decimals);
        const newAmountFormatted = formatUnits(BigInt(newToAmount), toToken.decimals);
        const priceChange = (Number(newToAmount) - Number(oldToAmount)) / Number(oldToAmount) * 100;
        logger.debug(`Exchange rate changed for ${toToken.symbol}:`);
        logger.debug(`Old amount: ${oldAmountFormatted}`);
        logger.debug(`New amount: ${newAmountFormatted}`);
        logger.debug(`Change: ${priceChange.toFixed(2)}%`);
        if (Math.abs(priceChange) < 2) {
          logger.debug("Auto-accepting exchange rate change (< 2%)");
          return true;
        }
        if (Math.abs(priceChange) < 5) {
          logger.debug("Accepting exchange rate change (< 5%)");
          return true;
        }
        logger.debug("Rejecting exchange rate change (> 5%)");
        return false;
      },
      // Route monitoring and progress tracking
      updateRouteHook: (updatedRoute) => {
        const status = this.updateRouteStatus(routeId, updatedRoute);
        logger.debug(`Route ${routeId} progress: ${status.currentStep}/${status.totalSteps}`);
        status.transactionHashes.forEach((hash, index2) => {
          logger.debug(`Transaction ${index2 + 1}: ${hash}`);
        });
        if (onProgress) {
          onProgress(status);
        }
      },
      // Chain switching handler
      switchChainHook: async (chainId) => {
        logger.debug(`Switching to chain ${chainId}...`);
        try {
          const chainName = this.getChainNameById(chainId);
          const walletClient = this.walletProvider.getWalletClient(chainName);
          logger.debug("Chain switch successful");
          return walletClient;
        } catch (error) {
          logger.error("Chain switch failed:", error);
          throw error;
        }
      },
      // Enable background execution for better UX
      executeInBackground: false,
      // Disable message signing for compatibility with smart accounts
      disableMessageSigning: false
    };
  }
  updateRouteStatus(routeId, route) {
    let transactionHashes = [];
    let currentStep = 0;
    let isComplete = false;
    let error;
    route.steps.forEach((step2, stepIndex) => {
      if (step2.execution?.process) {
        step2.execution.process.forEach((process2) => {
          if (process2.txHash) {
            transactionHashes.push(process2.txHash);
          }
          if (process2.status === "DONE") {
            currentStep = Math.max(currentStep, stepIndex + 1);
          }
          if (process2.status === "FAILED") {
            error = `Step ${stepIndex + 1} failed: ${process2.error || "Unknown error"}`;
          }
        });
      }
    });
    isComplete = currentStep === route.steps.length && !error;
    const status = {
      route,
      isComplete,
      error,
      transactionHashes,
      currentStep,
      totalSteps: route.steps.length
    };
    this.activeRoutes.set(routeId, status);
    return status;
  }
  /**
   * Poll bridge status using LiFi's getStatus API for cross-chain completion monitoring
   */
  async pollBridgeStatus(txHash, fromChainId, toChainId, tool, routeId, maxAttempts = 60, intervalMs = 5e3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        const status = await getStatus({
          txHash,
          fromChain: fromChainId,
          toChain: toChainId,
          bridge: tool
        });
        logger.debug(
          `Poll attempt ${attempt}/${maxAttempts}: ${status.status}${status.substatus ? ` (${status.substatus})` : ""}`
        );
        const routeStatus2 = this.activeRoutes.get(routeId);
        if (!routeStatus2) {
          throw new Error(`Route ${routeId} not found in active routes`);
        }
        let isComplete = false;
        let error;
        if (status.status === "DONE") {
          isComplete = true;
          logger.debug("Bridge completed successfully!");
        } else if (status.status === "FAILED") {
          error = `Bridge failed: ${status.substatus || "Unknown error"}`;
          logger.debug(`Bridge failed: ${error}`);
        } else if (status.status === "PENDING") {
          logger.debug(`Bridge still pending: ${status.substatus || "Processing..."}`);
        }
        const updatedStatus = {
          ...routeStatus2,
          isComplete,
          error,
          currentStep: isComplete ? routeStatus2.totalSteps : routeStatus2.currentStep
        };
        this.activeRoutes.set(routeId, updatedStatus);
        if (isComplete || error) {
          return updatedStatus;
        }
      } catch (statusError) {
        console.warn(`\u26A0\uFE0F Status check attempt ${attempt} failed:`, statusError);
        if (attempt >= maxAttempts - 5) {
          logger.debug("Status polling timed out, but transaction may still be processing...");
        }
      }
    }
    const routeStatus = this.activeRoutes.get(routeId);
    if (routeStatus) {
      const timeoutStatus = {
        ...routeStatus,
        error: `Bridge status polling timed out after ${maxAttempts * intervalMs / 1e3}s. Transaction may still be processing on the destination chain.`
      };
      this.activeRoutes.set(routeId, timeoutStatus);
      return timeoutStatus;
    }
    throw new Error("Route status polling failed completely");
  }
  async bridge(params, onProgress) {
    const walletClient = this.walletProvider.getWalletClient(params.fromChain);
    const [fromAddress] = await walletClient.getAddresses();
    logger.debug("   Initiating bridge operation...");
    logger.debug(`From: ${params.fromChain} \u2192 To: ${params.toChain}`);
    logger.debug(`Amount: ${params.amount} tokens`);
    const fromChainConfig = this.walletProvider.getChainConfigs(params.fromChain);
    const toChainConfig = this.walletProvider.getChainConfigs(params.toChain);
    const resolvedFromToken = await this.resolveTokenAddress(params.fromToken, fromChainConfig.id);
    const resolvedToToken = await this.resolveTokenAddress(params.toToken, toChainConfig.id);
    logger.debug(`Resolved tokens:`);
    logger.debug(`${params.fromToken} on ${params.fromChain} \u2192 ${resolvedFromToken}`);
    logger.debug(`${params.toToken} on ${params.toChain} \u2192 ${resolvedToToken}`);
    const fromTokenDecimals = await this.getTokenDecimals(resolvedFromToken, params.fromChain);
    logger.debug(`Token decimals: ${fromTokenDecimals} for ${params.fromToken}`);
    const fromAmountParsed = parseUnits(params.amount, fromTokenDecimals);
    logger.debug(`Parsed amount: ${params.amount} \u2192 ${fromAmountParsed.toString()}`);
    const routesResult = await getRoutes({
      fromChainId: fromChainConfig.id,
      toChainId: toChainConfig.id,
      fromTokenAddress: resolvedFromToken,
      toTokenAddress: resolvedToToken,
      fromAmount: fromAmountParsed.toString(),
      // Use correctly parsed amount!
      fromAddress,
      toAddress: params.toAddress || fromAddress,
      options: {
        order: "RECOMMENDED",
        // Use recommended routing for best optimization
        slippage: 5e-3,
        // 0.5% slippage
        maxPriceImpact: 0.4,
        // 40% max price impact
        allowSwitchChain: true
      }
    });
    if (!routesResult.routes.length) {
      throw new Error(
        `No bridge routes found for ${params.fromToken} (${resolvedFromToken}) on ${params.fromChain} to ${params.toToken} (${resolvedToToken}) on ${params.toChain}. Please verify the token exists on both chains or try a different token pair.`
      );
    }
    const selectedRoute = routesResult.routes[0];
    const routeId = `bridge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    logger.debug(`Selected route ${routeId}:`);
    logger.debug(`Gas cost: ${selectedRoute.gasCostUSD || "Unknown"} USD`);
    logger.debug(`Steps: ${selectedRoute.steps.length}`);
    logger.debug(`Tools: ${selectedRoute.steps.map((s) => s.tool).join(" \u2192 ")}`);
    try {
      const executionOptions = this.createExecutionOptions(routeId, void 0);
      const executedRoute = await executeRoute(selectedRoute, executionOptions);
      const sourceSteps = executedRoute.steps.filter(
        (step2) => step2.execution?.process?.some((p) => p.txHash)
      );
      if (!sourceSteps.length) {
        throw new Error("No transaction hashes found in executed route");
      }
      const mainTxHash = sourceSteps[0].execution?.process?.find((p) => p.txHash)?.txHash;
      if (!mainTxHash) {
        throw new Error("No transaction hash found in route execution");
      }
      logger.debug(`Source transaction: ${mainTxHash}`);
      const bridgeTool = selectedRoute.steps[0].tool;
      logger.debug(`Using bridge tool: ${bridgeTool}`);
      const finalStatus = await this.pollBridgeStatus(
        mainTxHash,
        fromChainConfig.id,
        toChainConfig.id,
        bridgeTool,
        routeId
      );
      if (onProgress) {
        onProgress(finalStatus);
      }
      if (finalStatus.error) {
        throw new Error(finalStatus.error);
      }
      if (!finalStatus.isComplete) {
        logger.debug(
          "\u26A0\uFE0F Bridge execution may still be in progress. Check destination chain manually."
        );
      }
      logger.debug("Bridge initiated successfully!");
      logger.debug(`Source transaction: ${mainTxHash}`);
      logger.debug(`Monitor completion on destination chain`);
      return {
        hash: mainTxHash,
        from: fromAddress,
        to: params.toAddress || fromAddress,
        value: fromAmountParsed,
        chainId: toChainConfig.id
      };
    } catch (error) {
      logger.error("Bridge execution failed:", error);
      const status = this.activeRoutes.get(routeId);
      if (status?.error) {
        throw new Error(`Bridge failed: ${status.error}`);
      }
      throw error;
    } finally {
      this.activeRoutes.delete(routeId);
    }
  }
  // Get status of a specific transaction
  async getTransactionStatus(txHash, fromChainId, toChainId, tool) {
    try {
      const status = await getStatus({
        txHash,
        fromChain: fromChainId,
        toChain: toChainId,
        bridge: tool
      });
      return status;
    } catch (error) {
      logger.error("Failed to get transaction status:", error);
      throw error;
    }
  }
  // Resume a failed or interrupted bridge operation
  async resumeBridge(route, onProgress) {
    const routeId = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const executionOptions = this.createExecutionOptions(routeId, onProgress);
    logger.debug("Resuming bridge operation...");
    try {
      const resumedRoute = await resumeRoute(route, executionOptions);
      const finalStatus = this.activeRoutes.get(routeId);
      if (finalStatus?.error) {
        throw new Error(finalStatus.error);
      }
      return resumedRoute;
    } finally {
      this.activeRoutes.delete(routeId);
    }
  }
};
var buildBridgeDetails = async (state, runtime, wp) => {
  const chains = wp.getSupportedChains();
  const balances = await wp.getWalletBalances();
  state.supportedChains = chains.join(" | ");
  state.chainBalances = Object.entries(balances).map(([chain, balance]) => {
    const chainConfig5 = wp.getChainConfigs(chain);
    return `${chain}: ${balance} ${chainConfig5.nativeCurrency.symbol}`;
  }).join(", ");
  const bridgeContext = composePromptFromState({
    state,
    template: bridgeTemplate
  });
  const xmlResponse = await runtime.useModel(ModelType.TEXT_LARGE, {
    prompt: bridgeContext
  });
  const content = parseKeyValueXml(xmlResponse);
  logger.debug("###### XML RESPONSE", xmlResponse);
  const fromChain = content.fromChain;
  const toChain = content.toChain;
  const normalizedFromChain = fromChain?.toLowerCase();
  const normalizedToChain = toChain?.toLowerCase();
  if (!wp.chains[normalizedFromChain]) {
    throw new Error(
      `Source chain ${fromChain} not configured. Available chains: ${chains.join(", ")}`
    );
  }
  if (!wp.chains[normalizedToChain]) {
    throw new Error(
      `Destination chain ${toChain} not configured. Available chains: ${chains.join(", ")}`
    );
  }
  const bridgeOptions = {
    fromChain: normalizedFromChain,
    toChain: normalizedToChain,
    fromToken: content.token,
    toToken: content.token,
    toAddress: content.toAddress,
    amount: content.amount
  };
  logger.debug("###### BRIDGE OPTIONS", bridgeOptions);
  return bridgeOptions;
};
var bridgeAction = {
  name: "EVM_BRIDGE_TOKENS",
  description: "Bridge tokens between different chains with gas optimization and advanced monitoring",
  handler: async (runtime, _message, state, _options, callback) => {
    const walletProvider = await initWalletProvider(runtime);
    const action = new BridgeAction(walletProvider);
    if (!state) {
      state = await runtime.composeState(_message, ["RECENT_MESSAGES"], true);
    }
    try {
      const bridgeOptions = await buildBridgeDetails(state, runtime, walletProvider);
      const bridgeResp = await action.bridge(bridgeOptions, (status) => {
        logger.debug(`Bridge progress: ${status.currentStep}/${status.totalSteps}`);
        if (status.transactionHashes.length > 0) {
          logger.debug(`Recent transactions: ${status.transactionHashes.slice(-2).join(", ")}`);
        }
      });
      const text = `Successfully bridged ${bridgeOptions.amount} tokens from ${bridgeOptions.fromChain} to ${bridgeOptions.toChain}

Transaction Hash: ${bridgeResp.hash}
Gas optimized and monitored throughout the process`;
      await runtime.createMemory(
        {
          entityId: _message.agentId || runtime.agentId,
          roomId: _message.roomId,
          agentId: _message.agentId || runtime.agentId,
          content: {
            text,
            action: ["EVM_BRIDGE_TOKENS"]
          }
        },
        "messages"
      );
      if (callback) {
        callback({
          text,
          content: {
            success: true,
            hash: bridgeResp.hash,
            recipient: bridgeResp.to,
            fromChain: bridgeOptions.fromChain,
            toChain: bridgeOptions.toChain,
            amount: bridgeOptions.amount,
            gasOptimized: true
          }
        });
      }
      return true;
    } catch (error) {
      logger.error(
        "Error in bridge handler:",
        error instanceof Error ? error.message : "Unknown error"
      );
      if (callback) {
        callback({
          text: `Bridge failed: ${error instanceof Error ? error.message : "Unknown error"}

Please check your balance, network connectivity, and try again.`,
          content: {
            error: error instanceof Error ? error.message : "Unknown error",
            success: false
          }
        });
      }
      return false;
    }
  },
  template: bridgeTemplate,
  validate: async (runtime) => {
    const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
    return typeof privateKey === "string" && privateKey.startsWith("0x");
  },
  examples: [
    [
      {
        name: "user",
        user: "user",
        content: {
          text: "Bridge 1 ETH from Ethereum to Base with gas optimization",
          action: "CROSS_CHAIN_TRANSFER"
        }
      }
    ]
  ],
  similes: ["CROSS_CHAIN_TRANSFER", "CHAIN_BRIDGE", "MOVE_CROSS_CHAIN", "BRIDGE_TOKENS"]
};
async function checkBridgeStatus(txHash, fromChainId, toChainId, tool = "stargateV2Bus") {
  try {
    const status = await getStatus({
      txHash,
      fromChain: fromChainId,
      toChain: toChainId,
      bridge: tool
    });
    logger.debug(
      `Bridge Status: ${status.status}${status.substatus ? ` (${status.substatus})` : ""}`
    );
    return {
      status: status.status,
      substatus: status.substatus,
      isComplete: status.status === "DONE",
      isFailed: status.status === "FAILED",
      isPending: status.status === "PENDING",
      error: status.status === "FAILED" ? status.substatus : void 0
    };
  } catch (error) {
    logger.error("Failed to check bridge status:", error);
    throw error;
  }
}

// src/actions/swap.ts
import { ModelType as ModelType2, composePromptFromState as composePromptFromState2, elizaLogger as elizaLogger3, parseKeyValueXml as parseKeyValueXml2 } from "@elizaos/core";
import { getOnChainTools } from "@goat-sdk/core";
import { viem } from "@goat-sdk/wallet-viem";
import { sendETH, erc20, uniswap } from "@goat-sdk/plugin-uniswap";
var CELO_SUPPORTED_CHAINS2 = ["celo", "alfajores"];
var CELO = {
  symbol: "CELO",
  name: "Celo",
  decimals: 18,
  address: "0x471EcE3750Da237f93B8E339c536989b8978a438"
  // CELO token address on Celo
};
var cUSD = {
  symbol: "cUSD",
  name: "Celo Dollar",
  decimals: 18,
  address: "0x765DE816845861e75A25fCA122bb6898B8B1282a"
  // cUSD token address on Celo
};
var SwapAction = class {
  constructor(walletProvider) {
    this.walletProvider = walletProvider;
  }
  async getOnChainTools(chain) {
    const walletClient = this.walletProvider.getWalletClient(chain);
    const tools = await getOnChainTools({
      wallet: viem(walletClient),
      plugins: [
        sendETH(),
        // Enable CELO transfers (native token)
        erc20({ tokens: [cUSD, CELO] }),
        // Enable Celo token operations
        uniswap({
          baseUrl: process.env.UNISWAP_BASE_URL,
          apiKey: process.env.UNISWAP_API_KEY
        })
      ]
    });
    return tools;
  }
  getTokenConfig(tokenSymbolOrAddress) {
    const symbol = tokenSymbolOrAddress.toLowerCase();
    if (tokenSymbolOrAddress.startsWith("0x") && tokenSymbolOrAddress.length === 42) {
      if (tokenSymbolOrAddress.toLowerCase() === CELO.address.toLowerCase()) {
        return CELO;
      }
      if (tokenSymbolOrAddress.toLowerCase() === cUSD.address.toLowerCase()) {
        return cUSD;
      }
      return {
        symbol: "UNKNOWN",
        name: "Unknown Token",
        decimals: 18,
        address: tokenSymbolOrAddress
      };
    }
    if (symbol === "celo") {
      return {
        symbol: "CELO",
        name: "Celo Native",
        decimals: 18,
        address: "0x0000000000000000000000000000000000000000"
        // Native token
      };
    }
    if (symbol === "cusd") {
      return cUSD;
    }
    throw new Error(`Token ${tokenSymbolOrAddress} not supported. Supported tokens: CELO, cUSD`);
  }
  async swap(params) {
    const { chain, fromToken, toToken, amount } = params;
    if (!CELO_SUPPORTED_CHAINS2.includes(chain)) {
      throw new Error("Only Celo mainnet and Alfajores testnet are supported for swaps.");
    }
    const walletClient = this.walletProvider.getWalletClient(chain);
    const [fromAddress] = await walletClient.getAddresses();
    const fromTokenConfig = this.getTokenConfig(fromToken);
    const toTokenConfig = this.getTokenConfig(toToken);
    const tools = await this.getOnChainTools(chain);
    try {
      const swapTool = tools.find(
        (tool) => tool.name === "swap_tokens" || tool.name === "uniswap_swap" || tool.name.includes("swap")
      );
      if (!swapTool) {
        throw new Error("Swap tool not found in available tools");
      }
      const swapParams = {
        tokenIn: fromTokenConfig.address === "0x0000000000000000000000000000000000000000" ? "ETH" : fromTokenConfig.address,
        tokenOut: toTokenConfig.address === "0x0000000000000000000000000000000000000000" ? "ETH" : toTokenConfig.address,
        amountIn: amount,
        recipient: fromAddress,
        slippageTolerancePercentage: 0.5
        // 0.5% slippage tolerance
      };
      elizaLogger3.info("Executing swap with params:", swapParams);
      const result = await swapTool.execute(swapParams);
      if (!result.success) {
        throw new Error(`Swap failed: ${result.error || "Unknown error"}`);
      }
      const txHash = result.transactionHash || result.hash;
      if (!txHash) {
        throw new Error("No transaction hash returned from swap");
      }
      return {
        hash: txHash,
        from: fromAddress,
        to: result.to,
        value: BigInt(result.value || "0"),
        data: result.data,
        chainId: walletClient.chain.id
      };
    } catch (error) {
      elizaLogger3.error("Swap execution failed:", error);
      throw error;
    }
  }
};
var buildSwapDetails = async (state, _message, runtime, wp) => {
  const chains = wp.getSupportedChains();
  const balances = await wp.getWalletBalances();
  state = await runtime.composeState(_message, ["RECENT_MESSAGES"], true);
  state.supportedChains = chains.join(" | ");
  state.chainBalances = Object.entries(balances).map(([chain, balance]) => {
    const chainConfig5 = wp.getChainConfigs(chain);
    return `${chain}: ${balance} ${chainConfig5.nativeCurrency.symbol}`;
  }).join(", ");
  const context = composePromptFromState2({
    state,
    template: swapTemplate
  });
  const xmlResponse = await runtime.useModel(ModelType2.TEXT_LARGE, {
    prompt: context
  });
  const parsedXml = parseKeyValueXml2(xmlResponse);
  if (!parsedXml) {
    throw new Error("Failed to parse XML response from LLM for swap details.");
  }
  let swapDetails = {
    fromToken: parsedXml.inputToken,
    toToken: parsedXml.outputToken,
    amount: parsedXml.amount,
    chain: parsedXml.chain
  };
  if (swapDetails.chain) {
    const normalizedChainName = swapDetails.chain.toLowerCase();
    if (!CELO_SUPPORTED_CHAINS2.includes(normalizedChainName)) {
      throw new Error("Only Celo mainnet and Alfajores testnet are supported for swaps.");
    }
    swapDetails.chain = normalizedChainName;
  }
  return swapDetails;
};
var swapAction = {
  name: "CELO_SWAP_TOKENS",
  description: "Swap tokens on Celo mainnet or Alfajores testnet using Uniswap via Goat SDK",
  handler: async (runtime, _message, state, _options, callback) => {
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
          text: `Successfully swapped ${swapOptions.amount} ${swapOptions.fromToken} for ${swapOptions.toToken} on ${swapOptions.chain}
Transaction Hash: ${swapResp.hash}`,
          content: {
            success: true,
            hash: swapResp.hash,
            chain: swapOptions.chain,
            fromToken: swapOptions.fromToken,
            toToken: swapOptions.toToken,
            amount: swapOptions.amount
          }
        });
      }
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      elizaLogger3.error("Swap action failed:", errorMessage);
      if (callback) {
        callback({
          text: `Swap failed: ${errorMessage}`,
          content: { success: false, error: errorMessage }
        });
      }
      return false;
    }
  },
  template: swapTemplate,
  validate: async (runtime) => {
    const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
    const uniswapApiKey = runtime.getSetting("UNISWAP_API_KEY");
    const uniswapBaseUrl = runtime.getSetting("UNISWAP_BASE_URL");
    return typeof privateKey === "string" && privateKey.startsWith("0x") && typeof uniswapApiKey === "string" && typeof uniswapBaseUrl === "string";
  },
  examples: [
    [
      {
        name: "user",
        user: "user",
        content: {
          text: "Swap 1 cUSD for CELO on Celo",
          action: "TOKEN_SWAP"
        }
      }
    ],
    [
      {
        name: "user",
        user: "user",
        content: {
          text: "Exchange 0.5 CELO for cUSD on Alfajores",
          action: "TOKEN_SWAP"
        }
      }
    ]
  ],
  similes: ["TOKEN_SWAP", "EXCHANGE_TOKENS", "TRADE_TOKENS"]
};

// src/actions/transfer.ts
import {
  ModelType as ModelType3,
  parseKeyValueXml as parseKeyValueXml3,
  composePromptFromState as composePromptFromState3
} from "@elizaos/core";
var CELO_SUPPORTED_CHAINS3 = ["celo", "alfajores"];
var TransferAction = class {
  constructor(walletProvider) {
    this.walletProvider = walletProvider;
  }
  async resolveTokenAddress(tokenSymbolOrAddress, chain) {
    if (tokenSymbolOrAddress.startsWith("0x") && tokenSymbolOrAddress.length === 42) {
      return tokenSymbolOrAddress;
    }
    if (tokenSymbolOrAddress.toLowerCase() === "celo") {
      return "0x0000000000000000000000000000000000000000";
    }
    throw new Error("Token resolution via Goat SDK not implemented.");
  }
  async transfer(params) {
    const { fromChain, toAddress, amount, token } = params;
    if (!CELO_SUPPORTED_CHAINS3.includes(fromChain)) {
      throw new Error("Only Celo mainnet and Alfajores testnet are supported for transfers.");
    }
    const walletClient = this.walletProvider.getWalletClient(fromChain);
    if (!walletClient.account) {
      throw new Error("Wallet account is not available");
    }
    let to;
    let value;
    let data;
    if (token && token !== "null" && token.toLowerCase() !== "celo" && token !== "0x0000000000000000000000000000000000000000") {
      const tokenAddress = await this.resolveTokenAddress(token, fromChain);
      const decimals = 18;
      const amountInTokenUnits = parseUnits(amount, decimals);
      const transferData = encodeFunctionData({
        abi: parseAbi(["function transfer(address to, uint256 amount)"]),
        functionName: "transfer",
        args: [toAddress, amountInTokenUnits]
      });
      to = tokenAddress;
      value = 0n;
      data = transferData;
    } else {
      to = toAddress;
      value = parseEther(amount);
      data = params.data || "0x";
    }
    const hash = await walletClient.sendTransaction({
      account: walletClient.account,
      to,
      value,
      data,
      chain: walletClient.chain
    });
    return {
      hash,
      from: walletClient.account.address,
      to: toAddress,
      value,
      data
    };
  }
};
var buildTransferDetails = async (state, _message, runtime, wp) => {
  const chains = wp.getSupportedChains();
  const balances = await wp.getWalletBalances();
  state.chainBalances = Object.entries(balances).map(([chain, balance]) => {
    const chainConfig5 = wp.getChainConfigs(chain);
    return `${chain}: ${balance} ${chainConfig5.nativeCurrency.symbol}`;
  }).join(", ");
  state = await runtime.composeState(_message, ["RECENT_MESSAGES"], true);
  state.supportedChains = chains.join(" | ");
  const context = composePromptFromState3({
    state,
    template: transferTemplate
  });
  const xmlResponse = await runtime.useModel(ModelType3.TEXT_SMALL, {
    prompt: context
  });
  const parsedXml = parseKeyValueXml3(xmlResponse);
  if (!parsedXml) {
    throw new Error("Failed to parse XML response from LLM for transfer details.");
  }
  const transferDetails = parsedXml;
  const normalizedChainName = transferDetails.fromChain.toLowerCase();
  if (!CELO_SUPPORTED_CHAINS3.includes(normalizedChainName)) {
    throw new Error(
      "The chain " + transferDetails.fromChain + " not configured yet. Only Celo mainnet and Alfajores are supported."
    );
  }
  transferDetails.fromChain = normalizedChainName;
  return transferDetails;
};
var transferAction = {
  name: "CELO_TRANSFER_TOKENS",
  description: "Transfer native CELO or ERC20 tokens (cUSD, etc.) between addresses on Celo mainnet or Alfajores",
  handler: async (runtime, message, state, _options, callback) => {
    if (!state) {
      state = await runtime.composeState(message);
    }
    const walletProvider = await initWalletProvider(runtime);
    const action = new TransferAction(walletProvider);
    const paramOptions = await buildTransferDetails(state, message, runtime, walletProvider);
    try {
      const transferResp = await action.transfer(paramOptions);
      const tokenSymbol = paramOptions.token ? paramOptions.token.toUpperCase() : "CELO";
      if (callback) {
        callback({
          text: `Successfully transferred ${paramOptions.amount} ${tokenSymbol} to ${paramOptions.toAddress}
Transaction Hash: ${transferResp.hash}`,
          content: {
            success: true,
            hash: transferResp.hash,
            amount: paramOptions.amount,
            token: tokenSymbol,
            recipient: transferResp.to,
            chain: paramOptions.fromChain
          }
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (callback) {
        callback({
          text: `Error transferring tokens: ${errorMessage}`,
          content: { error: errorMessage }
        });
      }
    }
    return;
  },
  validate: async (runtime) => {
    const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
    return typeof privateKey === "string" && privateKey.startsWith("0x");
  },
  examples: [
    [
      {
        name: "assistant",
        content: {
          text: "I'll help you transfer 1 CELO to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          action: "CELO_TRANSFER_TOKENS"
        }
      },
      {
        name: "user",
        content: {
          text: "Transfer 1 CELO to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          action: "CELO_TRANSFER_TOKENS"
        }
      }
    ]
  ],
  similes: ["CELO_TRANSFER", "CELO_SEND_TOKENS", "CELO_TOKEN_TRANSFER", "CELO_MOVE_TOKENS"]
};

// src/providers/get-balance.ts
import {
  ModelType as ModelType4,
  parseKeyValueXml as parseKeyValueXml4
} from "@elizaos/core";
var CELO_SUPPORTED_CHAINS4 = ["celo", "alfajores"];
var tokenBalanceTemplate = `Extract the token ticker and blockchain from the user's message.

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
var tokenBalanceProvider = {
  name: "CELO_TOKEN_BALANCE",
  description: "Token balance for CELO and ERC20 tokens (cUSD, etc.) on Celo mainnet or Alfajores",
  dynamic: true,
  get: async (runtime, message) => {
    try {
      const prompt = tokenBalanceTemplate.replace("{{userMessage}}", message.content.text || "");
      const response = await runtime.useModel(ModelType4.TEXT_SMALL, {
        prompt,
        maxTokens: 100
      });
      const parsed = parseKeyValueXml4(response);
      if (!parsed || parsed.error || !parsed.token || !parsed.chain) {
        return { text: "", data: {}, values: {} };
      }
      const token = parsed.token.toUpperCase();
      const chain = parsed.chain.toLowerCase();
      if (!CELO_SUPPORTED_CHAINS4.includes(chain)) {
        return { text: "Only Celo mainnet and Alfajores are supported.", data: {}, values: {} };
      }
      const walletProvider = await initWalletProvider(runtime);
      const chainConfig5 = walletProvider.getChainConfigs(chain);
      const address = walletProvider.getAddress();
      let decimals = 18;
      let tokenAddress = "0x0000000000000000000000000000000000000000";
      if (token !== "CELO") {
        return { text: "ERC20 token balance via Goat SDK not implemented.", data: {}, values: {} };
      }
      const publicClient = walletProvider.getPublicClient(chain);
      let balance;
      if (token === "CELO") {
        balance = await publicClient.getBalance({ address });
      } else {
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
          hasBalance: parseFloat(formattedBalance) > 0
        },
        values: {
          token,
          chain,
          balance: formattedBalance,
          hasBalance: (parseFloat(formattedBalance) > 0).toString()
        }
      };
    } catch (error) {
      return { text: "", data: {}, values: {} };
    }
  }
};

// src/service.ts
import { Service, logger as logger2 } from "@elizaos/core";
var EVMService = class _EVMService extends Service {
  constructor(runtime) {
    super();
    this.runtime = runtime;
  }
  static serviceType = EVM_SERVICE_NAME;
  capabilityDescription = "EVM blockchain wallet access";
  walletProvider = null;
  refreshInterval = null;
  lastRefreshTimestamp = 0;
  static async start(runtime) {
    logger2.log("Initializing EVMService");
    const evmService = new _EVMService(runtime);
    evmService.walletProvider = await initWalletProvider(runtime);
    await evmService.refreshWalletData();
    if (evmService.refreshInterval) {
      clearInterval(evmService.refreshInterval);
    }
    evmService.refreshInterval = setInterval(
      () => evmService.refreshWalletData(),
      CACHE_REFRESH_INTERVAL_MS
    );
    logger2.log("EVM service initialized");
    return evmService;
  }
  static async stop(runtime) {
    const service = runtime.getService(EVM_SERVICE_NAME);
    if (!service) {
      logger2.error("EVMService not found");
      return;
    }
    await service.stop();
  }
  async stop() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    logger2.log("EVM service shutdown");
  }
  async refreshWalletData() {
    try {
      if (!this.walletProvider) {
        this.walletProvider = await initWalletProvider(this.runtime);
      }
      const address = this.walletProvider.getAddress();
      const balances = await this.walletProvider.getWalletBalances();
      const chainDetails = Object.entries(balances).map(([chainName, balance]) => {
        try {
          const chain = this.walletProvider.getChainConfigs(chainName);
          return {
            chainName,
            balance,
            symbol: chain.nativeCurrency.symbol,
            chainId: chain.id,
            name: chain.name
          };
        } catch (error) {
          logger2.error(`Error formatting chain ${chainName}:`, error);
          return null;
        }
      }).filter(Boolean);
      const walletData = {
        address,
        chains: chainDetails,
        timestamp: Date.now()
      };
      await this.runtime.setCache(EVM_WALLET_DATA_CACHE_KEY, walletData);
      this.lastRefreshTimestamp = walletData.timestamp;
      logger2.log(
        "EVM wallet data refreshed for chains:",
        chainDetails.map((c) => c?.chainName).join(", ")
      );
    } catch (error) {
      logger2.error("Error refreshing EVM wallet data:", error);
    }
  }
  async getCachedData() {
    try {
      const cachedData = await this.runtime.getCache(EVM_WALLET_DATA_CACHE_KEY);
      const now = Date.now();
      if (!cachedData || now - cachedData.timestamp > CACHE_REFRESH_INTERVAL_MS) {
        logger2.log("EVM wallet data is stale, refreshing...");
        await this.refreshWalletData();
        const refreshedData = await this.runtime.getCache(EVM_WALLET_DATA_CACHE_KEY);
        return refreshedData || void 0;
      }
      return cachedData;
    } catch (error) {
      logger2.error("Error getting cached EVM wallet data:", error);
      return void 0;
    }
  }
  async forceUpdate() {
    await this.refreshWalletData();
    return this.getCachedData();
  }
};

// src/types/index.ts
var _SupportedChainList = Object.keys(chains_exports);
var VoteType = /* @__PURE__ */ ((VoteType2) => {
  VoteType2[VoteType2["AGAINST"] = 0] = "AGAINST";
  VoteType2[VoteType2["FOR"] = 1] = "FOR";
  VoteType2[VoteType2["ABSTAIN"] = 2] = "ABSTAIN";
  return VoteType2;
})(VoteType || {});

// src/index.ts
var evmPlugin = {
  name: "evm",
  description: "EVM blockchain integration plugin",
  providers: [evmWalletProvider, tokenBalanceProvider],
  evaluators: [],
  services: [EVMService],
  actions: [transferAction, bridgeAction, swapAction]
};
var index_default = evmPlugin;
export {
  BridgeAction,
  EVMService,
  SwapAction,
  TransferAction,
  VoteType,
  WalletProvider,
  bridgeAction,
  bridgeTemplate,
  checkBridgeStatus,
  index_default as default,
  evmPlugin,
  evmWalletProvider,
  initWalletProvider,
  swapAction,
  swapTemplate,
  tokenBalanceProvider,
  transferAction
};
//# sourceMappingURL=index.js.map