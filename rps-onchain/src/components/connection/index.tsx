import { useAccount } from 'wagmi'
import truncAddress from 'truncate-eth-address'
import { AiOutlineWallet } from 'react-icons/ai'
import  { RxCaretDown } from 'react-icons/rx'
import { useState } from 'react'
import ConnectionInfo from './connectionInfo'
import WalletOptions from './walletsOptions'
import ModalWrapper from '../utils/ModalWrapper'



const Connection = () => {

    const { address, isConnected } = useAccount()
    const [show, setShow] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

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
                    <div onClick={() => setShow(!show)} className='hover:cursor-pointer w-36 md:w-44 text-xs md:text-base flex items-center cursor-pointer'>

                        <AiOutlineWallet className='mr-2' size={"2em"} />

                        <span> {truncAddress(String(address))}  </span>    

                        <RxCaretDown className='ml-2' />

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