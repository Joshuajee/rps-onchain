// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import './RPSNFTToken.sol';
import { IRPSGameBase } from "../interface/IRPSGameBase.sol";

contract RPSAchievementManager is IRPSGameBase {

    address public factory;

    function initialize(address _factory) external {
        if (factory != address(0)) revert AlreadyInitialized();
        factory = _factory;
    }

    RPSNFTToken public immutable token1;
    RPSNFTToken public immutable token2;
    RPSNFTToken public immutable token3;
    RPSNFTToken public immutable token4;
    RPSNFTToken public immutable token5;
    RPSNFTToken public immutable token6;
    RPSNFTToken public immutable token7;
    RPSNFTToken public immutable token8;
    RPSNFTToken public immutable token9;
    // RPSNFTToken public immutable token10;
    // RPSNFTToken public immutable token11;

    constructor() {
        token1 = new RPSNFTToken("RPS Battle Ready", "RPS-BR", "https://ipfs.io/ipfs/QmX72Asu4A9Wq8of7taEF6cXT1zqrQzkQmw4Z31BkSY8uY");
        token2 = new RPSNFTToken("RPS Fighter", "RPS-F", "https://ipfs.io/ipfs/QmVkDYADzBKBisifuUVmKHJ8VPw7ABrRkwHemAbSB8gAd7");
        token3 = new RPSNFTToken("RPS Soldier", "RPS-S", "https://ipfs.io/ipfs/QmVKwpgwSSNjj7TjVH2jAbFXhTJzcQBKmVBfDZzLBnz46g");
        token4 = new RPSNFTToken("RPS Warrior", "RPS-W", "https://ipfs.io/ipfs/QmX29pXHK5ZpBu1EH8RetzyjbzdxMeBhYdaUu6kqAb95RF");
        token5 = new RPSNFTToken("RPS Shogun", "RPS-Sh", "https://ipfs.io/ipfs/QmQESh5pSmVqwqTE3sQ79YuzPdxnUhZHqRhcAFJv5tQx2P");
        token6 = new RPSNFTToken("RPS Baron", "RPS-B", "https://ipfs.io/ipfs/QmUwfyYdaxPevNZMZJYXnRubumhuYMX1d9dxMkJeTHJR9n");
        token7 = new RPSNFTToken("RPS Warload", "RSP-WAR", "https://ipfs.io/ipfs/QmY4xWzR152kSFjWb5vKXZt8nAbCBWKK9XsnyfwhXtMH4A");
        token8 = new RPSNFTToken("RPS General", "RPS-GEN", "https://ipfs.io/ipfs/QmTUhdkh7Bit1aimCN8ZpRcmf9312Anjq6sYEzwzNEs2qp");
        token9 = new RPSNFTToken("RPS King", "RPS-K", "https://ipfs.io/ipfs/QmWivXBoVGncymAh1wfD6bExXgiWhiTyyBb87BnzVaBBHG");
        // token10 = new RPSNFTToken("RPS Emperor", "RPS-EMP", "");
        // token11 = new RPSNFTToken("RPS Immortal", "RPS-IMM", "");
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
        }   
        // else if (_uniqueVictory == 1953125) {
        //     //token10.safeMint(to);
        // }

    }


}