import { useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper"
import { Address, useContractRead } from "wagmi"
import { MAIN_CONTRACT } from "@/libs/constants"
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";

const GameCreationModal = ({ open, address } : { open: boolean, address: Address }) => {

    const [lastGame, setLastGame] = useState(-1)

    const handleClose = () => {}


    const fetchGameLength = useContractRead({
        address: MAIN_CONTRACT as Address,
        abi: RPSGameFactory,
        functionName: 'getUserGamesLength',
        args: [address],
        watch: true,
    })

    const fetchGame = useContractRead({
        address: MAIN_CONTRACT,
        abi: RPSGameFactory,
        functionName: 'getUserGame',
        args: [address, 0],
        watch: true
        //enabled: fetchGameLength.data > 0 ? true : false
    })

    useEffect(() => {
        //console.log(fetchGameLength, address)
        console.log(fetchGame, address)
    }, [fetchGame, fetchGameLength, address])




    return (
        <ModalWrapper open={open} handleClose={handleClose}>
            ijijiji
            rrrrrrrrrrrr
        </ModalWrapper>
    )
}

export default GameCreationModal