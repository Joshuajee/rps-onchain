// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IRPSGame {

    error UnAuthorized();
    error InvalidMove();
    error NotYourTurn();
    error HashDonotMatch();
    error CannotRevealNow();
    error GameNotOver();
    error GameOver();
  
}