import { PLAYER_MOVE } from "@/libs/constants";
import { ReactNode, memo } from "react"
import PlayerCard from "./PlayerCard";

interface IProps {
    onClick?: (move: PLAYER_MOVE) => void;
    aos?: string;
    card: PLAYER_MOVE
}

const OptionCard = ({ card, onClick, aos }: IProps ) => {

    return (
        <button
            onClick={() => onClick?.(card)}
            className="border-white border-[1px] w-20  h-12 sm:w-40 md:h-28 md:w-40 text-white"
            data-aos={aos}
            >
            <PlayerCard move={card} />
        </button>
    )
}

export default memo(OptionCard)