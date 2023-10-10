import { ethers } from "hardhat";

async function main() {

  const RPSGameFactory = await ethers.deployContract("RPSGameFactory");

  console.log( await RPSGameFactory.getAddress())


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
