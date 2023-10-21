// SPDX-License-Identifier: MIT
pragma solidity  0.8.20;

import { RPSPointToken } from './RPSPointToken.sol';
import { RPSGame } from './RPSGame.sol';
import { IRPSGameBase } from "../interface/IRPSGameBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
//import '../libs/CloneFactory.sol';


interface ITOKEN {
    function mint(address to, uint256 amount) external;
}

contract RPSGameDeployer is IRPSGameBase {

    address public factory;

    function initialize(address _factory) external {
        if (factory != address(0)) revert AlreadyInitialized();
        factory = _factory;
    }

    function deploy(address _factory, address _playerA, address _playerB, GameInfo calldata _gameInfo) isFactory external returns(RPSGame) {
        return new RPSGame(_factory, _playerA, _playerB, _gameInfo); 
    }

    modifier isFactory() {
        if (msg.sender != factory) revert CallerNotFactory();
        _;
    }

}
