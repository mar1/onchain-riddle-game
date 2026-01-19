"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState, useEffect } from "react";
import { decodeEventLog } from "viem";
import { ONCHAIN_RIDDLE_ABI, ONCHAIN_RIDDLE_ADDRESS } from "./abi/OnchainRiddle";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [lastResult, setLastResult] = useState<{ correct: boolean } | null>(null);
  const { isConnected } = useAccount();

  // Read the current riddle
  const { data: riddle, isLoading: riddleLoading } = useReadContract({
    address: ONCHAIN_RIDDLE_ADDRESS,
    abi: ONCHAIN_RIDDLE_ABI,
    functionName: "riddle",
  });

  // Read if riddle is active
  const { data: isActive } = useReadContract({
    address: ONCHAIN_RIDDLE_ADDRESS,
    abi: ONCHAIN_RIDDLE_ABI,
    functionName: "isActive",
  });

  // Submit answer transaction
  const { writeContract, data: txHash, isPending } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Parse the AnswerAttempt event to check if answer was correct
  useEffect(() => {
    if (receipt?.logs) {
      for (const log of receipt.logs) {
        try {
          const event = decodeEventLog({
            abi: ONCHAIN_RIDDLE_ABI,
            data: log.data,
            topics: log.topics,
          });
          if (event.eventName === "AnswerAttempt") {
            setLastResult({ correct: (event.args as { correct: boolean }).correct });
          }
        } catch {
          // Not our event, skip
        }
      }
    }
  }, [receipt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLastResult(null); // Reset previous result
    writeContract({
      address: ONCHAIN_RIDDLE_ADDRESS,
      abi: ONCHAIN_RIDDLE_ABI,
      functionName: "submitAnswer",
      args: [answer],
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Onchain Riddle Game</h1>
          <ConnectButton />
        </div>

        {/* Riddle Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700">
            {/* Status Badge */}
            <div className="mb-6">
              {isActive ? (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  Active Riddle
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                  No Active Riddle
                </span>
              )}
            </div>

            {/* Riddle */}
            <div className="mb-8">
              <h2 className="text-lg text-gray-400 mb-2">Current Riddle:</h2>
              {riddleLoading ? (
                <p className="text-xl">Loading...</p>
              ) : (
                <p className="text-2xl font-medium">{riddle || "No riddle set"}</p>
              )}
            </div>

            {/* Answer Form */}
            {isActive && (
              isConnected ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="answer" className="block text-gray-400 mb-2">
                      Your Answer:
                    </label>
                    <input
                      id="answer"
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      disabled={isPending || isConfirming}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPending || isConfirming || !answer.trim()}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                  >
                    {isPending
                      ? "Confirm in wallet..."
                      : isConfirming
                      ? "Submitting..."
                      : "Submit Answer"}
                  </button>
                </form>
              ) : (
                <p className="text-gray-400 text-center">Connect your wallet to submit an answer</p>
              )
            )}

            {/* Result Message */}
            {isSuccess && lastResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                lastResult.correct
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}>
                {lastResult.correct ? (
                  <p className="text-green-400 text-lg font-medium">
                    Correct! You solved the riddle!
                  </p>
                ) : (
                  <p className="text-red-400">
                    Wrong answer. Try again!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Contract Info */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              Contract:{" "}
              <a
                href={`https://sepolia.etherscan.io/address/${ONCHAIN_RIDDLE_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-mono"
              >
                {ONCHAIN_RIDDLE_ADDRESS}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
