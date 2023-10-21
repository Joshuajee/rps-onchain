import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Warload", "RSP-WAR", 
            "https://ipfs.io/ipfs/QmY4xWzR152kSFjWb5vKXZt8nAbCBWKK9XsnyfwhXtMH4A"
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
