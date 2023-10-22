import AchievementCard from "@/components/utils/AchievementCard";
import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import useContractAddr from "@/hooks/useContractAddr";
import { useAccount, useChainId, useContractRead } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";

export default function Achievement() {

  const { address } = useAccount()

  const contract = useContractAddr()

  const chainId = useChainId()

  const achievementManagerAddress = useContractRead({
    address: contract,
    abi: RPSGameFactory,
    functionName: 'achievementManagerAddress',
    chainId: chainId
  })

  const gamerProfile = useContractRead({
    address: contract,
    abi: RPSGameFactory,
    functionName: 'gamerProfile',
    chainId: chainId,
    args: [address]
  })

  console.log(gamerProfile)

  const wins = (gamerProfile?.data as any)?.[2]

  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col gap-5 justify-center items-center text-white w-full my-20'>
          
          <AchievementCard uniqueVictories={wins} achievementType="rps-br" manager={achievementManagerAddress.data} />

          <AchievementCard uniqueVictories={wins} achievementType="rps-f" manager={achievementManagerAddress.data}/>

          <AchievementCard uniqueVictories={wins} achievementType="rps-s" manager={achievementManagerAddress.data}/>

          <AchievementCard uniqueVictories={wins} achievementType="rps-w" manager={achievementManagerAddress.data}/>

          <AchievementCard uniqueVictories={wins} achievementType="rps-sh" manager={achievementManagerAddress.data}/>

          <AchievementCard uniqueVictories={wins} achievementType="rps-b" manager={achievementManagerAddress.data}/>

          <AchievementCard uniqueVictories={wins} achievementType="rps-gen" manager={achievementManagerAddress.data} />

          <AchievementCard uniqueVictories={wins} achievementType="rps-war" manager={achievementManagerAddress.data} />

          <AchievementCard uniqueVictories={wins} achievementType="rps-king" manager={achievementManagerAddress.data} />
        
        </div>
        
      </Container>

    </Layout>
  )
}
