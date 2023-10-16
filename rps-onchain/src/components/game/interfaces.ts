import { GAME_OUTCOME, PLAYER_MOVE } from "@/libs/constants";

export interface IGameResult {
    movePlayerA: PLAYER_MOVE[],
    movePlayerB: PLAYER_MOVE[],
    outcome: GAME_OUTCOME[],
    playerA: number,
    playerB: number
}