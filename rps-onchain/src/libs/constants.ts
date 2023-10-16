import { Address } from "wagmi";

export const MAIN_CONTRACT = process.env.NEXT_PUBLIC_MAIN_CONTRACT as Address
export const HOST = process.env.NEXT_PUBLIC_HOST



export enum PLAYER_MOVE {
    NONE = 0,
    ROCK =  1,
    PAPER = 2,
    SCISSORS = 3,
}

export enum GAME_OUTCOME {
    DRAW =  0,
    PLAYER_A = 1,
    PLAYER_B = 2
}

export enum FINAL_GAME_STATUS {
    PLAYING = 0,
    PLAYER_WON = 1,
    OPPONENT_WON = 2
}