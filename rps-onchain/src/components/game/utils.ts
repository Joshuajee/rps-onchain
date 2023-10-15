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