import styles from '../../styles/minting.module.css'
import useWhitelist from "../../lib/useWhitelist";
import {useState} from "react";
import provider from "../../ethereum/_ethers";
import contract from "../../ethereum/_contract";
import {ethers} from "ethers";
import ChMintForm from "../../components/chMintForm";
import ChSuccessTransactionForm from "../../components/chSuccessTransactionForm";

const Mint = props => {
    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.07);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [etherscanLink, setEtherscanLink] = useState(false);
    //
    var util = require("util");
    console.log("Props: " + util.inspect(props, {showHidden: false, depth: null}));

    // const whitelistMint = false;

    let maxTokens = 1;
    let saleMessage = 'MINT IS NOT OPEN';

    if (props.wlSaleIsActive) {
        maxTokens = 4;
        saleMessage = `WHITELIST MINT. YOU CAN MINT UP TO ${maxTokens}.`;
    } else if (props.saleIsActive) {
        maxTokens = 8;
        saleMessage = `PUBLIC MINT. YOU CAN MINT UP TO ${maxTokens} PER TRANSACTION`;
    } else {
        saleMessage = `MINT IS NOT OPEN`;
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
            console.log("Accounts: " + util.inspect(accounts, {showHidden: false, depth: null}));

            console.log(contract);


            // recheck if saleIsActive, just in case something changed
            // todo add here also the whitelist case
            let saleIsActive = await contract.saleIsActive();
            let wlSaleIsActive = await contract.wlSaleIsActive();

            // todo do an extra check for the tokens here and the type of sale
            const sendWithSigner = contract.connect(accounts);
            const weiValue = ethers.utils.parseEther(totalValue.toString());
            let mintedWith = "";

            let transaction;

            if (wlSaleIsActive) {
                let proofs = [];
                let waladdress = await accounts.getAddress();
                console.log("WALADDRESS" + waladdress);

                // [{'address': 'AB5Dae357BdBd6F7873ddC9741022d8c90a890e4', 'leaf': '25982080fcd47bab8c4177e3da42a49c461dea32dc9b6973bb5350c05fccd774', 'proof': ['80bc166688d1b9b7144865894626695cbc86cff46fc239d4e4ef9f63fda2f4db']}, {'address': '506A3b92e6D80e6aCb7106a70CDd59A58D588491', 'leaf': '80bc166688d1b9b7144865894626695cbc86cff46fc239d4e4ef9f63fda2f4db', 'proof': ['25982080fcd47bab8c4177e3da42a49c461dea32dc9b6973bb5350c05fccd774']}]
                if (waladdress === '0xAB5Dae357BdBd6F7873ddC9741022d8c90a890e4') {
                    proofs = ['0x80bc166688d1b9b7144865894626695cbc86cff46fc239d4e4ef9f63fda2f4db'];
                    console.log("Wallet address: " + waladdress);
                } else if (waladdress === '0x506A3b92e6D80e6aCb7106a70CDd59A58D588491') {
                    proofs = ['0x25982080fcd47bab8c4177e3da42a49c461dea32dc9b6973bb5350c05fccd774'];
                    console.log("Wallet address: " + waladdress);
                } else {
                    console.log("NO PROOFS - NOT WHITELISTED");
                    return
                }


                transaction = await sendWithSigner.wlMintToken(tokens, proofs, {value: weiValue});
                mintedWith = "Whitelist";
            } else if (saleIsActive) {
                transaction = await sendWithSigner.mintToken(tokens, {value: weiValue});
                mintedWith = "Public Sale";
            } else {
                console.log("Neither sale is active, we will not send a transaction");
                return
            }

            console.log(`Minted ${tokens} for a total of ${totalValue}`);
            const receipt = await transaction.wait();
            console.log(receipt)
            const _contractUrl = 'https://' + "rinkeby.etherscan.io/tx/"+receipt['transactionHash'];
            setEtherscanLink(_contractUrl);

            console.log(weiValue);
            console.log(`Minted ${tokens} with ${mintedWith} for a total of ${totalValue}`);

            // Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
            console.log(err.message);
        }
        setSuccessMessage(true);
        setLoading(false);
    };

    return (
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
            {
                successMessage ?
                <ChSuccessTransactionForm
                    totalValue={totalValue}
                    tokens={tokens}
                    etherscanLink = {etherscanLink}
                ></ChSuccessTransactionForm> :
                <ChMintForm
                    saleMessage={saleMessage}
                    totalValue={totalValue}
                    tokens={tokens}
                    decreaseTokens={decreaseTokens}
                    increaseTokens={increaseTokens}
                    onSubmit={onSubmit}
                    totalSupply={props.totalSupply}
                    maxSupply={props.maxSupply}
                    loading={loading}
                ></ChMintForm>
            }

            <br/>

        </div>
    )
}

export const getServerSideProps = async ({req, res}) => {
    console.log("Inside Server Props");
    const ipData = useWhitelist(req, res)

    let saleIsActive = await contract.saleIsActive();
    let totalSupply = await contract.totalSupply();
    let maxSupply = await contract.MAX_TOKENS();
    let wlSaleIsActive = await contract.wlSaleIsActive();

    totalSupply = totalSupply.toNumber();
    maxSupply = maxSupply.toNumber();
    // let saleIsActive = true;
    console.log(`Sale is active (serverprops): ${saleIsActive} totalSupply: ${totalSupply} maxSupply: ${maxSupply}`);

    let r = {props: {saleIsActive, wlSaleIsActive, totalSupply, maxSupply}};
    console.log(r);
    console.log("Exiting Server Props");
    return r;
}

export default Mint
