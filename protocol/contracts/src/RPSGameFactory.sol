// SPDX-License-Identifier: MIT
pragma solidity  0.8.20;

import { RPSPointToken } from './RPSPointToken.sol';
//import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";
import { RPSGame } from './RPSGame.sol';
//import '../libs/CloneFactory.sol';


interface ITOKEN {
    function mint(address to, uint256 amount) external;
}

contract RPSGameFactory {

//    using SafeTransferLib for address;

    mapping(address => RPSGame) games;

    address immutable public pointTokenAddress;
    //address immutable public cloneAddress;

    constructor() {
        pointTokenAddress = address(new RPSPointToken());
    }

    function createGame(address _playerA, address _playerB) internal returns (address pair) {
        
        RPSGame game = new RPSGame(_playerA, _playerB); 

        address gameAddress = address(game);

        //ITOKEN(pointTokenAddress).mint(gameAddress, 10);
        
    }

   
}
