import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Baron", "RPS-B", 
            "https://ipfs.io/ipfs/QmUwfyYdaxPevNZMZJYXnRubumhuYMX1d9dxMkJeTHJR9n"
        ]
    );

    console.log("Address: ", await token.getAddress())
    
    const RPSAchievementManager = await ethers.getContractAt("RPSAchievementManager", "0x29E8814e5A9a0bA2d33b2F1e0810D4C5F84ec300");
    
    await RPSAchievementManager.setToken6(
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
