import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Battle Ready", 
            "RPS-BR", "https://ipfs.io/ipfs/QmX72Asu4A9Wq8of7taEF6cXT1zqrQzkQmw4Z31BkSY8uY"
        ]
    );

    console.log("Address: ", await token.getAddress())


    const RPSAchievementManager = await ethers.getContractAt("RPSAchievementManager", "0x46b142DD1E924FAb83eCc3c08e4D46E82f005e0E");

    await RPSAchievementManager.setToken1(
        token
    );

    await token.initialize(await RPSAchievementManager.getAddress())
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
