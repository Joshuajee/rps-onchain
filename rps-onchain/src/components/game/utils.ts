import { PLAYER_MOVE } from "@/libs/constants";
import { Address } from "wagmi";

const CURRENT_SECRET = "-current-secret"
const CURRENT_HASH = "-current-hash"
const CURRENT_MOVE = "-current-move"

export function setLocalSecret(gameAddress: Address, value: any) {
    localStorage.setItem(gameAddress + CURRENT_SECRET, value)
}

export function setLocalHash(gameAddress: Address, value: any) {
    localStorage.setItem(gameAddress + CURRENT_HASH, value)
}

export function setLocalMove(gameAddress: Address, value: any) {
    localStorage.setItem(gameAddress + CURRENT_MOVE, value)
}

export function getLocalSecret(gameAddress: Address) {
    return localStorage.getItem(gameAddress + CURRENT_SECRET)
}

export function getLocalHash(gameAddress: Address) {
    return localStorage.getItem(gameAddress + CURRENT_HASH)
}

export function getLocalMove(gameAddress: Address) : PLAYER_MOVE {
    return localStorage.getItem(gameAddress + CURRENT_MOVE) as any
}

export function deleteLocalSecret(gameAddress: Address) {
    return localStorage.removeItem(gameAddress + CURRENT_SECRET)
}

export function deleteLocalHash(gameAddress: Address) {
    return localStorage.removeItem(gameAddress + CURRENT_HASH)
}

export function deleteLocalMove(gameAddress: Address) : PLAYER_MOVE {
    return localStorage.removeItem(gameAddress + CURRENT_MOVE) as any
}

export function chooseMoveFromInt(move: number) : PLAYER_MOVE {

    if (move === 1) {
        return PLAYER_MOVE.ROCK
    } else if (move === 2) {
        return PLAYER_MOVE.PAPER
    } else if (move === 3) {
        return PLAYER_MOVE.SCISSORS
    }

    return PLAYER_MOVE.NONE

}