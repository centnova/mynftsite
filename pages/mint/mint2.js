import React, {Component, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import provider from "../../ethereum/_ethers";
const {ethers} = require("ethers");
import contract from "../../ethereum/_contract";
import MintForm from '../../components/mintForm';
import SuccessTransactionForm from '../../components/successTransactionForm'

import logoImage from  '../../public/img/logo.png';

export default function Mint( {maxTokens, tokenPrice, maxTokenPurchase, totalSupply, networkName} ) {

    // comment out for now
    // let provider;
    const calcTotalValue = (_tokens, _tokenPrice) => {
        let _totalValue = _tokens * _tokenPrice;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)
        return(_totalValue)
    }
    const initialTokens = 1;
    const [tokens, setTokens] = useState(initialTokens);
    const [totalValue, setTotalValue] = useState(calcTotalValue(initialTokens, tokenPrice));
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [etherscanLink, setEtherscanLink] = useState('');
    const [account, setAccount] = useState('');

    const router = useRouter();

    let changeTokens = async (event) => {
        let _tokens = Math.abs(parseFloat(event.target.value));
        if (_tokens <= 1) _tokens = 1;
        if (_tokens > 12) _tokens = 12;
        setTokens(_tokens);
        setTotalValue(_tokens * 0.05);
    }

    let stepUp = async (e) => {
        // todo check if we have a wallet connected - if not try to connect the wallet
        let _tokens = tokens;
        if (_tokens > maxTokenPurchase - 1)
            return;
        _tokens += 1;
        setTokens(_tokens);

        let _totalValue = _tokens * tokenPrice;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)
        setTotalValue(_totalValue);
    }

    let stepDown = async (e) => {
        let _tokens = tokens;
        if (_tokens < 2)
            return;
        _tokens -= 1;
        setTokens(_tokens);
        let _totalValue = _tokens * tokenPrice;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)
        setTotalValue(_totalValue);
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

            // @todo if sale is not active display a message here
            // let saleIsActive = await contract.saleIsActive();
            // if (!saleIsActive) {
            //     console.log("Sale is not active");
            //     return;
            // }

            const signer = provider.getSigner();
            const sendWithSigner = contract.connect(signer);

            const weiValue = ethers.utils.parseEther(totalValue.toString());
            console.log(weiValue);
            const transaction = await sendWithSigner.mintToken(tokens, {value: weiValue});
            console.log(`Minted ${tokens} for a total of ${totalValue}`);
            const receipt = await transaction.wait();
            console.log(receipt)
            const _contractUrl = 'https://' + networkName + ".etherscan.io/tx/"+receipt['transactionHash'];
            setEtherscanLink(_contractUrl);
            setSuccessMessage(true);
        } catch (err) {
            setErrorMessage(err.message);
            console.log(err.message);
            console.log('---------------------');
        }
        setLoading(false);
    };

    const connectWallet = async (e) => {
        console.log("Connecting wallet");
        console.log(provider);
        // window.ethereum.request({method: 'eth_requestAccounts'});
        // provider = await (new ethers.providers.Web3Provider(window.ethereum));
        const provider = new ethers.Web3Provider(ethers.web3.currentProvider);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner(0);
        console.log(signer);

        // if (signer === undefined) setAccount(signer.)
        console.log(provider);
    }




    return (
        <div>
            <Head>
                {/*            */}
                {/*	*/}
                {/* oooooooo8                         o888  o888  o888  oooo                               oooo        */}
                {/*888        ooooooooo    ooooooooo8  888   888   888   888ooooo     ooooooo     ooooooo   888  ooooo */}
                {/* 888oooooo  888    888 888oooooo8   888   888   888   888    888 888     888 888     888 888o888    */}
                {/*        888 888    888 888          888   888   888   888    888 888     888 888     888 8888 88o   */}
                {/*o88oooo888  888ooo88     88oooo888 o888o o888o o888o o888ooo88     88ooo88     88ooo88  o888o o888o */}
                {/*           o888                                                                                     */}


                {/*	*/}
                <meta httpEquiv="content-type" content="text/html; charset=utf-8"/>
                <meta name="author" content="Spelllbook"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no"/>
                <link rel="icon" href="../img/favicon.png"/>
                <title>Spelllbook Mint</title>
                <style>
                </style>

            </Head>



                {/*Document Wrapper*/}
                <div id="wrapper" className="clearfix">

                    {/*Header*/}
                    <header id="header-not-using-it-for-now" className="full-header transparent-header dark">
                        <div id="header-wrap">
                            <div className="container">
                                <div className="header-row">

                                    {/*Logo*/}
                                    <div id="logo">
                                        <a href="index.html" className="standard-logo" data-dark-logo="../img/logo.png"><Image
                                            src={logoImage} alt="Spelllbook"/></a>
                                        <a href="index.html" className="retina-logo"
                                           data-dark-logo="../img/logo.png"><Image src={logoImage}
                                                                                 alt="Spelllbook"/></a>
                                    </div>
                                    {/*#logo end*/}
                                    <div className="header-misc">
                                        <a href="#" className="inline-block " style={{"paddingRight": "6px"}}>
                                            <i className="fab fa-twitter fa-lg spelll"></i>

                                        </a> <i className="inline-block"> </i>

                                        <a href="#" className="inline-block " style={{"paddingRight": "5px"}}>
                                            <i className="fab fa-discord fa-lg spelll"></i>

                                        </a>
                                        <a href="#" className="button button-border rounded-pill "><span
                                            className="spelll" onClick={connectWallet}>CONNECT WALLET</span></a>


                                    </div>


                                    {/*Primary Navigation*/}


                                </div>
                            </div>
                        </div>
                        <div className="header-wrap-clone"></div>
                    </header>
                    {/*#header end*/}

                    {/*Slider*/}

                    {/*Slider*/}
                    <section id="slider" className="slider-element slider-parallax min-vh-100 dark include-header">
                        <div className="slider-inner" style={{"backgroundImage": "url('../img/bgmain.jpg')"}}>

                            <div className="vertical-middle slider-element-fade">
                                <div className="container text-center">


                                    <div className="form-widget">


                                        <div className="form-result"></div>
                                        {successMessage ||
                                            <MintForm
                                                totalValue={totalValue}
                                                tokens={tokens}
                                                maxTokenPurchase={maxTokenPurchase}
                                                tokenPrice={tokenPrice}
                                                stepUp={stepUp}
                                                stepDown={stepDown}
                                                onSubmit={onSubmit}
                                                totalSupply={totalSupply}
                                                maxTokens={maxTokens}
                                                loading={loading}
                                            ></MintForm>
                                        }

                                        {successMessage &&
                                            <SuccessTransactionForm
                                                totalValue={totalValue}
                                                tokens={tokens}
                                                maxTokenPurchase={maxTokenPurchase}
                                                tokenPrice={tokenPrice}
                                                stepUp={stepUp}
                                                stepDown={stepDown}
                                                onSubmit={onSubmit}
                                                totalSupply={totalSupply}
                                                maxTokens={maxTokens}
                                                etherscanLink={etherscanLink}
                                            ></SuccessTransactionForm>
                                        }

                                    </div>


                                </div>
                            </div>

                            <div className="video-wrap">
                                <div className="video-overlay" style={{"background": "rgba(0,0,0,0.75)"}}></div>
                            </div>

                        </div>
                    </section>
                    {/*#slider end*/}

                    {/*Footer*/}
                    <footer id="footer" className="dark" style={{"backgroundColor": "#121212", "padding": "60px 0"}}>

                        <div className="container clearfix">

                            {/*Footer Widgets*/}
                            <div className="footer-widgets-wrap center clearfix">

                                <Image src={logoImage} width="150" alt="Spelllbook"/>

                                <div className="topmargin-lg clearfix ">


                                    <a href="#" className="inline-block si-borderless" style={{"paddingRight": "6px"}}>
                                        <i className="fab fa-twitter fa-2x"></i>

                                    </a>
                                    <i className="inline-block"> </i>

                                    <a href="#" className="inline-block ">
                                        <i className="fab fa-discord fa-2x"></i>

                                    </a>
                                </div>

                                <div className="text-uppercase ls3"
                                     style={{"color": "#333", "marginTop": "10px"}}>&copy; Spelllbook 2021. All Rights
                                    Reserved.
                                </div>

                            </div>

                        </div>

                    </footer>
                    {/*#footer end*/}
                </div>
                {/*#wrapper end*/}

                {/*Go To Top*/}
                <div id="gotoTop" className="icon-angle-up"></div>


            </div>
    );
}


Mint.getInitialProps = async (ctx) => {

    let maxTokens = await contract.MAX_TOKENS();
    let tokenPrice = await contract.tokenPrice();
    let maxTokenPurchase = await contract.maxTokenPurchase();
    let totalSupply = await contract.totalSupply();
    maxTokenPurchase = maxTokenPurchase.toNumber();
    totalSupply = totalSupply.toNumber();
    // tokenPrice = 0.04;
    maxTokens = maxTokens.toNumber();
    tokenPrice = parseFloat(ethers.utils.formatEther(tokenPrice));
    const network = await provider.getNetwork()
    const networkName = network.name;
    return {maxTokens, tokenPrice, maxTokenPurchase, totalSupply, networkName}
}