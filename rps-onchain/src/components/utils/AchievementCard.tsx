import Image from "next/image"
import { Achievement } from "../game/utils"
import { Address, useContractRead } from "wagmi"
import  RPSAchievementManager from "@/abi/contracts/src/RPSAchievementManager.sol/RPSAchievementManager.json"


const metadata: any = {
    "rps-b": {
        "name":"RPS Baron",
        "description":"Defeat your 3125th challenger",
        "image":"https://ipfs.io/ipfs/QmTDqbcmY5aQsN6rSUCc2JEEvYVDpjjyrGAhjssip7UJU1",
        address: "token6"
    },
    "rps-br": {
        "name":"RPS Battle Ready",
        "description":"Defeat your first challenger",
        "image":"https://ipfs.io/ipfs/QmeUVcPFssGvTQjP3wqQfMzFytyJD959PA2t6SELcJFZ6R",
        address: "token1"
    },
    "rps-f": {
        "name":"RPS Fighter",
        "description":"Defeat your fifth challenger",
        "image":"https://ipfs.io/ipfs/QmRXc1bPMFASv7NYK7cwTb2cUj1dpKcBhFkhQDoNLQkcgu",
        address: "token2"
    },
    "rps-gen": {
        "name":"RPS General",
        "description":"Defeat your 78125th challenger",
        "image":"https://ipfs.io/ipfs/QmdwggXvf4wLxBM9F3HZ4TQwvSDmVSKgjLqysMXtHpfWec",
        address: "token8"
    },
    "rps-king": {
        "name":"RPS King",
        "description":"Defeat your 390625th challenger",
        "image":"https://ipfs.io/ipfs/QmPh7HvC6Sk4nTDsHZ1Q5zXQcpsaATUXCzh2DaSrWqFNLe",
        address: "token9"
    },
    "rps-s": {
        "name":"RPS Soldier",
        "description":"Defeat your 25th challenger",
        "image":"https://ipfs.io/ipfs/QmPhefCj3ZuJwthwrF2nzT5RfmiN9deKa68QBNeW8g9Meb",
        address: "token3"
    },
    "rps-sh": {
        "name":"RPS Shogun",
        "description":"Defeat your 625th challenger",
        "image":"https://ipfs.io/ipfs/QmY6KFowe1V4UdhbXtX9byQLjzSftWirSp1XaPWcxtSX7G",
        address: "token5"
    },
    "rps-w": {
        "name":"RPS Warrior",
        "description":"Defeat your 125th challenger",
        "image":"https://ipfs.io/ipfs/QmUMd4T3DWSFJHj7VxhhNbNLbS7SWvWnbQvd8EyY3Mxrkj",
        address: "token4"
    },
    "rps-war": {
        "name":"RPS Warload",
        "description":"Defeat your 15625th challenger",
        "image":"https://ipfs.io/ipfs/QmbJcB3npmXY4qAZi1CYRqpBUk8yd8e9vDGvVrGAmVQPbQ",
        address: "token7"
    }
    

}

interface IProps {
    achievementType: Achievement
    manager: Address | undefined | unknown
}

const AchievementCard = ({achievementType, manager}: IProps) => {

    const nft = metadata?.[achievementType as any]

    const tokenAddress = useContractRead({
      address: manager as Address,
      abi: RPSAchievementManager,
      functionName: nft?.address,
    })

    // const balance = useContractRead({
    //     address: manager as Address,
    //     abi: tokenAddress,
    //     functionName: "balanceOf",
    //   })

    console.log(tokenAddress.data)


    return (
        <div className="flex flex-col pt-4 justify-center items-center border-[1px] border-gray-800 rounded-sm shadow-lg w-80">
            <Image width={240} height={240} src={"/nfts/" + achievementType + ".jpg"} alt="Josh" />
            <div className="h-20 text-gray-900 text-sm w-full p-2">
                <h5>Name: {nft?.name} </h5>

                <h5 className="break-words">Description: {nft?.description} </h5>

            </div>
        </div>
    )
}

export default AchievementCard