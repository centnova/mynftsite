const { ethers } = require("ethers");
const providerUrl = "https://mainnet.infura.io/v3/e810ba6a4ded47b7a58141a764d7c08d";

let providerServer;
providerServer = new ethers.providers.JsonRpcProvider(providerUrl);

export default providerServer;