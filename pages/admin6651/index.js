import React, {Component} from 'react';
import {useState} from 'react';

import Card from '../../components/card';
import ButtonForm from "../../components/buttonForm";
import InputForm from "../../components/inputForm";

import useWhitelist from "../../lib/useWhitelist";

import provider from '../../ethereum/_ethers'
const {ethers} = require("ethers");
import contract from '../../ethereum/_contract';

// todo events to check for balance changes?

const Admin = ({ saleIsActive, balance, tokenPrice, maxTokenPurchase, baseUri, tokenProvenance, startingIndexBlock,
                   startingIndex, revealTimestamp }) => {
    const maxTokens = 100;
    const [loading, setLoading] = useState(false);
    const [contractUrl, setContractUrl] = useState("")
    const contractAddress = contract.address;
    let network;

    const initialize = async () => {
        network = await provider.getNetwork();
        const _contractUrl = 'https://' + network.name + ".etherscan.io/address/"+contractAddress;
        console.log("1");
        setContractUrl(_contractUrl);
    }

    initialize().then( (e) => {} );

    const toggleSaleState = async (e) => {
        e.preventDefault();
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        setLoading(true);
        try {
            await contractWithSigner.flipSaleState();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const withdraw = async (e)=> {
        e.preventDefault();
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        setLoading(true);
        try {
            await contractWithSigner.withdraw();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const reserveTokens = async (e) => {
        e.preventDefault();
        setLoading(true);
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        try {
            await contractWithSigner.reserveTokens();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const setBaseUri = async (e, value) => {
        e.preventDefault();
        console.log(e);
        console.log(value);

        setLoading(true);
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        try {
            await contractWithSigner.setBaseURI(value);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const setProvenanceHash = async (e, value) => {
        e.preventDefault();
        console.log(e);
        console.log(value);

        setLoading(true);
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        try {
            await contractWithSigner.setProvenanceHash(value);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const setStartingIndex = async (e) => {
        e.preventDefault();
        console.log(e);

        setLoading(true);
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        try {
            await contractWithSigner.setStartingIndex();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const setRevealTimestamp = async (e, value) => {
        e.preventDefault();
        console.log(e);

        setLoading(true);
        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        try {
            await contractWithSigner.setRevealTimestamp(value);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>You need to be an owner to do things here, so this area is not hidden.</p>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Contract Address"
                    value={<a href={contractUrl}>{contractAddress}</a>}
                    description="The address of the contract"
                >
                </Card>

                <Card
                    title="Maximum Tokens"
                    value={maxTokens}
                    description="The maximum tokens the contract permits"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Balance"
                    value={balance}
                    units="ETH"
                    description="The balance held in the contract (in Ether)"
                >
                </Card>

                <Card
                    title="Sale is active"
                    value={saleIsActive && <span>true</span> || <span>false</span>}
                    description="If the sale is currently active"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Token Price"
                    value={tokenPrice}
                    units="ETH"
                    description="The price per token"
                >
                </Card>

                <Card
                    title="Maximum Token Purchase"
                    value={maxTokenPurchase}
                    description="The maximum tokens that can be purchased per transaction"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Base URI"
                    value={baseUri}
                    description="The base URI for the token"
                >
                </Card>

                <Card
                    title="Token Provenance"
                    value={tokenProvenance}
                    description="The Token Provenance"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Starting Index Block"
                    value={startingIndexBlock}
                    description="The Starting Index Block is the block where the starting index will be calculate"
                >
                </Card>

                <Card
                    title="Starting Index"
                    value={startingIndex}
                    description="The Starting Index is the random number that remaps the initial id of the tokens to the token id"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both"}}>
                <Card
                    title="Reveal Timestamp"
                    value={revealTimestamp + " (" +  (new Date(revealTimestamp*1000)).toUTCString() + ")"}
                    description="The timestamp that the reveal will take place"
                >
                </Card>
            </div>

            <div style={{marginLeft: "10px", marginRight: "10px", clear: "both", paddingTop: "20px"}}>

                <ButtonForm
                    action={toggleSaleState}
                    loading={loading}
                    // text= {["Set sale state to ", saleIsActive && <span>false</span> || <span>true</span>]}
                    text = {saleIsActive && <span>false</span> || <span>true</span>}
                    label="Flip Sale State"
                >
                </ButtonForm>

                <ButtonForm
                    action={withdraw}
                    loading={loading}
                    text="Withdraw"
                    label="Withdraw Balance"
                >
                </ButtonForm>

                <ButtonForm
                    action={reserveTokens}
                    loading={loading}
                    text="Reserve"
                    label="Reserve Tokens"
                >
                </ButtonForm>

                <ButtonForm
                    action={setStartingIndex}
                    loading={loading}
                    text="Set"
                    label="setStartingIndex"
                >
                </ButtonForm>

                <InputForm
                    action={setBaseUri}
                    loading={loading}
                    text="Set"
                    label="Set BaseURI"
                >
                </InputForm>

                <InputForm
                        action={setProvenanceHash}
                        loading={loading}
                        text="Set"
                        label="Set Provenance Hash"
                >
                </InputForm>

                <InputForm
                        action={setRevealTimestamp}
                        loading={loading}
                        text="Set"
                        label="Set Reveal Timestamp"
                >
                </InputForm>

            </div>




        </div>
    );
}

Admin.getInitialProps = async (ctx) => {

    const ipData = useWhitelist(ctx.req, ctx.res)

    console.log('=================')
    console.log(provider);
    console.log('=================')
    // console.log(contract);
    const saleIsActive = await contract.saleIsActive();
    const maxTokens = await contract.MAX_TOKENS();
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const json = await res.json()
    // console.log(json)
    // const saleIsActive = true;
    // const maxTokens = 100;
    console.log(saleIsActive);

    let balance = await provider.getBalance(contract.address);
    balance = ethers.utils.formatEther(balance);
    console.log('--------------');
    console.log(balance);
    console.log('--------------');

    let tokenPrice = await contract.tokenPrice();
    let maxTokenPurchase = await contract.maxTokenPurchase();
    maxTokenPurchase = maxTokenPurchase.toNumber();
    let baseUri = await contract.baseURI();
    console.log('++++++++++++++++++')
    console.log(baseUri);
    console.log('++++++++++++++++++')
    let tokenProvenance = await contract.TOKEN_PROVENANCE();
    console.log('!!!!!!!!!!!!!!!!!')
    console.log(tokenProvenance);
    console.log('!!!!!!!!!!!!!!!!!')

    tokenPrice = ethers.utils.formatEther(tokenPrice);
    console.log(maxTokenPurchase);

    let startingIndexBlock = await contract.startingIndexBlock();
    startingIndexBlock = startingIndexBlock.toNumber();
    let startingIndex = await contract.startingIndex();
    startingIndex = startingIndex.toNumber();
    console.log("@@@@@@@@@@@@@@@@@@@@@@")
    console.log(startingIndexBlock);
    console.log(startingIndex);
    console.log("@@@@@@@@@@@@@@@@@@@@@@")

    let revealTimestamp = await contract.REVEAL_TIMESTAMP();
    revealTimestamp = revealTimestamp.toNumber();

    // maxTokenPurchase = 20;

    // todo:
    // todo TOKEN_PROVENANCE DONE
    // todo startingIndexBlock DONE
    // todo startingIndex DONE
    // REVEAL_TIMESTAMP
    // todo baseURI DONE
    // See constructor details (how the contract was initialized)
    // todo reserveTokens() DONE
    // setRevealTimestamp()
    // todo setProvenanceHash() DONE
    // todo setBaseURI() DONE
    // _baseURI - no need to implement it is an override for the tokenURI
    // todo mintToken - not that one - this will be on the mint page
    // todo setStartingIndex DONE
    // emergencySetStartingIndexBlock

    return { saleIsActive, balance, tokenPrice, maxTokenPurchase, baseUri, tokenProvenance, startingIndexBlock,
    startingIndex, revealTimestamp, ipData};
}


export default Admin