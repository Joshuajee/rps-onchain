import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { publicProvider } from 'wagmi/providers/public'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonZkEvmTestnet, hardhat, scrollSepolia } from 'wagmi/chains'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
 
const { publicClient, webSocketPublicClient } = configureChains(
  [scrollSepolia, polygonZkEvmTestnet, hardhat],
  [publicProvider()],
)
 
const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
})

export default function App({ Component, pageProps }: AppProps) {


  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, [])

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} hideProgressBar={true}  />
      </QueryClientProvider>
    </WagmiConfig> 
  )
}
