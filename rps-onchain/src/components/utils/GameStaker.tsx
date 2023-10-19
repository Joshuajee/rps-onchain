import useInput from "@/hooks/useInput"
import Input from "./Input"
import { ChangeEvent, useState } from "react"


export enum ASSET_TYPE {
    NONE = 0,
    TOKEN = 1,
    NFT = 2,
    ETH = 3
}

const GameStaker = () => {

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

    console.log(assetType)

    return (
        <div className="text-gray-800 bg-white p-2 rounded-sm my-2">

            <label htmlFor="asset-type">Choose Asset Type</label>

            <select onChange={onSelect} id="asset-type" className="min-w-48 h-12 p-4 my-2 rounded-lg outline-none w-full" >

                <option value={"0"}> None </option>
 
                <option value={"1"}> ERC20 Token </option>

                <option value={"2"}> ERC721 NFT </option>

                <option value={"3"}> ETH </option>

            </select>

            {
                assetType != ASSET_TYPE.NONE && assetType != ASSET_TYPE.ETH && tokenAddressField
            }

            {
                assetType != ASSET_TYPE.NONE && valueField
            }

        </div>
    )
}

export default GameStaker