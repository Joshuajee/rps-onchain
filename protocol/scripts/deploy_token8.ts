import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS General", "RPS-GEN", 
            "https://ipfs.io/ipfs/QmTUhdkh7Bit1aimCN8ZpRcmf9312Anjq6sYEzwzNEs2qp"
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
