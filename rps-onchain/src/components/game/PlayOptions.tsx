import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"
import PlayerCard from "./PlayerCard";
import { useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";

interface IProps {
    play: (val: PLAYER_MOVE) => void;
    setPlayerMove: (val: PLAYER_MOVE) => void;
}

const PlayOptions = ({ setPlayerMove } : IProps) => {

    const router  = useRouter()


    const play = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: (router.query.id) as any,
        abi: RPSGame,
        functionName: 'createGame',
        args: [],
        // chainId: originChainId,
    })


    const move = (move: PLAYER_MOVE) => {
        play?.write?.()
    }

    return  (
        <div className="flex justify-center items-center gap-4 h-44 bg-gray-900 px-10 py-12 rounded-md">
            <OptionCard onClick={move} card={PLAYER_MOVE.ROCK} />
            <OptionCard onClick={move} card={PLAYER_MOVE.PAPER} />
            <OptionCard onClick={move} card={PLAYER_MOVE.SCISSORS} />
        </div>
    )

}

export default PlayOptions
