import { ZK_SCROLL_CONTRACT } from "@/libs/constants"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

const useContractAddr = () => {

    const { isConnected } = useAccount() 
    const [contract, setContract] = useState(ZK_SCROLL_CONTRACT)


    useEffect(() => {

        if (!isConnected) {
            setContract(ZK_SCROLL_CONTRACT)
        } else {

        }

    }, [isConnected])



    return contract


}

export default useContractAddr