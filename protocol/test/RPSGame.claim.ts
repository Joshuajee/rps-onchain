import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const provider = ethers.provider
  
  
describe("RPSGame Testing Claim", function () {
  
    const password = "password"
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
  
    describe("Deployment Stake ETH", function () {
  
        it("Player B should win be able to claim winnings", async function () {
            
            const [playerA, playerB] = await ethers.getSigners();

            const value = 10 ** 10
    
            const gameInfo: any = [
                true,
                [1, playerA.address, value],
                [1, playerA.address, value]
            ]

            const RPSGameFactory = await ethers.getContractFactory("RPSGameFactory");
            const rpsGameFactory = await RPSGameFactory.deploy();

            const RPSGameDeployer = await ethers.getContractFactory("RPSGameDeployer");
            const rpsGameDeployer = await RPSGameDeployer.deploy();
        
            await rpsGameDeployer.initialize(await rpsGameFactory.getAddress())
        
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

            //expect(await provider.getBalance(playerA)).to.increase(value + value)

        });


    });
  
  
});
  