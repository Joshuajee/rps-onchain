import { Address, useAccount, useContractRead } from 'wagmi'
import truncAddress from 'truncate-eth-address'
import { AiOutlineWallet } from 'react-icons/ai'
import  { RxCaretDown } from 'react-icons/rx'
import { useState } from 'react'
import ConnectionInfo from './connectionInfo'
import WalletOptions from './walletsOptions'
import ModalWrapper from '../modals/ModalWrapper'
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import convert from 'ethereum-unit-converter'
import useContractAddr from '@/hooks/useContractAddr'
import useChainId from '@/hooks/useChainId'



const Connection = () => {

    const contractAddr = useContractAddr()

    const chainId = useChainId()

    const { address, isConnected } = useAccount()
    const [show, setShow] = useState(false)
    const [showOptions, setShowOptions] = useState(false)


    const getRPSPTokenBalance = useContractRead({
        address: contractAddr,
        abi: RPSGameFactory,
        functionName: 'getRPSPTokenBalance',
        args: [address],
        chainId: chainId
    })

    const close  = () => {
        setShow(false)
    }

    const closeOptions  = () => {
        setShowOptions(false)
    }

    return (
        <div>

            { !isConnected &&
                <button 
                    onClick={() => setShowOptions(true)}
                    className="px-6 md:px-10 rounded-lg h-10 text-sm bg-blue-800 text-white hover:bg-blue-900">
                    Connect Wallet 
                </button>

            }

            {

                isConnected &&  (
                    <div className='flex items-center'>

                        <div className='ml-6'>
                            <text> { convert(Number(getRPSPTokenBalance.data || "0.0"), "wei").ether } </text>
                            <text>  RPST </text>
                        </div>

                        <div onClick={() => setShow(!show)} className='hover:cursor-pointer w-36 md:w-44 text-xs md:text-base flex items-center cursor-pointer'>

                            <AiOutlineWallet className='mr-2' size={"2em"} />

                            <span> {truncAddress(String(address))}  </span>    

                            <RxCaretDown className='ml-2' />

                        </div>

                    </div>
                )

            }

            {
                <ConnectionInfo show={show} close={close} />
            }

            <ModalWrapper title={"Choose Wallet"} open={showOptions} handleClose={closeOptions}>
                <WalletOptions close={closeOptions}/>
            </ModalWrapper>

        </div>
    )
}

export default Connection