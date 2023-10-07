// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { IRPSGame } from "./interface/IRPSGame.sol";

contract RPSGame is IRPSGame {

    uint constant public GAME_TIMEOUT = 10 minutes;    // Max delay


    enum GameType {NoStake, Stake}
    enum Move {None, Rock, Paper, Scissors}
    enum Outcome {None, PlayerA, PlayerB, Draw}   // Possible outcomes

    GameType gameType;

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

    constructor(address _playerA, address _playerB//, GameType _gameType
    ) {
        playerA = _playerA;
        playerB = _playerB;
        //gameType = _gameType;
    }


    /**************************************************************************/
    /**************************** External Function ***************************/
    /**************************************************************************/

    // Save player's encrypted move.
    function play(bytes32 encrMove) external isPlayer {
        if (msg.sender == playerA && encryptedMovePlayerA == 0x0) {
            encryptedMovePlayerA = encrMove;
        } else if (msg.sender == playerB && encryptedMovePlayerB == 0x0) {
            encryptedMovePlayerB = encrMove;
        } else {
            revert NotYourTurn();
        }
    }


    function reveal(Move _move, string calldata _password) external isPlayer bothHasPlayed {
        
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
            revert UnAuthorize(); 
        }

        _updateGameResult(movePlayerA, movePlayerB);

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
        gameResult.outcome.push(Outcome.PlayerA);
        gameResult.playerA = gameResult.playerA + 1;
    }

    function _playerBWon() internal {
        gameResult.outcome.push(Outcome.PlayerB);
        gameResult.playerB = gameResult.playerB + 1;
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

    modifier isPlayer() {
        require (msg.sender == playerA || msg.sender == playerB);
        _;
    }

    modifier bothHasPlayed() {
        if (encryptedMovePlayerA == 0x0 || encryptedMovePlayerB == 0x0) revert CannotRevealNow();
        _;
    }

    



}