import styles from '../../styles/minting.module.css'
import useWhitelist from "../../lib/useWhitelist";
import {useState} from "react";
import provider from "../../ethereum/_ethers";
import contract from "../../ethereum/_contract";

const Mint = props => {
    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.07);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    //
    var util = require("util");
    console.log("Props: " + util.inspect(props, {showHidden: false, depth: null}));

    // const whitelistMint = false;

    let maxTokens = 8;
    let saleMessage = 'MINT IS NOT OPEN';

    if (!props.saleIsActive) {
        saleMessage = `MINT IS NOT OPEN`;

    }
    // else if (whitelistMint) {
    //     maxTokens = 4;
    //     saleMessage = `WHITELIST MINT. YOU CAN MINT UP TO ${maxTokens}.`;
    // }
    else {
        let maxTokens = 8;
        saleMessage = `PUBLIC MINT. YOU CAN MINT UP TO ${maxTokens} PER TRANSACTION`;
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

    const onSubmit = async (event) => {
    setErrorMessage('');
    event.preventDefault();
    setLoading(true);
    try {

        const accounts = await provider.getSigner();
        // console.log(contract);
        // const symbol = await contract.symbol();
        // const maxMyNFTTokens = await contract.MAX_TOKENS();
        // console.log(accounts);
        // console.log(symbol);
        // console.log(maxMyNFTTokens);
        //
        // let saleIsActive = await contract.saleIsActive();
        //
        // const signer = provider.getSigner();
        // const sendWithSigner = contract.connect(signer);
        //
        // if (!saleIsActive) {
        //     console.log("Flipping sale state");
        //     await sendWithSigner.flipSaleState();
        // } else {
        //     console.log("Sale is active");
        // }
        //
        // const weiValue = ethers.utils.parseEther(totalValue.toString());
        // console.log(weiValue);
        // await sendWithSigner.mintToken(tokens, {value: weiValue});
        // console.log(`Minted ${tokens} for a total of ${totalValue}`);

        // Router.pushRoute('/');
    } catch (err) {
        setErrorMessage(err.message);
        console.log(err.message);
    }
    setLoading(false);
};

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
                            <input type="text" className={styles.mintnum} readOnly value={tokens}/>
                            <button className={styles.roundButton} onClick={increaseTokens}>+</button>
                        </div>
            <br/><br/>
                  <div className={styles.under} style={{fontSize: "22px"}}>{totalValue} ETH</div>
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

export const getServerSideProps = async({req, res}) => {
    console.log("Inside Server Props");
    const ipData = useWhitelist(req, res)

    let saleIsActive = await contract.saleIsActive();
    // let saleIsActive = true;
    console.log(`Sale is active (serverprops): saleIsActive`);

    let r = {props: {saleIsActive}};
    console.log("Exiting Server Props");
    return r;
}

export default Mint
