import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";



describe("RPSGame", function () {

  const password = "Hello"
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNoStake() {
    // Contracts are deployed using the first signer/account by default
    const [playerA, playerB] = await ethers.getSigners();

    //const gameType = //Enum("NoStake", "Stake");

    const RPSGame = await ethers.getContractFactory("RPSGame");
    const rpsGame = await RPSGame.deploy(playerA.address, playerB.address);

    return { rpsGame, playerA, playerB };
  }

  describe("Deployment No Stake", function () {

    it("Should set the right players", async function () {
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      expect(await rpsGame.playerA()).to.equal(playerA.address);
      expect(await rpsGame.playerB()).to.equal(playerB.address);
    });

  });


  describe("Game Play", function () {


    it("Should Revert If Move is None", async function () {
      const { rpsGame } = await loadFixture(deployNoStake);
      await expect(rpsGame.encryptMove(BigInt(0), password)).to.revertedWithCustomError(rpsGame, "InvalidMove")
    });

    it("PlayerA should be able to play and move should be recorded", async function () {
      const { rpsGame } = await loadFixture(deployNoStake);

      const move1 = await rpsGame.encryptMove(BigInt(1), password)

      await rpsGame.play(move1)
    });


    it("PlayerA should not be able to play Twice", async function () {
      
      const { rpsGame } = await loadFixture(deployNoStake);

      const move1 = await rpsGame.encryptMove(BigInt(1), password)

      await rpsGame.play(move1)

      await expect(rpsGame.play(move1)).to.be.revertedWithCustomError(rpsGame, "NotYourTurn")

    });


    it("PlayerA should not be able to play and Reveal", async function () {
      
      const { rpsGame} = await loadFixture(deployNoStake);

      const move1 = await rpsGame.encryptMove(BigInt(1), password)

      await rpsGame.play(move1)

      await expect(rpsGame.reveal(BigInt(1), password)).to.be.revertedWithCustomError(rpsGame, "CannotRevealNow")

    });


    it("Both Players should be able to play and reveal", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const move = BigInt(1)

      const move1 = await rpsGame.encryptMove(move, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move1)

      await rpsGame.connect(playerA).reveal(move, password)

      await rpsGame.connect(playerB).reveal(move, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[move], [move], [BigInt(3)], BigInt(0), BigInt(0)])

    });


    it("Rock Vs Rock should result in draw", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(1)

      const moveB = BigInt(1)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(3)], BigInt(0), BigInt(0)])

    });


    it("Rock Vs Paper should result in paper win", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(1)

      const moveB = BigInt(2)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(2)], BigInt(0), BigInt(1)])

    });

    it("Rock Vs Scissors should result in Rock win", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(1)

      const moveB = BigInt(3)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(1)], BigInt(1), BigInt(0)])

    });


    it("Paper Vs Rock should result in Paper Win", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(2)

      const moveB = BigInt(1)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(1)], BigInt(1), BigInt(0)])

    });


    it("Paper Vs Paper should result in draw", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(2)

      const moveB = BigInt(2)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(3)], BigInt(0), BigInt(0)])

    });


    it("Paper Vs Scissors should result in draw", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(2)

      const moveB = BigInt(3)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(2)], BigInt(0), BigInt(1)])

    });


    it("Scissors Vs Rock should result in Rock win", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(3)

      const moveB = BigInt(1)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(2)], BigInt(0), BigInt(1)])

    });


    it("Scissors Vs Paper should result in Paper Win", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(3)

      const moveB = BigInt(2)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(1)], BigInt(1), BigInt(0)])

    });


    it("Scissors Vs Scissors should result in draw", async function () {
      
      const { rpsGame, playerA, playerB } = await loadFixture(deployNoStake);

      const moveA = BigInt(3)

      const moveB = BigInt(3)

      const move1 = await rpsGame.encryptMove(moveA, password)

      const move2 = await rpsGame.encryptMove(moveB, password)

      await rpsGame.connect(playerA).play(move1)

      await rpsGame.connect(playerB).play(move2)

      await rpsGame.connect(playerA).reveal(moveA, password)

      await rpsGame.connect(playerB).reveal(moveB, password)

      expect(await rpsGame.getGameResult()).to.be.deep.equal([[moveA], [moveB], [BigInt(3)], BigInt(0), BigInt(0)])

    });

  });


  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });

});
