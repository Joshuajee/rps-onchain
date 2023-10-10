import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  
  
  describe("RPSGameFactory", function () {
  
    const password = "Hello"
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {
        // Contracts are deployed using the first signer/account by default
        const [playerA, playerB] = await ethers.getSigners();
    
        const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
        const rpsGameFactory = await RPSGameFactory.deploy();
    
        return { rpsGameFactory, playerA, playerB };
    }
  
    describe("Deployment", function () {
  
        it("Should be mapped correctly", async function () {
            const { rpsGameFactory, playerA, playerB } = await loadFixture(deploy);
            
            await rpsGameFactory.createGame(playerA.address, playerB.address)
            
        });
  
    });
  
  
    
});
  