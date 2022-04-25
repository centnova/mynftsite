import React, {Component, useState} from 'react';
import {UseRouter} from 'next/router';

export default function ChSuccessTransactionForm(ctx) {

    let {
        totalValue,
        tokens,
        etherscanLink
    } = ctx;

    const nftName = "Confused Heroes";

    return (
        <form action="">
            <br/>
            <strong>Congratulations! You just send a tx to mint {tokens} {tokens > 1 && <span>{nftName} NFTs</span> ||
            <span>{nftName} NFT</span>} for {totalValue} ETH.</strong>
            <br/>
            <span style={{"fontSize": "0.9rem"}}><a href={etherscanLink} target="_blank" rel="noreferrer">Check your transaction in etherscan</a></span>
            <div className="col-lg-12 center">
                <button type="submit">WAIT! I WANT TO MINT MORE!</button>
            </div>
        </form>
    );
}
