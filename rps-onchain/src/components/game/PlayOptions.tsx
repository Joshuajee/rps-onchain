import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"
import { Address, useAccount, useContractRead, useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import GameButton from "../utils/GameButton";
import { chooseMoveFromInt, getLocalHash, getLocalMove, setLocalHash, setLocalMove } from "./utils";

interface IProps {
    playerMove: PLAYER_MOVE;
    setPlayerMove: (val: PLAYER_MOVE) => void;
}

const PlayOptions = (props: IProps) => {

    const router  = useRouter()

    const gameAddress = router.query.id as Address

    const { address } = useAccount()

    const { playerMove: PM, setPlayerMove: setPM } = props

    const [hash, setHash] = useState<string| null>(null)
    const [playerMove, setPlayerMove] = useState<PLAYER_MOVE| null>(null)

    const play = useContractWrite({
        address: gameAddress,
        abi: RPSGame,
        functionName: 'play',
        args: [hash],
    })


    const isWaitingForPlay = useContractRead({
        address: gameAddress,
        abi: RPSGame,
        functionName: 'isWaitingForPlay',
        args: [address],
        watch:true
    })


    const move = (move: PLAYER_MOVE) => {
        
        const abiCoder = new ethers.AbiCoder()
        
        const hash = ethers.keccak256(
            abiCoder.encode(
                ['string', 'uint'],
                ['password', move],
            )
        )

        setHash(hash)
        setPlayerMove(move)

    }

    const revealMove = useContractWrite({
        address: (router.query.id) as any,
        abi: RPSGame,
        functionName: 'reveal',
        args: [PM, "password"],
    })

    useEffect(() => {
        setHash(getLocalHash(gameAddress))
        setPM(chooseMoveFromInt(Number(getLocalMove(gameAddress))))
    }, [setPM, gameAddress])

    useEffect(() => {
        if (playerMove != PLAYER_MOVE.NONE) play?.write?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerMove])

    useEffect(() => {
        if (play.isError) {
          toast.error(play.error?.message)
        }
    
        // if (play.isSuccess) {
        //     setPM(playerMove as PLAYER_MOVE)
        // }
    }, [play.isError, play.isSuccess, play.error, playerMove, setPM])

    useEffect(() => {
        if (revealMove.isError) {
          toast.error(revealMove.error?.message)
        }
    
        if (revealMove.isSuccess) {
            //setPM(playerMove as PLAYER_MOVE)
        }
    }, [revealMove.isError, revealMove.isSuccess, revealMove.error])


    useEffect(() => {

        if (play.isSuccess) {
            setLocalMove(gameAddress, playerMove)
            setLocalHash(gameAddress, hash)
    
            // setHash(hash)
    
            setPM(playerMove as PLAYER_MOVE)
        }

    }, [play.isSuccess, playerMove, hash, gameAddress, setPM])

    const cards = (
        <div className="flex justify-center items-center gap-4">
            <OptionCard onClick={move} card={PLAYER_MOVE.ROCK} />
            <OptionCard onClick={move} card={PLAYER_MOVE.PAPER} />
            <OptionCard onClick={move} card={PLAYER_MOVE.SCISSORS} />
        </div>
    )

    const reveal = (
        <div data-aos="slide-up">
            <GameButton disabled={false} onClick={revealMove.write} color="blue">Reveal Move</GameButton>
        </div>
    )

    const waiting = (
        <div data-aos="slide-up" className="text-xl">
            Waiting for opponent move
        </div>
    )

    return  (
        <div className="flex justify-center items-center h-44 bg-gray-900 px-10 py-12 rounded-md">
            {PM ? isWaitingForPlay.data ? waiting : reveal : cards}
        </div>
    )

}

export default PlayOptions
