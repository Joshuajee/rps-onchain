import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi'
import { polygonZkEvmTestnet, scrollTestnet, hardhat } from 'wagmi/chains'
import { createPublicClient, http } from 'viem';
 
const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonZkEvmTestnet, scrollTestnet, hardhat],
  [publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, [])

  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar={true} position="bottom-right" />
    </WagmiConfig> 
  )
}
