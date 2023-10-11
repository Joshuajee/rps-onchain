import Container from "@/components/utils/Container";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import useInput from "@/hooks/useInput";
import { MAIN_CONTRACT } from "@/libs/constants";
import { useRouter } from "next/router";
import { Address, useAccount, useContractWrite } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import GameCreationModal from "@/components/modals/GameCreationModal";

export default function JoinMatch() {


    const { address } = useAccount()

    const opponentAddress = useInput("address")

    const joinGame = useContractWrite({
        address: MAIN_CONTRACT as Address,
        abi: RPSGameFactory,
        functionName: 'joinGame',
        args: [address, opponentAddress.value],
    })

    useEffect(() => {
        if (joinGame.isError) {
            alert(joinGame.error)
        }

        if (joinGame.isSuccess) {

        }
    }, [joinGame.isError, joinGame.isSuccess, joinGame.error])



    return (
        <Layout>

            <Container>

                <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>


                <div className="max-w-lg w-full">

                    <Input 
                        label="Opponent Address" 
                        value={opponentAddress.value}
                        onChange={opponentAddress.setValue}
                        type="text"
                        />


                    <Web3btn onClick={joinGame.write} loading={joinGame.isLoading}>
                        Create Match
                    </Web3btn>




                </div>


                </div>
                
            </Container>

        </Layout>
    )
}
