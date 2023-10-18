// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import './RPSNFTToken.sol';

contract RPSAchievements {

    RPSNFTToken public immutable token1;
    RPSNFTToken public immutable token2;
    RPSNFTToken public immutable token3;
    RPSNFTToken public immutable token4;
    RPSNFTToken public immutable token5;
    RPSNFTToken public immutable token6;
    RPSNFTToken public immutable token7;
    RPSNFTToken public immutable token8;

    constructor() {
        token1 = new RPSNFTToken("", "", "");
        token2 = new RPSNFTToken("", "", "");
        token3 = new RPSNFTToken("", "", "");
        token4 = new RPSNFTToken("", "", "");
        token5 = new RPSNFTToken("", "", "");
        token6 = new RPSNFTToken("", "", "");
        token7 = new RPSNFTToken("", "", "");
        token8 = new RPSNFTToken("", "", "");
    }


}