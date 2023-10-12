import Card from "@/components/game/Card";
import PlayOptions from "@/components/game/PlayOptions";
import { MAIN_CONTRACT, PLAYER_MOVE } from "@/libs/constants";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import WaitingRoom from "@/components/game/WaitingRoom";
import { Address, useContractRead } from "wagmi";

export default function GameArena() {

    const router = useRouter()

    const [playerMove, setPlayerMove] = useState(PLAYER_MOVE.NONE)
    const [opponentMove, setOpponentMove] = useState(PLAYER_MOVE.NONE)

    const gameResult =  useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'getGameResult',
        watch: true,
        //enabled: !started
    })



    console.log(gameResult.data)


    return (   
        <div style={{zIndex: 10}} data-aos="fade-in" className="rounded-lg flex flex-col bg-red-800 h-[60vh] md:h-[80vh] w-full md:w-4/5">

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

                <PlayOptions setPlayerMove={setPlayerMove} />

            </div>
        
        </div>
    )
}
