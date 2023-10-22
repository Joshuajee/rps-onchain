import { useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper"
import { Address, useContractRead } from "wagmi"
import { HOST } from "@/libs/constants"
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import LoaderOne from "../loaders/LoaderOne";
import { useRouter } from "next/router";
import GameButton from "../utils/GameButton";
import { toast } from "react-toastify";
import useContractAddr from "@/hooks/useContractAddr";
import useChainId from "@/hooks/useChainId";

const GameCreationModal = ({ open, address } : { open: boolean, address: Address }) => {

    const router = useRouter()

    const contractAddr = useContractAddr()

    const chainId = useChainId()

    const [lastGame, setLastGame] = useState(-1)
    const [link, setLink] = useState<string | null>(null)

    const handleClose = () => {}

    const fetchGameLength = useContractRead({
        address: contractAddr,
        abi: RPSGameFactory,
        functionName: 'getUserGamesLength',
        args: [address],
        watch: true,
        chainId: chainId
    })

    const fetchGame = useContractRead({
        address: contractAddr,
        abi: RPSGameFactory,
        functionName: 'getUserGame',
        args: [address, BigInt(lastGame || 1) - BigInt(1)],
        watch: true,
        enabled: lastGame >= 0 ? true : false,
        chainId: chainId
    })

    useEffect(() => {
        setLastGame(fetchGameLength.data as number)
    }, [fetchGameLength.data])

    useEffect(() => {
        if (fetchGame.data) {
            setLink(router.basePath +"/match/" + fetchGame.data + "/join-match")
        }
    }, [fetchGame.data, router])

    const copy = () => {
        navigator.clipboard.writeText(HOST + (link as string))
        toast.info("Text copied to clipboard")
    }

    return (
        <ModalWrapper title="Game Created" open={open} handleClose={handleClose}>
            {fetchGameLength.isLoading || fetchGame.isLoading && <LoaderOne /> }

            {
                link && (
                    <div className="flex flex-col items-center text-white">
                        <GameButton color="blue" onClick={copy}>
                            Copy Link and share with opponent
                        </GameButton>
                        <GameButton color="yellow" onClick={() => router.push("/match/" + fetchGame.data)}>
                            Start Match
                        </GameButton>
                    </div>
                )
            }
        </ModalWrapper>
    )
}

export default GameCreationModal