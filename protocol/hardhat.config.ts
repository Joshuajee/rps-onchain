import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
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
		// fuji: {
		// 	url: 'https://api.avax-test.network/ext/C/rpc',
		// 	accounts: [ PRIVATE_KEY ]
		// },
		// mumbai: {
		// 	url: 'https://polygon-mumbai.g.alchemy.com/v2/1yHVzG9cEm8g0IJKQA0VO-nczdGW4NgO',
		// 	accounts: [ PRIVATE_KEY ]
		// },
		// ginache: {
		// 	url: 'http://127.0.0.1:7545',
		// 	accounts: [ PRIVATE_KEY_LOCAL ]
		// },
		
	},
};


//HTTP://127.0.0.1:7545
export default config;
