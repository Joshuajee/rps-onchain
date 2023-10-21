// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IRPSGame {

    error UnAuthorized();
    error InvalidMove();
    error NotYourTurn();
    error HashDonotMatch();
    error CannotRevealNow();
    error OpponentHasNotJoined();
    error GameNotOver();
    error GameOver();
    error GameHasStarted();
    error PlayerMustBeDifferent();
    error YouDidnotWinThisMatch();
}