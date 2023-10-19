import Container from "@/components/utils/Container";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import useInput from "@/hooks/useInput";
import { MAIN_CONTRACT } from "@/libs/constants";
import { Address, useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import GameCreationModal from "@/components/modals/GameCreationModal";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import GameStaker from "@/components/utils/GameStaker";

export type IGameInfo = [
  boolean,
  [number, Address, number],
  [number, Address, number]
]

const addressZero = ethers.ZeroAddress as Address

const initalGameInfo: IGameInfo = [
  false,
  [0, addressZero, 10],
  [0, addressZero, 10]
]

export default function JoinMatch() {

  const [open, setOpen] = useState(false)

  const [gameInfo, setGameInfo] = useState<IGameInfo>(initalGameInfo)

  const { address, isConnected } = useAccount()

  const opponentAddress = useInput("address")

  const createGame = useContractWrite({
    address: MAIN_CONTRACT as Address,
    abi: RPSGameFactory,
    functionName: 'createGame',
    args: [address, opponentAddress.value, gameInfo],
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


  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col justify-center items-center text-white w-full'>

          <div className="max-w-lg w-full">

            <Input 
              label="Opponent Address" 
              value={opponentAddress.value}
              onChange={opponentAddress.setValue}
              type="text"/>

            <div>

            

            </div>

            <GameStaker />

            <GameStaker />



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

