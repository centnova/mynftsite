const Mint = props => {
    return(
        <div className="main">
            <img src="logomain.png" alt="Confused Heroes" width="240"/> <br/> <br/>
                <div className="heads">MINT CONFUSED HEROES <br/></div>
                <br/>
                    <div className="under"></div>
                    <br/>

                        <div className="number">
                            <button className="round-button">-</button>
                            <input type="text" className="mintnum" value="20"/>
                            <button className="round-button">+</button>
                        </div>
                        <br/><br/>
                            <div className="under" style={{fontSize: "22px"}}>127/10000</div>
                            <br/>
                                <br/>

                                    <button className="mintme" type="button">MINT</button>

                                    <br/><br/>
                                        <br/>
                                            <div className="under">Cost 0.07 ETH per unit <br/>+ gas fees</div>
                                            <br/>

                                                <br/><br/><br/><br/>
                                                    <div className="under"
                                                         style={{fontSize: "14px", fontFamily: "Poppins"}}>Please make sure
                                                        you are connected to the right network (Ethereum Mainnet) and
                                                        the correct address. Please note: Once you make the purchase,
                                                        you cannot undo this action.
                                                    </div>
                                                    <br/>

        </div>
    )
}

export default Mint
