const networkConfig = {
    11155111 : {
        name : "sepolia",
        ethUsdPriceFeed : "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",

    }
}

const developmentChains = ["hardhat","localhost"];
const DECIMALS = 8;
const INIT_ANSWER = 200000000000;
module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INIT_ANSWER
}