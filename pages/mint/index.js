import styles from '../../styles/minting.module.css'
import useWhitelist from "../../lib/useWhitelist";
import {useState} from "react";

const Mint = props => {
    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.07);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const whitelistMint = true;

    let maxTokens = 8;

    if (whitelistMint) {
        maxTokens = 4;
    }

    const decreaseTokens = async (event) => {
        let _tokens = tokens;

        if (_tokens <= 1) {
            setTokens(1);
            return;
        }

        _tokens -= 1;
        setTokens(_tokens);
        console.log("Decrease tokens: " + _tokens);
    }

    const increaseTokens = async (event) => {
        let _tokens = tokens;

        if (_tokens >= maxTokens) {
            _tokens = maxTokens;
            setTokens(_tokens);
            return;
        }

        _tokens += 1;
        console.log("Increase tokens: " + _tokens);

        setTokens(_tokens);

    }

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
            <img src="img/logomain.png" alt="Confused Heroes" width="240"/> <br/> <br/>
                <div className={styles.heads}>MINT CONFUSED HEROES <br/></div>
                <br/>
                    <div className={styles.under}></div>
                    <br/>

                        <div className={styles.number}>
                            <button className={styles.roundButton} onClick={decreaseTokens}>-</button>
                            <input type="text" className={styles.mintnum} value={tokens}/>
                            <button className={styles.roundButton} onClick={increaseTokens}>+</button>
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

Mint.getInitialProps = async({req, res}) => {
    const ipData = useWhitelist(req, res)
    return ipData
}

export default Mint
