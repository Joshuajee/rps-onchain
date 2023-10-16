import { GAME_OUTCOME } from "@/libs/constants"
import GameButton from "../utils/GameButton"

interface IProps {
    outcomes: GAME_OUTCOME[]  
    newMove: boolean
    clear(): void 
    isPlayerA: boolean
}

const ActionScreen = (props: IProps) => {

    const { outcomes, newMove, clear, isPlayerA } = props

    const lastOutcome = outcomes[outcomes.length - 1]

    const matchOutcome = () => {

        switch(lastOutcome) {
            case GAME_OUTCOME.DRAW:
                return "DRAW"
            case GAME_OUTCOME.PLAYER_A:
                return isPlayerA ? "You Win" : "You Lose"
            case GAME_OUTCOME.PLAYER_B:
                return isPlayerA ? "You Lose" : " You Win"
        }

        return "DRAW"
    }

    const onClick = () => {
        clear()
    }

    if (!newMove) return <></>

    return (
        <div className="fixed top-0 left-0 h-screen w-screen z-10" style={{zIndex: 100}}>

            <div className="fixed h-screen w-screen bg-gray-900 opacity-90"></div>

            <div className="fixed flex justify-center items-center h-screen w-screen">

                <div data-aos="slide-up" className="flex flex-col items-center justify-center mx-4 rounded-lg w-full max-w-[500px] min-h-[150px]">

                    <h2 className="text-6xl font-bold"> {matchOutcome()}</h2>

                    <div className="mt-20">

                        <GameButton onClick={onClick} color="blue">Continue</GameButton>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ActionScreen