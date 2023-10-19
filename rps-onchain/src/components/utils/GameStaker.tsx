import useInput from "@/hooks/useInput"
import Input from "./Input"
import { ChangeEvent, useEffect, useState } from "react"
import "react-toggle/style.css" 
import { StakeInfo } from "@/pages/match/create-match"


export enum ASSET_TYPE {
    TOKEN = 0,
    NFT = 1,
    ETH = 2
}

interface IProps {
    stakeInfo: StakeInfo;
    // setStakeInfo(stakeInfo: StakeInfo): void 
    setStakeInfo: any 
}

const GameStaker = (props: IProps) => {

    const { setStakeInfo } = props

    const [assetType, setAssetType] = useState<ASSET_TYPE>(ASSET_TYPE.TOKEN)

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
            //newStake[1] = tokenAddress.value
            newStake[2] = Number(value.value) || 0
            return newStake
        })
    }, [value.value, tokenAddress.value, assetType, setStakeInfo])

    // console.log(props.stakeInfo)


    return (
        <div className="text-gray-800 bg-white p-2 rounded-sm my-2">

            <label htmlFor="asset-type">Choose Asset Type</label>

            <select onChange={onSelect} id="asset-type" className="min-w-48 h-12 p-4 my-2 rounded-lg outline-none w-full" >
                <option value={"0"}> ERC20 Token </option>
                <option value={"1"}> ERC721 NFT </option>
                <option value={"2"}> ETH </option>
            </select>

            {
                assetType != ASSET_TYPE.ETH && tokenAddressField
            }

            {   valueField  }

        </div>
    )
}

export default GameStaker