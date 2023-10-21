import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Fighter", "RPS-F",
            "https://ipfs.io/ipfs/QmVkDYADzBKBisifuUVmKHJ8VPw7ABrRkwHemAbSB8gAd7"
        ]
    );

    console.log("Address: ", token)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
