// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import './RPSNFTToken.sol';
import { IRPSGameBase } from "../interface/IRPSGameBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RPSAchievementManager is IRPSGameBase, Ownable {

    address public token1;
    address public token2;
    address public token3;
    address public token4;
    address public token5;
    address public token6;
    address public token7;
    address public token8;
    address public token9;
    // address public token10;
    // address public token11;

    constructor() {}


    function Reward(address to, uint _uniqueVictory) external {
        
        if (_uniqueVictory == 1) {
            RPSNFTToken(token1).safeMint(to);
        }   else if (_uniqueVictory == 5) {
            RPSNFTToken(token2).safeMint(to);
        }   else if (_uniqueVictory == 25) {
            RPSNFTToken(token3).safeMint(to);
        }   else if (_uniqueVictory == 125) {
            RPSNFTToken(token4).safeMint(to);
        }   else if (_uniqueVictory == 625) {
            RPSNFTToken(token5).safeMint(to);
        }   else if (_uniqueVictory == 3125) {
            RPSNFTToken(token6).safeMint(to);
        }   else if (_uniqueVictory == 15625) {
            RPSNFTToken(token7).safeMint(to);
        }   else if (_uniqueVictory == 78125) {
            RPSNFTToken(token8).safeMint(to);
        }   else if (_uniqueVictory == 390625) {
            RPSNFTToken(token9).safeMint(to);
        }   
        // else if (_uniqueVictory == 1953125) {
        //     //token10.safeMint(to);
        // }

    }


    function initialize(address factory) external onlyOwner {

    }

    function setToken1(address _token) external onlyOwner {
        if (token1 != address(0)) revert("Already Initialized"); 
        token1 = _token;
    }

    function setToken2(address _token) external onlyOwner {
        if (token2 != address(0)) revert("Already Initialized"); 
        token2 = _token;
    }

    function setToken3(address _token) external onlyOwner {
        if (token3 != address(0)) revert("Already Initialized"); 
        token3 = _token;
    }

    function setToken4(address _token) external onlyOwner {
        if (token4 != address(0)) revert("Already Initialized"); 
        token4 = _token;
    }

    function setToken5(address _token) external onlyOwner {
        if (token5 != address(0)) revert("Already Initialized"); 
        token5 = _token;
    }

    function setToken6(address _token) external onlyOwner {
        if (token6 != address(0)) revert("Already Initialized"); 
        token6 = _token;
    }

    function setToken7(address _token) external onlyOwner {
        if (token7 != address(0)) revert("Already Initialized"); 
        token7 = _token;
    }

    function setToken8(address _token) external onlyOwner {
        if (token8 != address(0)) revert("Already Initialized"); 
        token8 = _token;
    }

    function setToken9(address _token) external onlyOwner {
        if (token9 != address(0)) revert("Already Initialized"); 
        token9 = _token;
    }

}