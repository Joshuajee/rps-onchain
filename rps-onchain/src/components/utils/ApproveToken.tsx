import { Address, useChainId, useContractWrite, useNetwork } from "wagmi"
import Web3btn from "./Web3btn"
import ERC20ABI from "@/abi/contracts/src/RPSPointToken.sol/RPSPointToken.json"
import useContractAddr from "@/hooks/useContractAddr"

interface IProps {
    tokenAddress: Address
}

const ApproveToken = (props: IProps) => {

    const chainId = useChainId()

    const contractAddr = useContractAddr()

    const { tokenAddress } = props

    const approve = useContractWrite({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "approve",
        args: [contractAddr, 100000],
        chainId: chainId
    })

    return (
        <Web3btn>Approve</Web3btn>
    )
}

export default ApproveToken