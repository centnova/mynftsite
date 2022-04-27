const chain = "rinkeby";

const contracts = {
    "rinkeby": "0x27e4bf65cb4449880e5368d077078bb3d996d6d0",
    "mainnet": "0xcc57c041d73ff1d8323867f4cdb8a5645ac447b7"
};

const providerUrlsAllChains =
    {
        "rinkeby": [
            "https://rinkeby.infura.io/v3/5eeb9a6e5ea54382aaa5d581f5712462",
            "https://eth-rinkeby.alchemyapi.io/v2/bE2DEN2aXY1HCz-ntm3-Hs53dhHlOkLU"
        ],
        "mainnet": [
            "https://mainnet.infura.io/v3/e810ba6a4ded47b7a58141a764d7c08d",
            "https://eth-mainnet.alchemyapi.io/v2/46Y8zeWZumOiOkVRN9hH6UjRCWwXx-eO"
        ]
    };

console.log(`We are connected to ${chain}`);

const providerUrls = providerUrlsAllChains[chain.toLowerCase()];
const contractAddress = contracts[chain.toLowerCase()]

export {contractAddress, providerUrls};
