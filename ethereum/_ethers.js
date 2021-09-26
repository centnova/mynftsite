const { ethers } = require("ethers");
const providerUrl = "https://rinkeby.infura.io/v3/7c9384544a89408c8a9358b6012bb2aa";

let provider;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
}

export default provider;