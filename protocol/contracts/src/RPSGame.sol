// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import { IRPSGame } from "../interface/IRPSGame.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RPSGame is IRPSGame, Ownable {

    uint constant public GAME_TIMEOUT = 10 minutes;    // Max delay
    uint public timeLeft;


    enum GameType {NoStake, Stake}
    enum Move {None, Rock, Paper, Scissors}
    enum Outcome {None, PlayerA, PlayerB, Draw}   // Possible outcomes

    GameType gameType;
    address immutable public factory;
    bool gameStarted = false;
    bool gameEnded = false;

    // Players' addresses
    address immutable public playerA;
    address immutable public playerB;

    // Encrypted Move
    bytes32 private encryptedMovePlayerA;
    bytes32 private encryptedMovePlayerB;

    // Clear Move set only after both players have committed their encrypted Move
    Move private movePlayerA;
    Move private movePlayerB;

    struct GameResult {
        Move[] movePlayerA;
        Move[] movePlayerB;
        Outcome[] outcome;
        uint8 playerA;
        uint8 playerB;
    }

    GameResult gameResult;

    //, GameType _gameType

    constructor(address _playerA, address _playerB) {
        playerA = _playerA;
        playerB = _playerB;
        //gameType = _gameType;
        factory = msg.sender;
    }


    /**************************************************************************/
    /**************************** External Function ***************************/
    /**************************************************************************/

    function joinGame(address _playerB) external onlyOwner {
        gameStarted = true;
        timeLeft = block.timestamp + GAME_TIMEOUT;
    }

    // Save player's encrypted move.
    function play(bytes32 encrMove) external canPlayGame isPlayer {
        if (msg.sender == playerA && encryptedMovePlayerA == 0x0) {
            encryptedMovePlayerA = encrMove;
        } else if (msg.sender == playerB && encryptedMovePlayerB == 0x0) {
            encryptedMovePlayerB = encrMove;
        } else {
            revert NotYourTurn();
        }
        timeLeft = block.timestamp + GAME_TIMEOUT;
    }

    // reveal move
    function reveal(Move _move, string calldata _password) external canPlayGame isPlayer bothHasPlayed {
        
        bytes32 encryptedMove = encryptMove(_move, _password);
   
        // If hashes match, clear move is saved
        if (msg.sender == playerA) {
            if (encryptedMove == encryptedMovePlayerA)  {
                movePlayerA = _move;
            } else revert HashDonotMatch();
        } else if (msg.sender == playerB) {
            if (encryptedMove == encryptedMovePlayerB) {
                movePlayerB = _move;
            }  else revert HashDonotMatch();
        } else {
            revert UnAuthorized(); 
        }

        _updateGameResult(movePlayerA, movePlayerB);
        timeLeft = block.timestamp + GAME_TIMEOUT;
    }

    function claimPrize(address _winner) external {

        if(!gameEnded) revert GameNotOver();

        if (_winner == playerA) {

        } else  if (_winner == playerB) {

        }

    }

    function getGameResult() external view returns(GameResult memory) {
        return gameResult; 
    }


    /**************************************************************************/
    /*************************** INTERNAL FUNCTIONS ***************************/
    /**************************************************************************/

    function _updateGameResult(Move _movePlayerA, Move _movePlayerB) internal {
        if (_movePlayerA != Move.None && _movePlayerB != Move.None) {

            _gameResult(_movePlayerA, _movePlayerB);

            gameResult.movePlayerA.push(_movePlayerA);
            gameResult.movePlayerB.push(_movePlayerB);

            movePlayerA = Move.None;
            movePlayerB = Move.None;

            encryptedMovePlayerA = 0x0;
            encryptedMovePlayerB = 0x0;

        }
    }

    function _gameResult(Move _movePlayerA, Move _movePlayerB) internal {

        if (_movePlayerA == Move.Rock) {

            if (_movePlayerB == Move.Rock) _draw();
            else if (_movePlayerB == Move.Paper) _playerBWon();
            else if (_movePlayerB == Move.Scissors) _playerAWon();

        } else if (_movePlayerA == Move.Paper) {

            if (_movePlayerB == Move.Rock) _playerAWon();
            else if (_movePlayerB == Move.Paper) _draw();
            else if (_movePlayerB == Move.Scissors) _playerBWon();

        } if (_movePlayerA == Move.Scissors) {

            if (_movePlayerB == Move.Rock) _playerBWon();
            else if (_movePlayerB == Move.Paper) _playerAWon();
            else if (_movePlayerB == Move.Scissors) _draw();

        }

    }

    function _draw() internal {
        gameResult.outcome.push(Outcome.Draw);
    }

    function _playerAWon() internal {
        uint8 _point = gameResult.playerA + 1;
        gameResult.outcome.push(Outcome.PlayerA);
        gameResult.playerA = _point;
        if (_point > 1) gameEnded = true;
    }

    function _playerBWon() internal {
        uint8 _point = gameResult.playerA + 1;
        gameResult.outcome.push(Outcome.PlayerB);
        gameResult.playerB = _point;
        if (_point > 1) gameEnded = true;
    }


    /**************************************************************************/
    /**************************** HELPER FUNCTIONS ****************************/
    /**************************************************************************/

    // Return 'true' if both players have commited a move, 'false' otherwise.
    function bothPlayed() public view returns (bool) {
        return (encryptedMovePlayerA != 0x0 && encryptedMovePlayerB != 0x0);
    }

    // Return 'true' if both players have revealed their move, 'false' otherwise.
    function bothRevealed() public view returns (bool) {
        return (movePlayerA != Move.None && movePlayerB != Move.None);
    }


    function encryptMove(Move _move, string memory _password) public pure returns (bytes32) {
        if (_move == Move(0)) revert InvalidMove();
        return keccak256(abi.encodePacked(_password, _move));
    }


    /**************************************************************************/
    /***************************      Modifiers     ***************************/
    /**************************************************************************/

    modifier canPlayGame() {
        if (!gameStarted) revert OpponentHasNotJoined();
        if (gameEnded) revert GameOver();
        _;
    }

    modifier isPlayer() {
        if (msg.sender != playerA && msg.sender != playerB) revert UnAuthorized();
        _;
    }

    modifier bothHasPlayed() {
        if (encryptedMovePlayerA == 0x0 || encryptedMovePlayerB == 0x0) revert CannotRevealNow();
        _;
    }

}