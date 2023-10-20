import { useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper"
import { Address, useContractRead } from "wagmi"
import { HOST, MAIN_CONTRACT } from "@/libs/constants"
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import LoaderOne from "../loaders/LoaderOne";
import { useRouter } from "next/router";
import GameButton from "../utils/GameButton";
import { toast } from "react-toastify";

const GameCreationModal = ({ open, address } : { open: boolean, address: Address }) => {

    const router = useRouter()

    const [lastGame, setLastGame] = useState(-1)
    const [link, setLink] = useState<string | null>(null)

    const handleClose = () => {}

    const fetchGameLength = useContractRead({
        address: MAIN_CONTRACT,
        abi: RPSGameFactory,
        functionName: 'getUserGamesLength',
        args: [address],
        watch: true,
    })

    const fetchGame = useContractRead({
        address: MAIN_CONTRACT,
        abi: RPSGameFactory,
        functionName: 'getUserGame',
        args: [address, BigInt(lastGame || 1) - BigInt(1)],
        watch: true,
        enabled: lastGame >= 0 ? true : false
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