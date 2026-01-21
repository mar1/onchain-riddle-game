import "dotenv/config";
import { createPublicClient, createWalletClient, http, keccak256, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const CONTRACT_ADDRESS = "0x75671200b4363a995060b56beac4b25098449d2e";

const ABI = [
  {
    name: "Winner",
    type: "event",
    inputs: [{ indexed: true, name: "user", type: "address" }],
  },
  {
    name: "setRiddle",
    type: "function",
    inputs: [
      { name: "_riddle", type: "string" },
      { name: "_answerHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

const RIDDLES = [
  { question: "I turn your password into a fixed-length string, but you can never turn me back. What am I?", answer: "hash" },
  { question: "I'm the process of finding a valid block, using lots of computing power. What am I?", answer: "mining" },
  { question: "I let you prove you own something without revealing your private key. What am I?", answer: "signature" },
  { question: "I'm Ethereum's shift from mining to staking. What am I called?", answer: "merge" },
  { question: "I'm a 12 or 24 word backup for your wallet. What am I?", answer: "seed" },
  { question: "I'm the smallest unit of ETH, named after a computer scientist. What am I?", answer: "wei" },
];

let currentRiddleIndex = 0;

async function main() {
  if (!process.env.BOT_PRIVATE_KEY) {
    console.error("Missing BOT_PRIVATE_KEY environment variable");
    process.exit(1);
  }

  const account = privateKeyToAccount(process.env.BOT_PRIVATE_KEY);

  const rpcUrl = process.env.SEPOLIA_RPC_URL || "https://1rpc.io/sepolia";

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(rpcUrl),
  });

  console.log("Bot started, watching for Winner events...");
  console.log("Bot address:", account.address);

  publicClient.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    eventName: "Winner",
    onLogs: async (logs) => {
      for (const log of logs) {
        console.log(`Winner detected: ${log.args.user}`);
        await publishNewRiddle(walletClient);
      }
    },
  });
}

async function publishNewRiddle(walletClient) {
  const riddle = RIDDLES[currentRiddleIndex % RIDDLES.length];
  currentRiddleIndex++;

  const answerHash = keccak256(toHex(riddle.answer));

  console.log(`Publishing new riddle: "${riddle.question}"`);

  try {
    const hash = await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "setRiddle",
      args: [riddle.question, answerHash],
    });

    console.log(`Transaction sent: ${hash}`);
  } catch (error) {
    console.error("Failed to publish riddle:", error.message);
  }
}

main();
