import AchievementCard from "@/components/utils/AchievementCard";
import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import useContractAddr from "@/hooks/useContractAddr";
import { useChainId, useContractRead } from "wagmi";
import RPSGameFactory from "@/abi/contracts/src/RPSGameFactory.sol/RPSGameFactory.json";

export default function Achievement() {

  const contract = useContractAddr()

  const chainId = useChainId()

  const achievementManagerAddress = useContractRead({
    address: contract,
    abi: RPSGameFactory,
    functionName: 'achievementManagerAddress',
    chainId: chainId
  })


 console.log(achievementManagerAddress)

  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col gap-5 justify-center items-center text-white w-full my-20'>
          
          <AchievementCard achievementType="rps-br" manager={achievementManagerAddress.data} />

          <AchievementCard achievementType="rps-f" manager={achievementManagerAddress.data}/>

          <AchievementCard achievementType="rps-s" manager={achievementManagerAddress.data}/>

          <AchievementCard achievementType="rps-w" manager={achievementManagerAddress.data}/>

          <AchievementCard achievementType="rps-sh" manager={achievementManagerAddress.data}/>

          <AchievementCard achievementType="rps-b" manager={achievementManagerAddress.data}/>

          <AchievementCard achievementType="rps-gen" manager={achievementManagerAddress.data} />

          <AchievementCard achievementType="rps-war" manager={achievementManagerAddress.data} />

          <AchievementCard achievementType="rps-king" manager={achievementManagerAddress.data} />
        
        </div>
        
      </Container>

    </Layout>
  )
}
