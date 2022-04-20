const { ethers } = require("ethers");
const providerUrl = "https://rinkeby.infura.io/v3/7c9384544a89408c8a9358b6012bb2aa";

let providerServer;
providerServer = new ethers.providers.JsonRpcProvider(providerUrl);

export default providerServer;