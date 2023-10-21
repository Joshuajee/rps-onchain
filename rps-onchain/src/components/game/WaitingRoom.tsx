import { PLAYER_MOVE } from "@/libs/constants"
import OptionCard from "./OptionCard"
import PlayerCard from "./PlayerCard";
import { useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import RPSGame from "@/abi/contracts/src/RPSGame.sol/RPSGame.json";


const WaitingRoom = () => {

    return  (
        <div className="rounded-lg flex flex-col items-center justify-center bg-red-800 h-[80vh] w-4/5">
            <h2 className="text-4xl font-semibold">Waiting for Opponent to join</h2>
            <div>
    
            </div>
        </div>
    )

}

export default WaitingRoom
