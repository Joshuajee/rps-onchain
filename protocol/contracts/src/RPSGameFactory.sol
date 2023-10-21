// SPDX-License-Identifier: MIT
pragma solidity  0.8.20;

import { RPSPointToken } from './RPSPointToken.sol';
import { RPSGame } from './RPSGame.sol';
import { RPSGameDeployer } from './RPSGameDeployer.sol';
import { RPSAchievementManager } from './RPSAchievementManager.sol';
import { IRPSGameBase } from "../interface/IRPSGameBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
//import '../libs/CloneFactory.sol';


interface ITOKEN {
    function mint(address to, uint256 amount) external;
}

contract RPSGameFactory is IRPSGameBase {

    using SafeERC20 for IERC20;

    event CreateGame(address indexed playerA, address indexed game);
    event JoinGame(address indexed playerB, address indexed game);


    struct GamerProfile {
        uint wins;
        uint loses;
        uint uniqueWins;
    }

    //recording games
    mapping(address => RPSGame) public games;

    // recording games user participated in
    mapping(address => RPSGame[]) public userGames;

    // recording gamers profile
    mapping(address => GamerProfile) public gamerProfile;

    // recording game address defeated
    mapping(address => mapping(address => bool)) public hasDefeated;

    address immutable public pointTokenAddress;
    address immutable public achievementManagerAddress;

    address public deployerAddress;

    constructor() {
        pointTokenAddress = address(new RPSPointToken());
        achievementManagerAddress = address(new RPSAchievementManager());
    }

    function setDeployerAddress(address _deployer) external {
        deployerAddress = _deployer;
    }

    function createGame(address _playerA, address _playerB, GameInfo calldata _gameInfo) external payable {
        
        if (_playerA == _playerB) revert PlayersAddressMustBeDifferent();

        RPSGame game = RPSGame(RPSGameDeployer(deployerAddress).deploy(address(this), _playerA, _playerB, _gameInfo)); 

        address payable gameAddress = payable(address(game));

        games[gameAddress] = game; 

        // add the game to games created
        userGames[_playerA].push(game);

        uint _value = _gameInfo.playerAStake.value;

        if (_gameInfo.isStaked) {

            if (_gameInfo.playerAStake.stakeType == StakeType.isToken) {

                if (_gameInfo.playerAStake.tokenAddress == address(0)) revert AddressZero();

                IERC20(_gameInfo.playerAStake.tokenAddress).safeTransferFrom(msg.sender, gameAddress, _value);
               
            } else if (_gameInfo.playerAStake.stakeType == StakeType.isNFT) {

                if (_gameInfo.playerAStake.tokenAddress == address(0)) revert AddressZero();
            
                IERC721(_gameInfo.playerAStake.tokenAddress).safeTransferFrom(msg.sender, gameAddress, _value);

            } else if (_gameInfo.playerAStake.stakeType == StakeType.isNative) {
            
                if (_value != msg.value) revert StakeDonotMatch(); 

                (bool _status, ) = payable(gameAddress).call{value: msg.value}("");

                if (!_status) revert TransferFailed();
            
            }

        }

        emit CreateGame(_playerA, _playerB);
        
    }


    function joinGame(address payable _gameAddress) payable external {

        address _playerB = msg.sender;

        RPSGame game = RPSGame(_gameAddress);

        GameInfo memory _gameInfo = game.getGameInfo();

        uint _value = _gameInfo.playerBStake.value;

        if (_gameInfo.isStaked) {

            if (_gameInfo.playerBStake.stakeType == StakeType.isToken) {

                if (_gameInfo.playerAStake.tokenAddress == address(0)) revert AddressZero();

                IERC20(_gameInfo.playerBStake.tokenAddress).safeTransferFrom(msg.sender, address(this), _value);
               
            } else if (_gameInfo.playerBStake.stakeType == StakeType.isNFT) {
            
                if (_gameInfo.playerAStake.tokenAddress == address(0)) revert AddressZero();

                IERC721(_gameInfo.playerBStake.tokenAddress).safeTransferFrom(msg.sender, address(this), _value);

            } else if (_gameInfo.playerBStake.stakeType == StakeType.isNative) {
            
                if (_value != msg.value) revert StakeDonotMatch(); 

                (bool _success, ) = address(_gameAddress).call{value: msg.value}("");

                if (!_success) revert TransferFailed();
            }

        }

        game.joinGame();

        // add to the game user games
        userGames[_playerB].push(game);

        emit JoinGame(_playerB, _gameAddress);
        
    }

    function claimPrize(address payable _gameAddress) external {
        RPSGame(_gameAddress).claimPrize(msg.sender);
        RPSPointToken(pointTokenAddress).mint(msg.sender, 10 ether);
        address _playerA = RPSGame(_gameAddress).playerA();
        address _playerB = RPSGame(_gameAddress).playerB();
        address loserAddress = _playerA == msg.sender ? _playerB : _playerA;
        _mintReward(msg.sender, loserAddress);
        _updateGamerProfile(msg.sender, true);
        _updateGamerProfile(loserAddress, false);
    }


    function getUserGame (address _user, uint _index) external view returns(RPSGame) {
        return userGames[_user][_index];
    }


    // function getUserGames (address _user, uint _page) external view returns(RPSGame[] memory) {

    //     uint8 COUNT = 100;
        
    //     uint256 start = _page * COUNT;

    //     uint length = userGames[_user].length;

    //     uint end = start < length ? length : start - COUNT;

    //     uint8 count = 0;

    //     RPSGame[] memory rpsGames = new RPSGame[](COUNT);

    //     for (uint i = start; i > end;) {

    //         rpsGames[count] = userGames[_user][count];

    //         unchecked {
    //             --i;
    //             ++count;
    //         }

    //     }

    //     return rpsGames;
    // }

    // to be deleted later and worked with the one above
    function getUserGames (address _user, uint _page) external view returns(RPSGame[] memory) {

        uint8 COUNT = 100;
        
        uint256 start = userGames[_user].length;

        uint8 count = 0;

        RPSGame[] memory rpsGames = new RPSGame[](start);

        for (uint i = start; i > 0;) {

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

    function getRPSPTokenBalance(address _user) external view returns(uint) {
        return RPSPointToken(pointTokenAddress).balanceOf(_user);
    }


    /**************************************************************************/
    /*************************** INTERNAL FUNCTIONS ***************************/
    /**************************************************************************/

    function _updateGamerProfile(address _gamer, bool _isWinner) internal {
        GamerProfile storage _gamerProfile = gamerProfile[_gamer];
        if (_isWinner) {
            _gamerProfile.wins = _gamerProfile.wins + 1;
        } else {
            _gamerProfile.loses = _gamerProfile.loses + 1;
        }
    }

    function _mintReward(address _winner, address _loser) internal {
        uint winnerBalance = IERC20(pointTokenAddress).balanceOf(_winner);
        uint loserBalance = IERC20(pointTokenAddress).balanceOf(_loser);

        if (loserBalance > winnerBalance) {
            uint margin = loserBalance - winnerBalance;
            RPSPointToken(pointTokenAddress).mint(_winner, margin / 100);
            RPSPointToken(pointTokenAddress).burnLoserTokens(_loser, margin / 50);
        }


        if (!hasDefeated[_winner][_loser]) {
            gamerProfile[_winner].uniqueWins += 1;
            RPSAchievementManager(achievementManagerAddress).Reward(_winner, gamerProfile[_winner].uniqueWins);
        }

    }

}
