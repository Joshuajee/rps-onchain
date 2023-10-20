import { ethers } from "hardhat";

async function main() {

  const RPSGameFactory = await ethers.deployContract("RPSGameFactory");

  const RPSGameDeployer = await ethers.deployContract("RPSGameDeployer");

  const rpsGameFactoryAddr = await RPSGameFactory.getAddress();

  const rpsGameDeployerAddr = await RPSGameDeployer.getAddress();

  const rpsGameFactory = await ethers.getContractAt("RPSGameFactory", rpsGameFactoryAddr);

  const rpsGameDeployer = await ethers.getContractAt("RPSGameDeployer", rpsGameDeployerAddr);

  await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())

  await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())

  console.log( await RPSGameFactory.getAddress())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
