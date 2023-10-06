import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
 
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
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
