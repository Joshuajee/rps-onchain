import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
// import "@nomiclabs/hardhat-etherscan";

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
};

export default config;
