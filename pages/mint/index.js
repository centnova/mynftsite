import styles from '../../styles/minting.module.css'
import useWhitelist from "../../lib/useWhitelist";
import {useState} from "react";

const Mint = props => {
    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.07);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const whitelistMint = false;

    let maxTokens = 8;
    let saleMessage = `PUBLIC MINT. YOU CAN MINT UP TO ${maxTokens} PER TRANSACTION`;

    if (whitelistMint) {
        maxTokens = 4;
        saleMessage = `WHITELIST MINT. YOU CAN MINT UP TO ${maxTokens}.`;
    }

    const decreaseTokens = async (event) => {
        let _tokens = tokens;

        _tokens -= 1;

        if (_tokens <= 1) {
            _tokens = 1;
        }

        let _totalValue = _tokens * 0.07;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)

        setTotalValue(_totalValue);
        setTokens(_tokens);
        console.log("Decrease tokens: " + _tokens + " Total Value: " + _totalValue);
    }

    const increaseTokens = async (event) => {
        let _tokens = tokens;
        _tokens += 1;

        if (_tokens >= maxTokens) {
            _tokens = maxTokens;
        }

        let _totalValue = _tokens * 0.07;
        _totalValue = (Math.round(_totalValue * 100) / 100).toFixed(2)

        setTotalValue(_totalValue);
        setTokens(_tokens);
        console.log("Increase tokens: " + _tokens + " Total Value: " + _totalValue);

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
                    <div className={styles.under}>{saleMessage}</div>
            <br/><br/>
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
