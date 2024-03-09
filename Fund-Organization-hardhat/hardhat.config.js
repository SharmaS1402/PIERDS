require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
require("chai");

/** @type import('hardhat/config').HardhatUserConfig */

const Sepolia_RPC_URL = process.env.Sepolia_RPC_URL ;
const Private_Key = process.env.PRIVATE_KEY ; 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY;
module.exports = {
  // defaultNetwork : "hardhat",
  networks : {
    hardhat : {
      chainId : 31337,
    },
    sepolia : {
      url : Sepolia_RPC_URL,
      accounts : [Private_Key],
      chainId : 11155111,
      blockConfirmations : 6 
    }
  },

  etherscan : {
    apiKey : ETHERSCAN_API_KEY,
  },
  gasReporter : {
    enabled : true,
    outputFile : "gasReport.txt",
    noColors : true,
    currency : "USD",
    // coinmarketcap : COINMARKET_API_KEY
  },
  namedAccounts : {
    deployer : {
      default : 0
    },
    user : {
      default : 1
    }
  },
  // solidity: "0.8.8",
  solidity : {
    compilers : [
      {version : "0.8.8"},
      {version : "0.6.6"},
    ]
  },
};
