export const ONCHAIN_RIDDLE_ADDRESS = "0x75671200b4363a995060b56beac4b25098449d2e" as const;

export const ONCHAIN_RIDDLE_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "correct", type: "bool" },
    ],
    name: "AnswerAttempt",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "riddle", type: "string" }],
    name: "RiddleSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "user", type: "address" }],
    name: "Winner",
    type: "event",
  },
  {
    inputs: [],
    name: "bot",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "riddle",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_riddle", type: "string" },
      { name: "_answerHash", type: "bytes32" },
    ],
    name: "setRiddle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_answer", type: "string" }],
    name: "submitAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
