import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import dotenv from 'dotenv'

dotenv.config()

// import "@nomiclabs/hardhat-etherscan";

const PRIVATE_KEY = String(process.env.PRIVATE_KEY)
const PRIVATE_KEY_LOCAL = String(process.env.PRIVATE_KEY_LOCAL)

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  abiExporter: [
		{
			path: '../rps-onchain/src/abi',
			pretty: false,
			runOnCompile: true,
      		only: [":RPS"],
		}
	],
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: false,
		runOnCompile: true,
		strict: true,
    	only: [":RPS"],
	},
	networks: {
		polygon_zkevm: {
			url: "https://rpc.public.zkevm-test.net",
			accounts: [PRIVATE_KEY]
		},
		scroll_sepolia: {
			url: "https://sepolia-rpc.scroll.io",
			accounts: [PRIVATE_KEY]
		}
		
	},
};

export default config;
