import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { Address, useContractRead } from "wagmi";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import WaitingRoom from "@/components/game/WaitingRoom";
import GameArena from "@/components/game/GameArena";
import useChainId from "@/hooks/useChainId";


export default function Match() {

    const router = useRouter()

    const chainId = useChainId()

    const [started, setStarted] = useState(false)

    const gameStarted = useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'gameStarted',
        watch: true,
        enabled: !started,
        chainId: chainId
    })

    const gameTimeleft = useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'timeLeft',
        watch: true,
        enabled: !started,
        chainId: chainId
    })

    useEffect(() => {
        if (gameStarted.data === true) setStarted(true)
        else setStarted(false)
    }, [gameStarted.data])

    // useEffect(() => {
    //     if (gameTimeleft.data) setTimeleft(Number(gameTimeleft.data) * 1000)
    // }, [gameTimeleft.data])

    return (
        <Layout>

            <Container>

                <div className='flex flex-grow flex-col justify-center items-center text-white  w-full'>

                    {   gameStarted.data === true ? <GameArena /> : <WaitingRoom /> }

                </div>
                
            </Container>

        </Layout>
    )
}
