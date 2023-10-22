import AchievementCard from "@/components/utils/AchievementCard";
import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";

export default function Home() {

  return (
    <Layout>

      <Container>

        <div className='flex flex-grow flex-col gap-5 justify-center items-center text-white w-full my-20'>
          
          <AchievementCard achievementType="rps-br" />

          <AchievementCard achievementType="rps-f" />

          <AchievementCard achievementType="rps-s" />

          <AchievementCard achievementType="rps-w" />

          <AchievementCard achievementType="rps-sh" />

          <AchievementCard achievementType="rps-b" />

          <AchievementCard achievementType="rps-gen" />

          <AchievementCard achievementType="rps-war" />

          <AchievementCard achievementType="rps-king" />
        
        </div>
        
      </Container>

    </Layout>
  )
}
