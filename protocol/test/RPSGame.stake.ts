import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const provider = ethers.provider
  
  
describe("RPSGame Staked", function () {
  
    const password = "password"
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
  
    describe("Deployment Stake ETH", function () {
  
        it("Should set the right data and ETH balance, when both users deposit same ETH amount", async function () {
            
            const [playerA, playerB] = await ethers.getSigners();

            const value = 10 ** 10
    
            const gameInfo: any = [
                true,
                [1, playerA.address, value],
                [1, playerA.address, value]
            ]

            const RPSPointToken = await ethers.deployContract("RPSPointToken");
            const rpsPointTokenAddr = await RPSPointToken.getAddress();
        
            const RPSAchievementManager = await ethers.deployContract("RPSAchievementManager");
            const rpsAchievementManagerAddr = await RPSAchievementManager.getAddress();
        
            const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
            const rpsGameFactory = await RPSGameFactory.deploy(rpsPointTokenAddr, rpsAchievementManagerAddr);
    
            const RPSGameDeployer = await ethers.getContractFactory("RPSGameDeployer");
            const rpsGameDeployer = await RPSGameDeployer.deploy();
        
            await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
        
            await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())        
        
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo, {
                value: value
            })
        
            const rpsGameAddress = await rpsGameFactory.getUserGame(playerA.address, 0);

            // check if balance has increased
            expect(await provider.getBalance(rpsGameAddress)).to.be.equal(BigInt(value))
        
            await rpsGameFactory.connect(playerB).joinGame(rpsGameAddress, { value: value})
        
            expect(await provider.getBalance(rpsGameAddress)).to.be.equal(BigInt(value * 2))
        
        });

        it("Should set the right data and ETH balance, when both users deposit different ETH amount", async function () {
            
            const [playerA, playerB] = await ethers.getSigners();

            const value1 = 10 ** 10

            const value2 = 20 ** 10
    
            const gameInfo: any = [
                true,
                [1, playerA.address, value1],
                [1, playerA.address, value2]
            ]

            const RPSPointToken = await ethers.deployContract("RPSPointToken");
            const rpsPointTokenAddr = await RPSPointToken.getAddress();
        
            const RPSAchievementManager = await ethers.deployContract("RPSAchievementManager");
            const rpsAchievementManagerAddr = await RPSAchievementManager.getAddress();
        
            const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
            const rpsGameFactory = await RPSGameFactory.deploy(rpsPointTokenAddr, rpsAchievementManagerAddr);
    

            const RPSGameDeployer = await ethers.getContractFactory("RPSGameDeployer");
            const rpsGameDeployer = await RPSGameDeployer.deploy();
        
            await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
        
            await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())
        
        
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo, {
                value: value1
            })
        
            const rpsGameAddress = await rpsGameFactory.getUserGame(playerA.address, 0);

            // check if balance has increased
            expect(await provider.getBalance(rpsGameAddress)).to.be.equal(BigInt(value1))
        
            await rpsGameFactory.connect(playerB).joinGame(rpsGameAddress, { value: value2})
        
            expect(await provider.getBalance(rpsGameAddress)).to.be.equal(BigInt(value1 + value2))
        
        });
        
    });
  

  
  
});
  