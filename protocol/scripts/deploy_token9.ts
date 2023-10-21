import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS King", "RPS-K", 
            "https://ipfs.io/ipfs/QmWivXBoVGncymAh1wfD6bExXgiWhiTyyBb87BnzVaBBHG"
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
