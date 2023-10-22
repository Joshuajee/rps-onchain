import Image from "next/image"
import { Achievement } from "../game/utils"
import { Address, useChainId, useContractRead, useNetwork } from "wagmi"
import  RPSAchievementManager from "@/abi/contracts/src/RPSAchievementManager.sol/RPSAchievementManager.json"
import RPSNFT from "@/abi/contracts/src/RPSAchievements.sol/RPSAchievements.json"

const metadata: any = {
    "rps-b": {
        "name":"RPS Baron",
        "description":"Defeat your 3125th challenger",
        "image":"https://ipfs.io/ipfs/QmTDqbcmY5aQsN6rSUCc2JEEvYVDpjjyrGAhjssip7UJU1",
        address: "token6",
        fights: 3125
    },
    "rps-br": {
        "name":"RPS Battle Ready",
        "description":"Defeat your first challenger",
        "image":"https://ipfs.io/ipfs/QmeUVcPFssGvTQjP3wqQfMzFytyJD959PA2t6SELcJFZ6R",
        address: "token1",
        fights: 1
    },
    "rps-f": {
        "name":"RPS Fighter",
        "description":"Defeat your fifth challenger",
        "image":"https://ipfs.io/ipfs/QmRXc1bPMFASv7NYK7cwTb2cUj1dpKcBhFkhQDoNLQkcgu",
        address: "token2",
        fights: 5
    },
    "rps-gen": {
        "name":"RPS General",
        "description":"Defeat your 78125th challenger",
        "image":"https://ipfs.io/ipfs/QmdwggXvf4wLxBM9F3HZ4TQwvSDmVSKgjLqysMXtHpfWec",
        address: "token8",
        fights: 78125
    },
    "rps-king": {
        "name":"RPS King",
        "description":"Defeat your 390625th challenger",
        "image":"https://ipfs.io/ipfs/QmPh7HvC6Sk4nTDsHZ1Q5zXQcpsaATUXCzh2DaSrWqFNLe",
        address: "token9",
        fights: 390625
    },
    "rps-s": {
        "name":"RPS Soldier",
        "description":"Defeat your 25th challenger",
        "image":"https://ipfs.io/ipfs/QmPhefCj3ZuJwthwrF2nzT5RfmiN9deKa68QBNeW8g9Meb",
        address: "token3",
        fights: 25
    },
    "rps-sh": {
        "name":"RPS Shogun",
        "description":"Defeat your 625th challenger",
        "image":"https://ipfs.io/ipfs/QmY6KFowe1V4UdhbXtX9byQLjzSftWirSp1XaPWcxtSX7G",
        address: "token5",
        fights: 625
    },
    "rps-w": {
        "name":"RPS Warrior",
        "description":"Defeat your 125th challenger",
        "image":"https://ipfs.io/ipfs/QmUMd4T3DWSFJHj7VxhhNbNLbS7SWvWnbQvd8EyY3Mxrkj",
        address: "token4",
        fights: 125
    },
    "rps-war": {
        "name":"RPS Warload",
        "description":"Defeat your 15625th challenger",
        "image":"https://ipfs.io/ipfs/QmbJcB3npmXY4qAZi1CYRqpBUk8yd8e9vDGvVrGAmVQPbQ",
        address: "token7",
        fights: 15625
    }
    

}

interface IProps {
    achievementType: Achievement
    manager: Address | undefined | unknown
    uniqueVictories: number
}

const AchievementCard = ({achievementType, manager, uniqueVictories}: IProps) => {

    const chainId = useChainId()

    const nft = metadata?.[achievementType as any]


    const victoriesLeft = nft?.fights - Number(uniqueVictories)

    const tokenAddress = useContractRead({
        address: manager as Address,
        abi: RPSAchievementManager,
        functionName: nft?.address,
        chainId: chainId
    })




    return (
        <div className="flex flex-col pt-4 justify-center items-center border-[1px] border-gray-800 rounded-sm shadow-lg w-80">
            <Image width={240} height={240} src={"/nfts/" + achievementType + ".jpg"} alt="Josh" />
            <div className="h-28 text-gray-900 text-sm w-full p-2">
                <h5>Name: {nft?.name} </h5>

                <h5 className="break-words">Description: {nft?.description} </h5>

                {
                    victoriesLeft > 0 ?
                    <h5 className="break-words"> {victoriesLeft} Victories left to achieve this </h5>
                    :
                    <h5 className="break-words">You own this </h5>
                }

                <h5 className="break-words">{tokenAddress?.data as string} </h5>

            </div>
        </div>
    )
}

export default AchievementCard