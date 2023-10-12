import { PLAYER_MOVE } from "@/libs/constants"
import { memo, useCallback, useEffect, useState } from "react"


interface IProps {
    card: PLAYER_MOVE
}

const Card = ({ card } : IProps) => {

    const link = useCallback(() => {
        switch (card) {
            case PLAYER_MOVE.ROCK:
                return "https://assets3.lottiefiles.com/packages/lf20_N8vR3LvkCB.json"
            case PLAYER_MOVE.PAPER:
                return "https://assets9.lottiefiles.com/packages/lf20_BEELk7wPJW.json"
            case PLAYER_MOVE.SCISSORS:
                return "https://assets3.lottiefiles.com/private_files/lf30_licg9ydj.json"
            default:
                return ""
            
        }
    }, [card])

   

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
        <div className="border-white border-[1px] h-12 w-20 md:h-full md:w-40 text-white justify-center items-center">
            {/* <lottie-player src={link()}  background="transparent"  speed="1"  autoplay /> */}
            <p> {name()} </p>
        </div>
    )
}


export default memo(Card)