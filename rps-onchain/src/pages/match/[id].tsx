import Card from "@/components/game/Card";
import GameArena from "@/components/game/GameArena";
import OptionCard from "@/components/game/OptionCard";
import PlayOptions from "@/components/game/PlayOptions";
import PlayerCards from "@/components/game/PlayerCards";
import Container from "@/components/utils/Container";
import GameButton from "@/components/utils/GameButton";
import Layout from "@/components/utils/Layout";
import { PLAYER_MOVE } from "@/libs/constants";
import { useRouter } from "next/router";
import { useContractWrite } from "wagmi";


export default function Match() {

  const router = useRouter()

  const play = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: (router.query.id) as any,
    abi: RPSGame,
    functionName: 'createGame',
    args: [],
    // chainId: originChainId,
})

  return (
    <Layout>

      <Container>

        <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white  w-full'>
          <div className="rounded-lg flex flex-col bg-red-800 h-[80vh] w-4/5">

            <div className="flex grow justify-between p-6">

              <Card card={PLAYER_MOVE.PAPER} />

              <div>


              </div>

              <Card card={PLAYER_MOVE.SCISSORS} />

            </div>

            <div className="p-6">
              <PlayOptions />
            </div>
         
          </div>
        </div>
        
      </Container>

    </Layout>
  )
}
