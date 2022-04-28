import React, {Component} from 'react';
import styles from "../styles/minting.module.css";


export default function ChMintForm(ctx) {
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
            <div className={styles.under}>{saleMessage}</div>
            <br/>
            <div className={styles.number}>
                <button className={styles.roundButton} onClick={decreaseTokens}>-</button>
                <input type="text" className={styles.mintnum} readOnly value={tokens}/>
                <button className={styles.roundButton} onClick={increaseTokens}>+</button>
            </div>
            <br/>
            <div className={styles.under}>Total {totalValue} ETH + gas fees</div>
            <br/><br/><br/>
            {
                connected
                    ?
                    <button className={styles.mintme} type="button" onClick={onSubmit}>{loading?"BUSY":"MINT"}</button>
                    :
                    <button className={styles.mintme} type="button" onClick={onConnect}>{loading?"BUSY":"CONNECT"}</button>
            }
            <br/><br/><br/><br/>
            {
                connected
                    ?
                    <div>
                        <div className={styles.under}><div className={styles.wrapWallet}>Connected Wallet:<br/>{account}</div></div>
                    </div>
                    :
                    undefined
            }
            <br/><br/><br/><br/><br/><br/><br/>
            <div className={styles.under}
                 style={{fontSize: "14px", fontFamily: "Poppins"}}>Please make sure
                you are connected to the right network (Ethereum Mainnet) and
                the correct address. Please note: Once you make the purchase,
                you cannot undo this action.
            </div>
            <br/>
        </div>
    );
}
