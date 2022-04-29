import React, {Component} from 'react';
import styles from "../styles/minting.module.css";


export default function ChMintStop(ctx) {
    let {
        saleMessage,
        totalValue,
        tokens,
        decreaseTokens,
        increaseTokens,
        onSubmit,
        totalSupply,
        maxSupply,
        loading,
        connected,
        onConnect,
        account
    } = ctx;

    return (
        <div className={loading ? styles.isdisabled : ""}>
            <div className={styles.under}>The Sale Has Stopped.</div>
            <br/>

            <br/>
            <br/><br/><br/>
            {
                <button className={styles.mintme} type="button"><a href="https://discord.gg/ConfusedHeroes">Join Discord</a></button>
            }
            <br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            <br/><br/>
            <br/>
        </div>
    );
}
