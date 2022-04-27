import providerServer from './_ethersServer'
const {ethers} = require("ethers");
import {contractAddress} from "./blockchain";

const abi = require('./abi.json');

const contract = new ethers.Contract(contractAddress, abi, providerServer);
export default contract;
