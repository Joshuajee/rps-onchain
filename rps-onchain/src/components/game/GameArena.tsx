import Card from "@/components/game/Card";
import PlayOptions from "@/components/game/PlayOptions";
import { GAME_OUTCOME, PLAYER_MOVE } from "@/libs/constants";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { memo, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Address, useAccount, useContractRead } from "wagmi";
import { chooseMoveFromInt, deleteLocalHash, deleteLocalMove, deleteLocalSecret, getLocalMove } from "./utils";
import { IGameResult } from "./interfaces";
import ActionScreen from "./ActionScreen";


const GameArena = () => {

    const { address } = useAccount()

    const router = useRouter()

    const gameAddress = router.query.id as Address

    const [playerMove, setPlayerMove] = useState(PLAYER_MOVE.NONE)
    const [opponentMove, setOpponentMove] = useState(PLAYER_MOVE.NONE)

    const [outcomes, setOutcomes] = useState<GAME_OUTCOME[]>([])

    const [isPlayerA, setIsPlayerA] = useState<boolean | null>(null)

    const [clearMove, setClearMove] = useState<boolean>(false)

    const [newMove, setNewMove] = useState(false)

    const gameResult =  useContractRead({
        address: gameAddress,
        abi: RPSGame,
        functionName: 'getGameResult',
        watch: true,
    })

    const playerA =  useContractRead({
        address: gameAddress,
        abi: RPSGame,
        functionName: 'playerA',
        watch: true
    })

    useEffect(() => {
        const move = Number(getLocalMove(gameAddress))
        if (move) setPlayerMove(chooseMoveFromInt(move))
    }, [gameAddress])

    useEffect(() => {
        const result = gameResult.data as IGameResult
        if (result) {
            const length = result.outcome.length;
            if (length > outcomes?.length) {
                if (isPlayerA != null) {
                    if (isPlayerA)  {
                        setOpponentMove(chooseMoveFromInt(result.movePlayerB[length - 1]))
                    } else {
                        setOpponentMove(chooseMoveFromInt(result.movePlayerA[length - 1]))
                    }

                    setOutcomes(result?.outcome)

                    setTimeout(() => {
                        setNewMove(true)
                    }, 2000)

                }
            }
        }
    }, [gameResult, outcomes?.length, isPlayerA])

    useEffect(() => {
        if (playerA.data) {
            setIsPlayerA(playerA.data == address ? true : false)
        }
    }, [address, playerA.data])

    useEffect(() => {
        if (clearMove) setClearMove(false)
    }, [clearMove])

    const clear = () => {
        setPlayerMove(PLAYER_MOVE.NONE)
        setOpponentMove(PLAYER_MOVE.NONE)
        setNewMove(false)
        deleteLocalHash(gameAddress)
        deleteLocalMove(gameAddress)
        deleteLocalSecret(gameAddress)
        setClearMove(true)
    }


    return (  
        <> 
            <div style={{zIndex: 0}} data-aos="fade-in" className="rounded-lg flex flex-col bg-red-800 h-[60vh] md:h-[80vh] w-full md:w-4/5">

                <div className="flex grow justify-between p-2 md:p-6">

                    <div>
                        {
                            (playerMove != PLAYER_MOVE.NONE) &&  
                                <div data-aos="fade-up" className="h-full">
                                    <Card card={playerMove} />
                                </div>
                        }
                    </div>



                    <div>
                        {
                            (opponentMove != PLAYER_MOVE.NONE) &&  
                                <div data-aos="fade-down" className="h-full">
                                    <Card card={opponentMove} />
                                </div>
                        }
                    </div>

                </div>

                <div className="p-6">

                    <PlayOptions playerMove={playerMove} setPlayerMove={setPlayerMove} clearMove={clearMove} />

                </div>
            
            
            </div>
            
            {
                isPlayerA != null && 
                    <ActionScreen 
                        isPlayerA={isPlayerA} 
                        newMove={newMove} 
                        clear={clear} 
                        outcomes={outcomes}
                        gameResult={gameResult.data as IGameResult}
                        gameAddress={gameAddress}
                        />
            }
        </>
    )
}


export default memo(GameArena)