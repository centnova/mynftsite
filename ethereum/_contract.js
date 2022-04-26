import providerServer from './_ethersServer'
const {ethers} = require("ethers");

const abi = require('./abi.json');
// const contractAddress = "0x56561C096E3c9721E1F5C4E5AA83D5a3A2CBF7c7";
// const contractAddress = "0xd5c3F96fF90bEFf71c89D96593e0B7bF16305822";
// const contractAddress = "0xDED8331379c45A59C8535Ad69fAFe00e64bb2618";
// const contractAddress = "0x483f86ba1113cdfcd6b1fbe1e7e633670e875692";
const contractAddress = "0x27e4bf65cb4449880e5368d077078bb3d996d6d0";


const contract = new ethers.Contract(contractAddress, abi, providerServer);
export default contract;
