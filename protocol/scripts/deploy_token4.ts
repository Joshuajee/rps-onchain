import { ethers } from "hardhat";

async function main() {

    const token = await ethers.deployContract(
        "RPSNFTToken", 
        [
            "RPS Warrior", "RPS-W",
            "https://ipfs.io/ipfs/QmX29pXHK5ZpBu1EH8RetzyjbzdxMeBhYdaUu6kqAb95RF"
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
