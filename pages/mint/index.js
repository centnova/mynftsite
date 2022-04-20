import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, {Component} from 'react';
import {useState} from 'react';
import provider from '../../ethereum/_ethers'

import useWhitelist from '../../lib/useWhitelist'

const {ethers} = require("ethers");
import contract from '../../ethereum/_contract';

const Mint = props => {

    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.05);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    let changeTokens = async (event) => {
        let _tokens = Math.abs(parseFloat(event.target.value));
        if (_tokens <= 1) _tokens = 1;
        if (_tokens > 12) _tokens = 12;
        setTokens(_tokens);
        let _totalValue = _tokens * 0.05;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)
        setTotalValue(_tokens * 0.05);
    }

    let onSubmit = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        setLoading(true);
        try {
            let abi = [
                "function symbol() view returns (string)"
            ];


            const accounts = await provider.getSigner();
            console.log(contract);
            const symbol = await contract.symbol();
            const maxMyNFTTokens = await contract.MAX_TOKENS();
            console.log(accounts);
            console.log(symbol);
            console.log(maxMyNFTTokens);

            let saleIsActive = await contract.saleIsActive();

            const signer = provider.getSigner();
            const sendWithSigner = contract.connect(signer);

            if (!saleIsActive) {
                console.log("Flipping sale state");
                await sendWithSigner.flipSaleState();
            } else {
                console.log("Sale is active");
            }

            const weiValue = ethers.utils.parseEther(totalValue.toString());
            console.log(weiValue);
            await sendWithSigner.mintToken(tokens, {value: weiValue});
            console.log(`Minted ${tokens} for a total of ${totalValue}`);

            // Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
            console.log(err.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <h3>Mint some Tokens!</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor="tokens">Tokens </label>
                <input id="tokens" type="number" value={tokens} onChange={event => changeTokens(event)}/>
                <input value={(Math.round(totalValue * 100) / 100).toFixed(2)} readOnly/>
                <button>Mint the Tokens!</button>
            </form>
        </div>
    );
}

Mint.getInitialProps = async({req, res}) => {
    const ipData = useWhitelist(req, res)
    return ipData
}

export default Mint