import Card from "@/components/game/Card";
import PlayOptions from "@/components/game/PlayOptions";
import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { MAIN_CONTRACT, PLAYER_MOVE } from "@/libs/constants";
import { Address, useContractRead } from "wagmi";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { useReducer } from "react";
import { useRouter } from "next/router";
import WaitingRoom from "@/components/game/WaitingRoom";

export default function GameArena() {

    const router = useRouter()

    const gameStarted = useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'gameStarted',
        watch: true,
    })


    return (   
        <div data-aos="fade-up"  className="rounded-lg flex flex-col bg-red-800 h-[80vh] w-4/5">

            <div className="flex grow justify-between p-6">

                <Card card={PLAYER_MOVE.PAPER} />

            <div>


            </div>

                <Card card={PLAYER_MOVE.SCISSORS} />

            </div>

            <div className="p-6">

                <PlayOptions />

            </div>
        
        </div>
    )
}
