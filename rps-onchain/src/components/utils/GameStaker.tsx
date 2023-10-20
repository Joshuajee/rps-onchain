import useInput from "@/hooks/useInput"
import Input from "./Input"
import { ChangeEvent, useEffect, useState } from "react"
import "react-toggle/style.css" 
import { StakeInfo } from "@/pages/match/create-match"
import { ethers } from "ethers"
import { Address } from "wagmi"


export enum ASSET_TYPE {
    NONE = 0,
    ETH = 1,
    TOKEN = 2,
    NFT = 3,
}

interface IProps {
    stakeInfo: StakeInfo;
    // setStakeInfo(stakeInfo: StakeInfo): void 
    setStakeInfo: any 
}

const addressZero = ethers.ZeroAddress as Address

const GameStaker = (props: IProps) => {

    const { setStakeInfo } = props

    const [assetType, setAssetType] = useState<ASSET_TYPE>(ASSET_TYPE.NONE)

    const tokenAddress = useInput("address")
    const value = useInput("text")

    const tokenAddressField = (
        <Input 
            label="Token Address" 
            value={tokenAddress.value}
            onChange={tokenAddress.setValue}
            type="text"/>
    )

    const valueField = (
        <Input 
            label={assetType === ASSET_TYPE.NFT ? "Token Id" : "Amount"} 
            value={value.value}
            onChange={value.setValue}
            type="number"/>
    )

    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setAssetType(Number(e.target.value))
    }

    useEffect(() => {
        setStakeInfo((stakeInfo: any) => {
            const newStake = [...stakeInfo]
            newStake[0] = assetType
            if (assetType === ASSET_TYPE.NONE || assetType === ASSET_TYPE.ETH) {
                newStake[1] = addressZero
            } else {
                newStake[1] = tokenAddress.value
            }
            newStake[2] = Number(value.value) || 0
            return newStake
        })
    }, [value.value, tokenAddress.value, assetType, setStakeInfo])

    return (
        <div className="text-gray-800 bg-white p-2 rounded-sm my-2">

            <label htmlFor="asset-type">Choose Asset Type</label>

            <select onChange={onSelect} id="asset-type" className="min-w-48 h-12 p-4 my-2 rounded-lg outline-none w-full" >
                <option value={"0"}> NONE </option>               
                <option value={"1"}> ETH </option>
                <option value={"2"}> ERC20 Token </option>
                <option value={"3"}> ERC721 NFT </option>
            </select>

            {   assetType != ASSET_TYPE.NONE && assetType != ASSET_TYPE.ETH && tokenAddressField    }

            {   assetType != ASSET_TYPE.NONE && valueField  }

        </div>
    )
}

export default GameStaker