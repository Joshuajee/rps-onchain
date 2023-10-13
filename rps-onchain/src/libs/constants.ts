import { Address } from "wagmi";

export const MAIN_CONTRACT = process.env.NEXT_PUBLIC_MAIN_CONTRACT as Address




export enum PLAYER_MOVE {
    NONE = 0,
    ROCK =  1,
    PAPER = 2,
    SCISSORS = 3,
}

export enum GAME_STATUS {
    START = 0,
    DRAW =  1,
    PLAYER_WON = 2,
    OPPONENT_WON = 3
}

export enum FINAL_GAME_STATUS {
    PLAYING = 0,
    PLAYER_WON = 1,
    OPPONENT_WON = 2
}