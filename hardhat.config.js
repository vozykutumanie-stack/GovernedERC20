require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { OPTIMISM_RPC, DEPLOYER_KEY, OPTIMISM_ETHERSCAN_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    optimism: {
      url: OPTIMISM_RPC || "https://mainnet.optimism.io",
      chainId: 10,
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : []
    },
    hardhat: {
      chainId: 1337
    }
  },
  etherscan: {
    apiKey: {
      optimism: OPTIMISM_ETHERSCAN_KEY || ""
    }
  }
};
