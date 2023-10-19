import Container from "@/components/utils/Container";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import { MAIN_CONTRACT } from "@/libs/constants";
import { useRouter } from "next/router";
import { Address, useAccount, useContractRead, useContractWrite } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import GameCreationModal from "@/components/modals/GameCreationModal";
import { toast } from "react-toastify";

export default function JoinMatch() {

    const router = useRouter()

    const fetchGame = useContractRead({
        address: MAIN_CONTRACT as Address,
        abi: RPSGameFactory,
        functionName: 'games',
        args: [router.query.id],
    })

    const joinGame = useContractWrite({
        address: MAIN_CONTRACT as Address,
        abi: RPSGameFactory,
        functionName: 'joinGame',
        args: [router.query.id],
    })

    useEffect(() => {
        if (joinGame.isError) {
            toast.error(joinGame.error?.message)
        }

        if (joinGame.isSuccess) {
            router.push("/match/" + router.query.id)
        }

    }, [joinGame.isError, joinGame.isSuccess, joinGame.error, router])


    return (
        <Layout>

            <Container>

                <div className='flex flex-grow flex-col justify-center items-center text-white w-full'>

                    <div className="max-w-lg w-full">

                        <Web3btn onClick={joinGame.write} loading={joinGame.isLoading}>
                            Join Match
                        </Web3btn>

                    </div>


                </div>
                
            </Container>

        </Layout>
    )
}
