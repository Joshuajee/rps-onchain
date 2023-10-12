import Card from "@/components/game/Card";
import PlayOptions from "@/components/game/PlayOptions";
import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { MAIN_CONTRACT, PLAYER_MOVE } from "@/libs/constants";
import { Address, useContractRead } from "wagmi";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import WaitingRoom from "@/components/game/WaitingRoom";
import GameArena from "@/components/game/GameArena";

export default function Match() {

    const router = useRouter()

    const [started, setStarted] = useState(false)

    const gameStarted = useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'gameStarted',
        watch: true,
        enabled: !started
    })

    useEffect(() => {
        if (gameStarted.data === true) setStarted(true)
        else setStarted(false)
    }, [gameStarted.data])

    return (
        <Layout>

            <Container>

                <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white  w-full'>

                    {   gameStarted.data === true ? <GameArena /> : <WaitingRoom /> }

                </div>
                
            </Container>

        </Layout>
    )
}
