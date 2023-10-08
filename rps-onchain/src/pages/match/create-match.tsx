import Container from "@/components/utils/Container";
import GameButton from "@/components/utils/GameButton";
import Input from "@/components/utils/Input";
import Layout from "@/components/utils/Layout";
import Web3btn from "@/components/utils/Web3btn";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/router";


export default function CreateMatch() {

  const router = useRouter()

  const opponentAddress = useInput("address")

  return (
    <Layout>

      <Container>

        <div data-aos="fade-up" className='flex flex-grow flex-col justify-center items-center text-white w-full'>


          <div className="max-w-lg w-full">

            <Input 
              label="Opponent Address" 
              value={opponentAddress.value}
              onChange={opponentAddress.setValue}
              type="text"

              />


            <Web3btn>
              Create Match
            </Web3btn>




          </div>


        </div>
        
      </Container>

    </Layout>
  )
}
