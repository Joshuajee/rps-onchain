import { ReactNode, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { networkNameByChainId } from "@/libs/utils"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { polygonZkEvmTestnet, scrollTestnet, hardhat, scrollSepolia } from 'wagmi/chains'
import { ZK_POLYGON_CHAIN_ID, ZK_SCROLL_CHAIN_ID } from "@/libs/constants"

const Navbar = dynamic(() => import("./Navbar"), { ssr: false })
 
interface IProps {
    children: ReactNode
}

const Layout = (props: IProps) => {

    const [isWrongNet, setIsWrongNet] = useState(false);
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()

    useEffect(() => {
        if (chain?.id && (chain.id != scrollSepolia.id && (Number(chain.id) != polygonZkEvmTestnet.id))) {
            setIsWrongNet(true)
        } else {
            setIsWrongNet(false)
        }
    }, [chain?.id]);

    return (
        <main suppressHydrationWarning className={`flex flex-col h-full min-h-screen`}>
            <Navbar />

            {
                (chain?.id && isWrongNet) &&
                    <div className='fixed top-14 bg-orange-400 w-full z-10 text-center px-4 py-2'>
                        You are connected to 
                        <strong> {networkNameByChainId(chain?.id)} </strong> 
                        network please switch to  
                        <button onClick={() => switchNetwork?.(scrollTestnet.id)} className='ml-2 underline font-bold'> Scroll Testnet </button>
                        <text className="ml-1">OR</text> 
                        <button onClick={() => switchNetwork?.(polygonZkEvmTestnet.id)} className='ml-2 underline font-bold'> ZK Polygon Testnet </button> 
                    </div>
            }

            <div className='flex-grow bg-slate-50'>{props.children}</div>
        </main>
    )
}

export default Layout