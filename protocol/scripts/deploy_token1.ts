import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Battle Ready", 
            "RPS-BR", "https://ipfs.io/ipfs/QmX72Asu4A9Wq8of7taEF6cXT1zqrQzkQmw4Z31BkSY8uY"
        ]
    );

    console.log("Address: ", token.getAddress())


    const RPSAchievementManager = await ethers.getContractAt("RPSAchievementManager", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

    await RPSAchievementManager.setToken1(
        token
    );
  

    



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
