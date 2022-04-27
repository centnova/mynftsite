const { ethers } = require("ethers");

import {providerUrls} from "./blockchain";

// Round Robin Selection
const providerUrl = providerUrls[Math.floor(Math.random() * providerUrls.length)];

const providerServer = new ethers.providers.JsonRpcProvider(providerUrl);

console.log(`Will use provider ${providerUrl}`);

export default providerServer;