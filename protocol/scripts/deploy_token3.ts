import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Soldier", "RPS-S", 
            "https://ipfs.io/ipfs/QmVKwpgwSSNjj7TjVH2jAbFXhTJzcQBKmVBfDZzLBnz46g"
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
