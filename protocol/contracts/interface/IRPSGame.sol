// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IRPSGame {

    error UnAuthorize();
    error InvalidMove();
    error NotYourTurn();
    error HashDonotMatch();
    error CannotRevealNow();
  
}