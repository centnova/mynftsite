import React, { Component } from 'react';
import styles from "../styles/minting.module.css";


export default function chMintForm(ctx) {
        let {saleMessage, totalValue, tokens, decreaseTokens, increaseTokens, onSubmit, totalSupply, maxSupply} = ctx;
        console.log("loggggggg: " +  ctx);

    return(
        <div>
                                <div className={styles.under}>{saleMessage}</div>
            <br/><br/>
                        <div className={styles.number}>
                            <button className={styles.roundButton} onClick={decreaseTokens}>-</button>
                            <input type="text" className={styles.mintnum} readOnly value={tokens}/>
                            <button className={styles.roundButton} onClick={increaseTokens}>+</button>
                        </div>
            <br/><br/>
                  <div className={styles.under} style={{fontSize: "22px"}}>{totalValue} ETH</div>
                        <br/><br/>
                            <div className={styles.under} style={{fontSize: "22px"}}>{totalSupply}/{maxSupply}</div>
                            <br/>
                                <br/>

                                    <button className={styles.mintme} type="button" onClick={onSubmit}>MINT</button>

                                    <br/><br/>
                                        <br/>
                                            <div className={styles.under}>Cost 0.07 ETH per unit <br/>+ gas fees</div>
                                            <br/>

                                                <br/><br/><br/><br/>
                                                    <div className={styles.under}
                                                         style={{fontSize: "14px", fontFamily: "Poppins"}}>Please make sure
                                                        you are connected to the right network (Ethereum Mainnet) and
                                                        the correct address. Please note: Once you make the purchase,
                                                        you cannot undo this action.
                                                    </div>
        </div>
    );
}
