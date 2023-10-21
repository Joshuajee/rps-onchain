import { ethers } from "hardhat";

async function main() {

  const RPSGameDeployer = await ethers.deployContract("RPSGameDeployer");

  const rpsGameDeployerAddr = await RPSGameDeployer.getAddress();

  await ethers.deployContract("RPSGameDeployer");

  await ethers.deployContract("RPSGameDeployer");

  await ethers.deployContract("RPSGameDeployer");

console.log(rpsGameDeployerAddr)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
