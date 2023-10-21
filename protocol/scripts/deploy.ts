import { ethers } from "hardhat";

async function main() {

  const RPSPointToken = await ethers.deployContract("RPSPointToken");

  const rpsPointTokenAddr = await RPSPointToken.getAddress();

  console.log("RPSPointToken: ", rpsPointTokenAddr)

  const RPSAchievementManager = await ethers.deployContract("RPSAchievementManager");

  const rpsAchievementManagerAddr = await RPSAchievementManager.getAddress();

  console.log("RPSAchievementManager: ", rpsAchievementManagerAddr )

  const RPSGameFactory = await ethers.deployContract("RPSGameFactory", [rpsPointTokenAddr, rpsAchievementManagerAddr]);

  const RPSGameDeployer = await ethers.deployContract("RPSGameDeployer");

  const rpsGameFactoryAddr = await RPSGameFactory.getAddress();

  const rpsGameDeployerAddr = await RPSGameDeployer.getAddress();

  const rpsGameFactory = await ethers.getContractAt("RPSGameFactory", rpsGameFactoryAddr);

  const rpsGameDeployer = await ethers.getContractAt("RPSGameDeployer", rpsGameDeployerAddr);

  // initialize
  await RPSPointToken.initialize(await rpsGameFactory.getAddress())
  await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
  await RPSAchievementManager.initialize(await rpsGameFactory.getAddress())

  await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())

  console.log("RPSGameDeployer : ", rpsGameDeployerAddr)

  console.log("RPSGameFactory : ", rpsGameFactoryAddr)

}




async function deployNFTs() {

  



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
