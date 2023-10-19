import { PLAYER_MOVE } from "@/libs/constants"
import { memo, useCallback, useEffect, useState } from "react"


interface IProps {
    card: PLAYER_MOVE
}

const Card = ({ card } : IProps) => {   

    const name = () => {
        switch (card) {
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
        <div className="flex border-white border-[1px] h-full w-28  md:w-40 text-white justify-center items-center bg-blue-700">
            <text> {name()} </text>
        </div>
    )
}


export default memo(Card)