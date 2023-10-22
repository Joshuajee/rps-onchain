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


    const RPSAchievementManager = await ethers.getContractAt("RPSAchievementManager", "0xc80cA248B2e74f25e70A801FD0999635e2bb6633");

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
