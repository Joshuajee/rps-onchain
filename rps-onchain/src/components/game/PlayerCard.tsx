import { PLAYER_MOVE } from "@/libs/constants"
import { memo, useCallback, useEffect, useState } from "react"


interface IProps {
    move: PLAYER_MOVE
}

const PlayerCard = ({ move } : IProps) => {

    const name = () => {
        switch (move) {
            case PLAYER_MOVE.ROCK:
                return "ROCK"
            case PLAYER_MOVE.PAPER:
                return "PAPER"
            case PLAYER_MOVE.SCISSORS:
                return "SCISSORS"
            default:
                return ""
            
        }
    }
    
    return (
        <div>
            {/* <lottie-player src={link()}  background="transparent"  speed="1"  autoplay /> */}
            <p> {name()} </p>
        </div>
    )
}


export default memo(PlayerCard)