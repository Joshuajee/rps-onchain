import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Baron", "RPS-B", 
            "https://ipfs.io/ipfs/QmUwfyYdaxPevNZMZJYXnRubumhuYMX1d9dxMkJeTHJR9n"
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
