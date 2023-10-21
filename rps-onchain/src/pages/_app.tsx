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
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar={true}  />
    </WagmiConfig> 
  )
}
