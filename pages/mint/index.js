import styles from '../../styles/minting.module.css'

const Mint = props => {
    return(
        <div className={styles.main}>
            <style jsx global>{`
        html {
  background: url(img/bgmint2.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
      `}</style>
            <img src="logomain.png" alt="Confused Heroes" width="240"/> <br/> <br/>
                <div className={styles.heads}>MINT CONFUSED HEROES <br/></div>
                <br/>
                    <div className={styles.under}></div>
                    <br/>

                        <div className={styles.number}>
                            <button className={styles.roundButton}>-</button>
                            <input type="text" className={styles.mintnum} value="20"/>
                            <button className={styles.roundButton}>+</button>
                        </div>
                        <br/><br/>
                            <div className={styles.under} style={{fontSize: "22px"}}>127/10000</div>
                            <br/>
                                <br/>

                                    <button className={styles.mintme} type="button">MINT</button>

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
                                                    <br/>

        </div>
    )
}

export default Mint
