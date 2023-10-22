import { ZK_POLYGON_CONTRACT, ZK_SCROLL_CONTRACT } from "@/libs/constants"
import { useEffect, useState } from "react"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { polygonZkEvmTestnet, scrollSepolia } from "wagmi/chains"

const useContractAddr = () => {

    const { isConnected } = useAccount() 
    const [contract, setContract] = useState(ZK_SCROLL_CONTRACT)

    const { chain } = useNetwork()

    useEffect(() => {

        if (!isConnected) {
            setContract(ZK_SCROLL_CONTRACT)
        } else if (chain?.id) {
            if ((chain.id == scrollSepolia.id)) {
                setContract(ZK_SCROLL_CONTRACT)
            } else if ((Number(chain.id) == polygonZkEvmTestnet.id)) {
                setContract(ZK_POLYGON_CONTRACT)
            }
        }

    }, [isConnected, chain?.id])



    return contract
}

export default useContractAddr