import Container from "@/components/utils/Container";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import { MAIN_CONTRACT } from "@/libs/constants";
import { useRouter } from "next/router";
import { Address, useAccount, useContractRead, useContractWrite } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import GameCreationModal from "@/components/modals/GameCreationModal";
import { toast } from "react-toastify";
import Link from "next/link";

export default function JoinMatch() {

  const { address } = useAccount()

  const [battles, setBattles] = useState([])

  const router = useRouter()

  const fetchBattles = useContractRead({
    address: MAIN_CONTRACT as Address,
    abi: RPSGameFactory,
    functionName: 'getUserGames',
    args: [address, 1],
  })

  useEffect(() => {
    if (fetchBattles.data) {
      setBattles(fetchBattles.data as any)
    }
  }, [fetchBattles.data])

  console.log(fetchBattles)





  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col justify-center items-center text-white w-full'>

          <div className="max-w-lg w-full">

   
          </div>

        </div>
          
      </Container>

    </Layout>
  )
}
