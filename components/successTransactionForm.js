import React, { Component, useState } from 'react';
import { UseRouter } from 'next/router';

export default function SuccessTransactionForm(ctx) {

    let {totalValue, tokens, maxTokenPurchase, tokenPrice, stepUp, stepDown, onSubmit,
                                 totalSupply, maxTokens, etherscanLink} = ctx;

    return (
        <form className="row" action="mint2">
                                            <div className="form-process">
                                                <div className="css3-spinner">
                                                    <div className="css3-spinner-scaler"></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12  center">
                                                <div style={{
                                                    "fontSize": "3.8em",
                                                    "color": "#ffffff",
                                                    "letterSpacing": "0px",
                                                    "fontFamily": "Cattedrale-Regular"
                                                }}>Mint a Spe<span className="spelll">lll</span></div>

                                                <span style={{
                                                    "fontSize": "20px",
                                                    "lineHeight": "90px",
                                                    "fontWeight": "400",
                                                    "color": "rgba(255,255,255,0.75)",
                                                    "fontFamily": "Montserrat"
                                                }}><strong>Congratulations! You have successfully minted {tokens} {tokens > 1 && <span>Spellls</span> || <span>Spelll</span>} for {totalValue} ETH</strong><br/>
                                                </span>

                                                <span style={{"fontSize":"0.9rem"}}><a href={etherscanLink} target="_blank" rel="noreferrer">Check your transaction in etherscan</a></span>


                                            </div>

                                            <div className="col-lg-12 center">

                                                <button type="submit"
                                                        className="button button-xlarge button-circle button-3d button-light button-border">WAIT!
                                                    I WANT TO MINT MORE!</button>

                                            </div>


                                        </form>
    );
}
