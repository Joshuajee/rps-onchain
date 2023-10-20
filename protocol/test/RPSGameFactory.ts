import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  
  
  describe("RPSGameFactory", function () {
  
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {
        // Contracts are deployed using the first signer/account by default
        const [playerA, playerB] = await ethers.getSigners();

        const gameInfo: any = [
            false,
            [0, playerA.address, 10],
            [0, playerA.address, 10]
          ]
    
        const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
        const rpsGameFactory = await RPSGameFactory.deploy();

        const RPSGameDeployer = await ethers.getContractFactory("RPSGameDeployer");
        const rpsGameDeployer = await RPSGameDeployer.deploy();

        await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())

        await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())
    
        return { rpsGameFactory, playerA, playerB, gameInfo };
    }
  
    describe("Deployment", function () {
  
        it("Should be mapped correctly", async function () {

            const { rpsGameFactory, playerA, playerB, gameInfo } = await loadFixture(deploy);

            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo)
            
        });
  
    });


    describe("Game Creation", function () {
  
        it("PlayerA Games should be updated", async function () {
            
            const { rpsGameFactory, playerA, playerB, gameInfo } = await loadFixture(deploy);
            
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo)

            expect(await rpsGameFactory.getUserGamesLength(playerA.address)).to.be.equal(1)
            
        });

        it("PlayerB Games should not be updated when they register", async function () {
            
            const { rpsGameFactory, playerA, playerB, gameInfo } = await loadFixture(deploy);
            
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo)
            
            expect(await rpsGameFactory.getUserGamesLength(playerB.address)).to.be.equal(0)
            
        });

          
        it("PlayerB Games should be updated when they register", async function () {
            
            const { rpsGameFactory, playerA, playerB, gameInfo } = await loadFixture(deploy);
            
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo)

            const rpsGameAddress = await rpsGameFactory.getUserGame(playerA.address, 0);

            await rpsGameFactory.connect(playerB).joinGame(rpsGameAddress)
            
            expect(await rpsGameFactory.getUserGamesLength(playerA.address)).to.be.equal(1)
            
        });
  
    });
  
  
});
  