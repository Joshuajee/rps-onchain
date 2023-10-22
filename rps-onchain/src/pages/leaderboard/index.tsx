import Container from "@/components/utils/Container";
import { createClient } from 'urql'
import Layout from "@/components/utils/Layout";
import { useEffect, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";


const APIURL = "https://api.studio.thegraph.com/query/54658/rps-point-scroll/version/latest"

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
});


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


  // const battles: any[] = [
  //   {address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", points: 100},
  //   {address: "0xA6D6d7c556ce6Ada136ba32Dbe530993f128CA44", points: 70},
  //   {address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", points: 50},
  //   {address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", points: 20},
  // ]

  console.log(data)





  if (isLoading || error) return <></>


  return (
    <Layout>

      <Container>

        <div className="flex flex-col items-center justify-center my-20 w-full">

          <h2 className="text-4xl font-bold mb-10">Leaderboard</h2>

          <div className="max-w-lg w-full">

            <ApolloProvider client={client}>

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

            </ApolloProvider>

          </div>

        </div>
        
      </Container>

    </Layout>
  )
}
