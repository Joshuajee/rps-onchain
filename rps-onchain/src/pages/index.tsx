import Container from "@/components/utils/Container";
import GameButton from "@/components/utils/GameButton";
import Layout from "@/components/utils/Layout";
import { useRouter } from "next/router";


export default function Home() {

  const router = useRouter()

  return (
    <Layout>

      <Container>

        <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>

          <GameButton onClick={() => router.push("/match/quick-match")} color='blue'>Quick Game</GameButton>

          <GameButton onClick={() => router.push("/match/create-match")} color={'red'}>Create Game</GameButton>

          <GameButton onClick={() => router.push("/achievements")} color='green'>Achievements</GameButton> 

          <GameButton onClick={() => router.push("/leaderboard")} color='yellow'>Leaderboard</GameButton> 
        
        </div>
        
      </Container>

    </Layout>
  )
}
