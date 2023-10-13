// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;


interface IRPSGameBase {

    enum StakeType {isToken, isNFT, isNative}

    struct PlayerStake {
        StakeType stakeType;
        address tokenAddress;
        uint value;
    }

    struct GameInfo {
        bool isStaked;
        PlayerStake playerAStake;
        PlayerStake playerBStake;
    }


    error StakeDonotMatch();
    error AddressZero();
    error TranseferFailed();
  
}