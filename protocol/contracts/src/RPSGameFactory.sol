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

    event CreateGame(address indexed playerA, address indexed game);
    event JoinGame(address indexed playerB, address indexed game);

    //recording games
    mapping(address => RPSGame) public games;

    // recording games user participated in
    mapping(address => RPSGame[]) public userGames;

    address immutable public pointTokenAddress;
    //address immutable public cloneAddress;

    constructor() {
        pointTokenAddress = address(new RPSPointToken());
    }

    function createGame(address _playerA, address _playerB) external {
        
        RPSGame game = new RPSGame(_playerA, _playerB); 

        address gameAddress = address(game);

        games[gameAddress] = game; 

        // add the game to games created
        userGames[_playerA].push(game);

        emit CreateGame(_playerA, _playerB);
        
    }


    function joinGame(address _gameAddress) external {

        address _playerB = msg.sender;

        RPSGame game = RPSGame(_gameAddress);

        game.joinGame(_playerB);

        // add to the game user games
        userGames[_playerB].push(game);

        emit JoinGame(_playerB, _gameAddress);
        
    }

   
}
