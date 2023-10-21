import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Battle Ready", 
            "RPS-BR",
            "RPS-BR", "https://ipfs.io/ipfs/QmX72Asu4A9Wq8of7taEF6cXT1zqrQzkQmw4Z31BkSY8uY"
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
