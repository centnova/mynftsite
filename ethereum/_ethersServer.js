const { ethers } = require("ethers");

const providerUrls = [
    "https://mainnet.infura.io/v3/e810ba6a4ded47b7a58141a764d7c08d",
    "https://eth-mainnet.alchemyapi.io/v2/46Y8zeWZumOiOkVRN9hH6UjRCWwXx-eO"
]

// Round Robin Selection
const providerUrl = providerUrls[Math.floor(Math.random() * providerUrls.length)];

const providerServer = new ethers.providers.JsonRpcProvider(providerUrl);

console.log(`Will use provider ${providerUrl}`);

export default providerServer;