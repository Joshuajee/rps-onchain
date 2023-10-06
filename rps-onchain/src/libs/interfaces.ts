import { Address } from "wagmi";
import { CHAIN_ID, FACTORY_ADDRESS } from "./enums";
import { SUPPORTED_SYMBOLS } from "./types";
import { BigNumberish } from "ethers";

export interface SUPPORTED_NETWORKS {
    name: string,
    description: string,
    icon: string,
    chainId: CHAIN_ID,
    domainId: number,
    mailbox?: Address,
    factoryAddress: FACTORY_ADDRESS,
    symbol: SUPPORTED_SYMBOLS;
}


export interface POSITION {
    id: Address,
    owner: Address,
    amountIn1: BigNumberish,
    amountIn2: BigNumberish,
    availableFees: BigNumberish,
    totalFees: BigNumberish
    paid: Boolean,
    tokenId: BigNumberish,
    remoteDomain: number,
}