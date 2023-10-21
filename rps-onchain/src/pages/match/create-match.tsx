import Container from "@/components/utils/Container";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import useInput from "@/hooks/useInput";
import { Address, useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import GameCreationModal from "@/components/modals/GameCreationModal";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import GameStaker from "@/components/utils/GameStaker";
import Switch from "react-switch";
import useContractAddr from "@/hooks/useContractAddr";



export type StakeInfo = [number, Address, number]

export type GameInfo = [
  boolean,
  StakeInfo,
  StakeInfo
]

const addressZero = ethers.ZeroAddress as Address

const initalGameInfo: GameInfo = [
  false,
  [0, addressZero, 0],
  [0, addressZero, 0]
]

export default function JoinMatch() {

  const [open, setOpen] = useState(false)

  const [isStaked, setIsStaked] = useState(false)

  const [gameInfo, setGameInfo] = useState<GameInfo | any>(initalGameInfo)

  const [playerAStake, setPlayerAStake] = useState<StakeInfo>([0, addressZero, 0])
  const [playerBStake, setPlayerBStake] = useState<StakeInfo>([0, addressZero, 0])

  const { address, isConnected } = useAccount()

  const contractAddr = useContractAddr()

  console.log(contractAddr)

  const opponentAddress = useInput("address")

  const createGame = useContractWrite({
    address: contractAddr,
    abi: RPSGameFactory,
    functionName: 'createGame',
    args: [address, opponentAddress.value, gameInfo],
    value: BigInt(playerAStake[2])
  })

  const { isSuccess} = useWaitForTransaction({
    hash: createGame.data?.hash,
  })

  useEffect(() => {
    if (createGame.isError) {
      toast.error(createGame.error?.message)
    }

    if (isSuccess) {
      setOpen(true)
    }
  }, [createGame.isError, isSuccess, createGame.error])

  useEffect(() => {
    if (isStaked) {
      setGameInfo((gameInfo: GameInfo) => {
        const newGameInfo = [...gameInfo]
        newGameInfo[0] = true
        newGameInfo[1] = playerAStake
        newGameInfo[2] = playerBStake
        return newGameInfo
      })
    } else {
      setGameInfo((gameInfo: GameInfo) => {
        const newGameInfo = [...gameInfo]
        newGameInfo[0] = false
        newGameInfo[1] = [0, addressZero, 0]
        newGameInfo[2] = [0, addressZero, 0]
        return newGameInfo
      })
    }
  }, [isStaked, playerAStake, playerBStake])


  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col items-center text-white w-full mt-[10%]'>

          <div className="max-w-lg w-full">

            <Input 
              label="Opponent Address" 
              value={opponentAddress.value}
              onChange={opponentAddress.setValue}
              type="text"/>

            <div className="flex gap-5 text-gray-700 justify-end">
              <div>Staked? </div>
              <Switch checked={isStaked} onChange={setIsStaked} />
            </div>

            { 
              isStaked &&
                <div>
                  <GameStaker stakeInfo={playerAStake} setStakeInfo={setPlayerAStake} />
                  <GameStaker stakeInfo={playerBStake} setStakeInfo={setPlayerBStake} />
                </div>
            }

            <Web3btn onClick={createGame.write} loading={createGame.isLoading}>
              Create Match
            </Web3btn>

          </div>

        </div>
          
      </Container>

      { (open && isConnected) && 
        <GameCreationModal open={open} address={address as Address} />
      }

      <GameCreationModal open={open} address={address as Address} />

    </Layout>
  )
}

