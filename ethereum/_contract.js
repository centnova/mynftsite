import providerServer from './_ethersServer'
const {ethers} = require("ethers");

const abi = require('./abi.json');
// const contractAddress = "0x56561C096E3c9721E1F5C4E5AA83D5a3A2CBF7c7";
const contractAddress = "0xd5c3F96fF90bEFf71c89D96593e0B7bF16305822";

const contract = new ethers.Contract(contractAddress, abi, providerServer);
export default contract;
