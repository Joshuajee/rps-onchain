import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import { useRouter } from "next/router";
import { Address, useContractRead, useContractWrite } from "wagmi";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ASSET_TYPE } from "@/components/utils/GameStaker";
import useContractAddr from "@/hooks/useContractAddr";
import useChainId from "@/hooks/useChainId";


export default function JoinMatch() {

    const contractAddr = useContractAddr()

    const chainId = useChainId()

    const router = useRouter()

    const [gameInfo, setGameInfo] = useState<any>(null)

    const playerAStake = gameInfo && gameInfo?.playerAStake
    const playerBStake = gameInfo && gameInfo?.playerBStake

    const getGameInfo = useContractRead({
        address: router.query.id as Address,
        abi: RPSGame,
        functionName: 'getGameInfo',
        chainId: chainId
    })

    const joinGame = useContractWrite({
        address: contractAddr,
        abi: RPSGameFactory,
        functionName: 'joinGame',
        args: [router.query.id],
        value: playerBStake?.value,
    })

    useEffect(() => {
        if (joinGame.isError) {
            toast.error(joinGame.error?.message)
        }

        if (joinGame.isSuccess) {
            router.push("/match/" + router.query.id)
        }

    }, [joinGame.isError, joinGame.isSuccess, joinGame.error, router])

    useEffect(() => {
        setGameInfo(getGameInfo.data)
    }, [getGameInfo.data])


    const assetType = (assetType: ASSET_TYPE) => {
        switch(assetType) {
            case ASSET_TYPE.TOKEN:
                return "ERC20 Token"
            case ASSET_TYPE.NFT:
                return "ERC721 NFT"
            case ASSET_TYPE.ETH:
                return "Ether"
        }
        return "ERC20 Token"
    }

    return (
        <Layout>

            <Container>

                <div className='flex flex-grow flex-col justify-center items-center text-white w-full'>

                    <div className="max-w-lg w-full text-gray-800">

                        {
                             gameInfo && gameInfo?.isStaked && (
                                <div className="flex flex-col items-center justify-center">
                                    <h4 className="text-center text-xl font-semibold">Player A</h4> 
                                    <p>Asset Type: {assetType(playerAStake.stakeType)}</p>
                                    <p>Token Address</p>
                                    <p>{playerAStake.tokenAddress}</p>
                                    <p>Value: {playerAStake.value?.toString()}</p>

                                    <h4 className="text-center text-xl font-semibold mt-2">Player B</h4> 
                                    <p>Asset Type: {assetType(playerBStake.stakeType)}</p>
                                    <p>Token Address</p>
                                    <p>{playerBStake.tokenAddress}</p>
                                    <p>Value: {playerBStake?.value?.toString()}</p>
                                </div>
                            ) 
                        }

                        <Web3btn onClick={joinGame.write} loading={joinGame.isLoading}>
                            Join Match
                        </Web3btn>

                    </div>

                </div>
                
            </Container>

        </Layout>
    )
}
