import providerServer from './_ethersServer'
const {ethers} = require("ethers");

const abi = require('./abi.json');
const contractAddress = "0xcc57c041d73ff1d8323867f4cdb8a5645ac447b7";

const contract = new ethers.Contract(contractAddress, abi, providerServer);
export default contract;
