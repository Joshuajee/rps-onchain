import { GAME_OUTCOME } from "@/libs/constants"
import GameButton from "../utils/GameButton"
import { IGameResult } from "./interfaces"
import { memo, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Address, useContractWrite } from "wagmi"
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { toast } from "react-toastify"
import useContractAddr from "@/hooks/useContractAddr"

interface IProps {
    outcomes: GAME_OUTCOME[]  
    newMove: boolean
    clear(): void 
    isPlayerA: boolean
    gameResult: IGameResult
    gameAddress: Address
}

const ActionScreen = (props: IProps) => {

    const contractAddr = useContractAddr()

    const router = useRouter()

    const { outcomes, newMove, gameResult, isPlayerA, gameAddress, clear, } = props

    const lastOutcome = outcomes[outcomes.length - 1]

    const [gameOver, setGameOver] = useState(false)
    const [isWinner, setIsWinner] = useState(false)

    const claim = useContractWrite({
        address: contractAddr,
        abi: RPSGameFactory,
        functionName: 'claimPrize',
        args: [gameAddress],
    })

    const matchOutcome = () => {

        switch(lastOutcome) {
            case GAME_OUTCOME.DRAW:
                return "DRAW"
            case GAME_OUTCOME.PLAYER_A:
                return isPlayerA ? "You Win" : "You Lose"
            case GAME_OUTCOME.PLAYER_B:
                return isPlayerA ? "You Lose" : " You Win"
        }

        return "DRAW"
    }

    const onClick = () => {
        if (gameOver) {
            if (isWinner) {
                claim.write()
            } else {
                router.push("/")
            } 
        } else {
            clear()
        } 
    }

    useEffect(() => {
        if (gameResult.playerA > 1) {
            setGameOver(true)
        }
        if (gameResult.playerB > 1) {
            setGameOver(true)
        }
    }, [gameResult])

    useEffect(() => {
        if (gameOver) {
            if (isPlayerA) {
                setIsWinner(gameResult.playerA > 1)
            } else {
                setIsWinner(gameResult.playerB > 1)
            }
        }
    }, [gameOver, isPlayerA, gameResult])

    useEffect(() => {
        if (claim.isError) {
            toast.error(claim.error?.message)
        }

        if (claim.isSuccess) {
            toast.success("Prize claimed successfully")
            setTimeout(() => {
                router.push("/")
            }, 2000)
        }
    }, [claim, router])


    if (!newMove) return <></>

    return (
        <div className="fixed top-0 left-0 h-screen w-screen z-10" style={{zIndex: 100}}>

            <div className="fixed h-screen w-screen bg-gray-900 opacity-90"></div>

            <div className="fixed flex justify-center items-center h-screen w-screen">

                <div data-aos="slide-up" className="flex flex-col items-center justify-center mx-4 rounded-lg w-full max-w-[500px] min-h-[150px]">

                    <h2 className="text-6xl font-bold"> 
                        {gameOver && "Game Over - "}
                        {matchOutcome()}
                    </h2>

                    <div className="mt-20">

                        <GameButton onClick={onClick} color="blue">
                            {gameOver ? isWinner ? "Claim Prize" : "Main Menu" : "Next Round"}
                        </GameButton>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default memo(ActionScreen)