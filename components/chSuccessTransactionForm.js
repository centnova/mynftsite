import React, {Component, useState} from 'react';
import styles from "../styles/minting.module.css";

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
            <div className={styles.under}>Congratulations! You have successfully minted {tokens} {tokens > 1 &&
            <span>{nftName} NFTs</span> ||
            <span>{nftName} NFT</span>} for {totalValue} ETH.
            </div>
            <br/><br/>

            <br/><br/><br/>
            <button className={styles.mintme} type="submit">I WANT TO MINT MORE!</button>
        </form>
    );
}
