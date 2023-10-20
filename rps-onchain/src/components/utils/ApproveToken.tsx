import { Address, useContractWrite } from "wagmi"
import Web3btn from "./Web3btn"
import ERC20ABI from "@/abi/contracts/src/RPSPointToken.sol/RPSPointToken.json"
import { MAIN_CONTRACT } from "@/libs/constants"

interface IProps {
    tokenAddress: Address
}

const ApproveToken = (props: IProps) => {

    const { tokenAddress } = props

    const approve = useContractWrite({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "approve",
        args: [MAIN_CONTRACT, 100000]
    })

    return (
        <Web3btn>Approve</Web3btn>
    )
}

export default ApproveToken