import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";
import { useEffect, useState } from "react";
import useContractAddr from "@/hooks/useContractAddr";
import useChainId from "@/hooks/useChainId";


export default function JoinMatch() {

  const { address } = useAccount()

  const chainId = useChainId()

  const contractAddr = useContractAddr()

  const [battles, setBattles] = useState([])

  const fetchBattles = useContractRead({
    address: contractAddr,
    abi: RPSGameFactory,
    functionName: 'getUserGames',
    args: [address, 1],
    chainId: chainId
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
