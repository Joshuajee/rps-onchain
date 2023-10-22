import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { useEffect, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import convert from 'ethereum-unit-converter'


const POLYGON_ZK_URL = "https://api.studio.thegraph.com/query/54658/rps-point-polygonzkevm/version/latest"


const SCROLL_ZK_URL = "https://api.studio.thegraph.com/query/54658/rps-point-scroll/version/latest"


const QUERY = gql`
{
  tokenBalances(orderBy:value, orderDirection: desc) {
    id
    receiver
    value
  }
}
`



type NetworkType = "polygon zkevm testnet" | "scroll testnet"

export default function Home() {

  const [network, setNetwork] = useState<NetworkType>("polygon zkevm testnet")

  const [battles, setBattles] = useState<any[]>([])

  const [url, setUrl] = useState(POLYGON_ZK_URL)

  const { data, isLoading, error } = useQuery("launches", () => {
    return request(url, QUERY);
  });


  useEffect(() => {
    if (data) {
      const leaders = (data as any)?.tokenBalances
      setBattles(leaders)
    }
  }, [battles, data])

  useEffect(() => {

    if (network === "scroll testnet") {
      setUrl(SCROLL_ZK_URL)
    } else {
      setUrl(POLYGON_ZK_URL)
    }
    
  }, [network])

  console.log( { data, isLoading, error } )


  if (error) return <></>


  return (
    <Layout>

      <Container>

        <div className="flex flex-col items-center justify-center my-20 w-full">

          <h2 className="text-4xl font-bold mb-10">Leaderboard</h2>

            <select onChange={(e) => setNetwork(e.target.value as NetworkType)} id="asset-type" className="w-60 h-12 p-4 my-2 rounded-lg outline-none " >
              <option value={"polygon zkevm testnet"}> polygon zkevm testnet </option>               
              <option value={"scroll testnet"}> scroll testnet </option>
            </select>

            {
               isLoading ?
              <p>Loading...</p>
               :   
              <div className="max-w-lg w-full">

                {
                  battles.map((battle) => {
                    return (
                      <div key={battle.id} className="block text-gray-700 text-center border-[1px] border-gray-800 rounded-md p-3 m-2">
                        <h5>{battle.receiver}</h5>
                        <text className="font-bold">{ convert(battle.value, "wei").ether} RPST </text>
                      </div>
                    )
                  })
                }

              </div>
            }

        </div>
        
      </Container>

    </Layout>
  )
}
