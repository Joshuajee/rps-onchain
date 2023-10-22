import Container from "@/components/utils/Container";
import Layout from "@/components/utils/Layout";
import { useEffect, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";


const APIURL = "https://api.studio.thegraph.com/query/54658/rps-point-scroll/version/latest"


const QUERY = gql`
  {
    tokenBalances(orderBy: value) {
      id
      receiver
      value
    }
  }
`



export default function Home() {

  const [battles, setBattles] = useState<any[]>([])

  const { data, isLoading, error } = useQuery("launches", () => {
    return request(APIURL, QUERY);
  });


  useEffect(() => {
    if (data) {
      const leaders = (data as any)?.tokenBalances
      setBattles(leaders)
    }
  }, [battles, data])


  if (isLoading || error) return <></>


  return (
    <Layout>

      <Container>

        <div className="flex flex-col items-center justify-center my-20 w-full">

          <h2 className="text-4xl font-bold mb-10">Leaderboard</h2>

          <div className="max-w-lg w-full">

            {
              battles.map((battle) => {
                return (
                  <div key={battle} className="block text-gray-700 text-center border-[1px] border-gray-800 rounded-md p-3 m-2">
                    <h5>{battle.address}</h5>
                    <text className="font-bold">{battle.points} RPST </text>
                  </div>
                )
              })
            }

          </div>

        </div>
        
      </Container>

    </Layout>
  )
}
