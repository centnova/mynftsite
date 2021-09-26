import React, { Component, useState } from 'react';
import { UseRouter } from 'next/router';

export default function MintForm(ctx) {

    let {totalValue, tokens, maxTokenPurchase, tokenPrice, stepUp, stepDown, onSubmit,
                                 totalSupply, maxTokens, loading} = ctx;

    return (
        <form className="row" onSubmit={onSubmit}>
                                            <div className={loading?"form-process-react-before-merged" :"form-process-react"}>
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
                                                    "lineHeight": "30px",
                                                    "fontWeight": "400",
                                                    "color": "rgba(255,255,255,0.75)",
                                                    "fontFamily": "Montserrat"
                                                }}><strong>Mint up to {maxTokenPurchase} Spellls at {tokenPrice} ETH each</strong><br/>
Minted: {totalSupply}/{maxTokens}</span>


                                            </div>


                                            <div className="col-lg-12 p-4 center">

                                                <div className="number-input">
                                                    <button type="button"
                                                            onClick={stepDown}>
                                                        <i className="icon-chevron-down"></i></button>
                                                    <input className="coins" min="1" max="12" name="coins" value={tokens}
                                                           type="number" id="coins"
                                                           style={{"fontFamily": "Cattedrale-Regular"}} disabled/>
                                                    <button type="button"
                                                            onClick={stepUp}
                                                            className="plus"><i className="icon-chevron-up"></i>
                                                    </button>
                                                </div>


                                            </div>

                                            <div className="col-lg-12 center">

                                                <button type="submit"
                                                        className="button button-xlarge button-circle button-3d button-light button-border">MINT
                                                    SPELLLS <span className="spelll"><span
                                                        id="reward">{totalValue}</span> ETH</span></button>

                                            </div>


                                        </form>
    );
}
