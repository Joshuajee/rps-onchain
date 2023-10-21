import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { RPSGameFactory } from "../typechain-types";
import { Signature } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const provider = ethers.provider
  
  
describe("RPSGame Testing Claim", function () {
  
    const password = "password"
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    async function deploy() {

        const [playerA, playerB] = await ethers.getSigners();

        const RPSPointToken = await ethers.deployContract("RPSPointToken");
        const rpsPointTokenAddr = await RPSPointToken.getAddress();
    
        const RPSAchievementManager = await ethers.deployContract("RPSAchievementManager");
        const rpsAchievementManagerAddr = await RPSAchievementManager.getAddress();
    
        const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
        const rpsGameFactory = await RPSGameFactory.deploy(rpsPointTokenAddr, rpsAchievementManagerAddr);


        const RPSGameDeployer = await ethers.getContractFactory("RPSGameDeployer");
        const rpsGameDeployer = await RPSGameDeployer.deploy();
    
        // initialize
        await RPSPointToken.initialize(await rpsGameFactory.getAddress())
        await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
        await RPSAchievementManager.initialize(await rpsGameFactory.getAddress())
    
        await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())  

        const pointTokenAddress = await rpsGameFactory.pointTokenAddress()

        const rpsPointToken = await ethers.getContractAt("RPSPointToken", pointTokenAddress)

        return {playerA, playerB, rpsGameFactory, rpsPointToken, pointTokenAddress}

    }



    async function playGame(winner: HardhatEthersSigner, loser: HardhatEthersSigner, rpsGameFactory: RPSGameFactory, gameInfo: any) {

        await rpsGameFactory.createGame(winner.address, loser.address, gameInfo, {
            value: 0
        })

        const usergames = await rpsGameFactory.getUserGamesLength(winner.address);
    
        const rpsGameAddress = await rpsGameFactory.getUserGame(winner.address, usergames - BigInt(1));

        const rpsGame = await ethers.getContractAt("RPSGame", rpsGameAddress)

        await rpsGameFactory.connect(loser).joinGame(rpsGameAddress, { value: 0 })

        const _move = BigInt(2)

        const move = await rpsGame.encryptMove(_move, password)

        const _move1 = BigInt(1)

        const move1 = await rpsGame.encryptMove(_move1, password)

        await rpsGame.connect(winner).play(move)

        await rpsGame.connect(loser).play(move1)
  
        await rpsGame.connect(winner).reveal(_move, password)
  
        await rpsGame.connect(loser).reveal(_move1, password)

        await rpsGame.connect(winner).play(move)

        await rpsGame.connect(loser).play(move1)
  
        await rpsGame.connect(winner).reveal(_move, password)
  
        await rpsGame.connect(loser).reveal(_move1, password)

        return rpsGameAddress
    }
  
    describe("Deployment Stake ETH", function () {
  
        it("Player B should win be able to claim winnings", async function () {
            
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
        

            // initialize
            await RPSPointToken.initialize(await rpsGameFactory.getAddress())
            await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
            await RPSAchievementManager.initialize(await rpsGameFactory.getAddress())
        
            await rpsGameFactory.setDeployerAddress(await rpsGameDeployer.getAddress())        
        
            await rpsGameFactory.createGame(playerA.address, playerB.address, gameInfo, {
                value: value
            })
        
            const rpsGameAddress = await rpsGameFactory.getUserGame(playerA.address, 0);

            const rpsGame = await ethers.getContractAt("RPSGame", rpsGameAddress)

            await rpsGameFactory.connect(playerB).joinGame(rpsGameAddress, { value: value })

            const _move = BigInt(1)

            const move = await rpsGame.encryptMove(_move, password)

            const _move1 = BigInt(2)

            const move1 = await rpsGame.encryptMove(_move1, password)

            await rpsGame.connect(playerA).play(move)

            await rpsGame.connect(playerB).play(move1)
      
            await rpsGame.connect(playerA).reveal(_move, password)
      
            await rpsGame.connect(playerB).reveal(_move1, password)

            await rpsGame.connect(playerA).play(move)

            await rpsGame.connect(playerB).play(move1)
      
            await rpsGame.connect(playerA).reveal(_move, password)
      
            await rpsGame.connect(playerB).reveal(_move1, password)

            console.log(await provider.getBalance(playerA))

            console.log(await provider.getBalance(rpsGameAddress))

            console.log(await rpsGame.getGameResult())

            await rpsGameFactory.connect(playerB).claimPrize(rpsGameAddress)

            console.log(await provider.getBalance(rpsGameAddress))

            console.log(await provider.getBalance(playerB))

            console.log(await rpsGameFactory.gamerProfile(playerA.address))

            const achievementManagerAddr = await rpsGameFactory.achievementManagerAddress()

            const manager = await ethers.getContractAt("RPSAchievementManager", achievementManagerAddr)

            const token1Addr = await manager.token1()

            const nft1 = await ethers.getContractAt("RPSNFTToken", token1Addr)

            console.log(token1Addr)
            
            console.log(achievementManagerAddr)

            console.log(await nft1.balanceOf(playerB.address))

            console.log(await rpsGameFactory.getUserGames(playerA.address, 0))

            //expect(await provider.getBalance(playerA)).to.increase(value + value)

        });

    });




    describe("Unstaked Claim", function () {
  
        it("User should lose some tokens when they lose to someone lower", async function () {

            const { playerA, playerB, rpsGameFactory, pointTokenAddress, rpsPointToken } = await loadFixture(deploy);

            const gameInfo: any = [
                false,
                [0, playerA.address, 0],
                [0, playerA.address, 0]
            ]

            const game1Addr = await playGame(playerA, playerB, rpsGameFactory, gameInfo)

            await rpsGameFactory.claimPrize(game1Addr)

            const game2Addr = await playGame(playerA, playerB,rpsGameFactory, gameInfo)

            await rpsGameFactory.claimPrize(game2Addr)

            const game3Addr = await playGame(playerA, playerB,rpsGameFactory, gameInfo)

            await rpsGameFactory.claimPrize(game3Addr)

            console.log(await rpsPointToken.balanceOf(playerA.address))

            const game4Addr = await playGame(playerB, playerA,rpsGameFactory, gameInfo)

            await rpsGameFactory.connect(playerB).claimPrize(game4Addr)

            console.log(await rpsPointToken.balanceOf(playerA.address))

            console.log(await rpsPointToken.balanceOf(playerB.address))





    
                

        });

    });
  
  
});
  