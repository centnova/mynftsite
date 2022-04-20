import providerServer from './_ethersServer'
const {ethers} = require("ethers");

const abi = require('./abi.json');
const contractAddress = "0x9B7dA9750dCfAe40c134fD574335B501DfED8Ae3";

const contract = new ethers.Contract(contractAddress, abi, providerServer);
export default contract;
