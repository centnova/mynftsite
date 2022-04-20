const { ethers } = require("ethers");
const providerUrl = "https://rinkeby.infura.io/v3/7c9384544a89408c8a9358b6012bb2aa";

let provider;
let accounts;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({method: 'eth_requestAccounts'});
    provider = new ethers.providers.Web3Provider(window.ethereum);
    accounts = provider.listAccounts().then( (e) => {
        accounts = e;
        console.log("========== 1 ===========");
        console.log(e);
        }

    );
} else {
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    accounts = provider.listAccounts().then( (e) => {
        accounts = e;
        console.log("========== 2 ===========");
        console.log(e);
        }

    );
}

export default provider;