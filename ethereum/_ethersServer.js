const { ethers } = require("ethers");
const providerUrl = "https://rinkeby.infura.io/v3/5eeb9a6e5ea54382aaa5d581f5712462";

let providerServer;
providerServer = new ethers.providers.JsonRpcProvider(providerUrl);

export default providerServer;