import { network } from "hardhat";
import { keccak256, toHex } from "viem";

const { viem, networkName } = await network.connect();

async function main() {
  const firstRiddle = "I add flavor to your dishes and keep your hash safe. What am I?";
  const firstAnswer = "salt";
  const answerHash = keccak256(toHex(firstAnswer));

  console.log("Deploying OnchainRiddle to", networkName);

  // Get viem clients
  const publicClient = await viem.getPublicClient();

  // Deploy contract
  console.log("Deploying contract...");
  const contract = await viem.deployContract("OnchainRiddle");

  console.log("Contract deployed to:", contract.address);
  console.log("Etherscan:", `https://sepolia.etherscan.io/address/${contract.address}`);

  // Set the first riddle
  console.log("Setting first riddle...");
  const txHash = await contract.write.setRiddle([firstRiddle, answerHash]);
  await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Riddle set!");

  console.log("Deployment successful!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});