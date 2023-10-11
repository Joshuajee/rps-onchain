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


    function joinGame(address payable _gameAddress) external {

        address _playerB = msg.sender;

        RPSGame game = RPSGame(_gameAddress);

        game.joinGame(_playerB);

        // add to the game user games
        userGames[_playerB].push(game);

        emit JoinGame(_playerB, _gameAddress);
        
    }


    function getUserGame (address _user, uint _index) external view returns(RPSGame) {
        return userGames[_user][_index];
    }

    

    function getUserGames (address _user, uint _start) external view returns(RPSGame[] memory) {

        uint8 COUNT = 100;

        uint256 _length = userGames[_user].length;

        uint256 start = _start;

        if (_start > _length) {
            start = _length;
        }

        uint end = start < COUNT ? 0 : start - COUNT;

        uint8 count = 0;

        RPSGame[] memory rpsGames = new RPSGame[](COUNT);

        for (uint i = start; i > end;) {

            rpsGames[count] = userGames[_user][count];

            unchecked {
                --i;
                ++count;
            }

        }

        return rpsGames;
    }

    function getUserGamesLength (address _user) external view returns(uint) {
        return userGames[_user].length;
    }

}
