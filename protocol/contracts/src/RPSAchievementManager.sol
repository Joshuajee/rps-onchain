// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import './RPSNFTToken.sol';

contract RPSAchievementManager {

    RPSNFTToken public immutable token1;
    RPSNFTToken public immutable token2;
    RPSNFTToken public immutable token3;
    RPSNFTToken public immutable token4;
    RPSNFTToken public immutable token5;
    RPSNFTToken public immutable token6;
    RPSNFTToken public immutable token7;
    RPSNFTToken public immutable token8;
    RPSNFTToken public immutable token9;
    RPSNFTToken public immutable token10;

    constructor() {
        token1 = new RPSNFTToken("", "", "");
        token2 = new RPSNFTToken("", "", "");
        token3 = new RPSNFTToken("", "", "");
        token4 = new RPSNFTToken("", "", "");
        token5 = new RPSNFTToken("", "", "");
        token6 = new RPSNFTToken("", "", "");
        token7 = new RPSNFTToken("", "", "");
        token8 = new RPSNFTToken("", "", "");
        token9 = new RPSNFTToken("", "", "");
        token10 = new RPSNFTToken("", "", "");
    }


    function Reward(address to, uint _uniqueVictory) external {

        if (_uniqueVictory == 1) {
            token1.safeMint(to);
        }   else if (_uniqueVictory == 5) {
            token2.safeMint(to);
        }   else if (_uniqueVictory == 25) {
            token3.safeMint(to);
        }   else if (_uniqueVictory == 125) {
            token4.safeMint(to);
        }   else if (_uniqueVictory == 625) {
            token5.safeMint(to);
        }   else if (_uniqueVictory == 3125) {
            token6.safeMint(to);
        }   else if (_uniqueVictory == 15625) {
            token7.safeMint(to);
        }   else if (_uniqueVictory == 78125) {
            token8.safeMint(to);
        }   else if (_uniqueVictory == 390625) {
            token9.safeMint(to);
        }   else if (_uniqueVictory == 1953125) {
            token10.safeMint(to);
        }

    }


}