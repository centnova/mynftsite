import styles from '../../styles/minting.module.css'
import useWhitelist from "../../lib/useWhitelist";
import {useState} from "react";
// import provider from "../../ethereum/_ethers";
import contract from "../../ethereum/_contract";
import {ethers} from "ethers";
import ChMintForm from "../../components/chMintForm";
import ChSuccessTransactionForm from "../../components/chSuccessTransactionForm";
import merklelist from "../../lib/merkle_whitelist.js";

const Mint = props => {
    const [tokens, setTokens] = useState(1);
    const [totalValue, setTotalValue] = useState(0.07);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [etherscanLink, setEtherscanLink] = useState(false);
    const [connected, setConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState('');
    const [chainName, setChainName] = useState('');

    const etherscanNetwork = "rinkeby.etherscan.io";

    // const whitelistMint = false;

    let maxTokens = 1;
    let saleMessage = 'MINT IS NOT OPEN';

    if (props.wlSaleIsActive) {
        maxTokens = 12;
        saleMessage = `WHITELIST MINT. YOU CAN MINT UP TO ${maxTokens} NFTs`;
    } else if (props.saleIsActive) {
        maxTokens = 12;
        saleMessage = `PUBLIC MINT. YOU CAN MINT UP TO ${maxTokens} NFTs`;
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
    }

    const onSubmit = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        setLoading(true);
        try {

            const accounts = await provider.getSigner();

            // recheck if saleIsActive, just in case something changed

            let saleIsActive = await contract.saleIsActive();
            let wlSaleIsActive = await contract.wlSaleIsActive();

            // todo do an extra check for the tokens here and the type of sale
            const sendWithSigner = contract.connect(accounts);
            const weiValue = ethers.utils.parseEther(totalValue.toString());
            let mintedWith = "";

            let transaction;

            if (wlSaleIsActive) {
                let whitelisted = false;
                let proofs = [];
                let waladdress = await accounts.getAddress();

               for (let i = 0; i < merklelist.length; i++) {
                   if (waladdress === merklelist[i]['address']) {
                              whitelisted = true;
                              proofs = merklelist[i]['proof'];
                              console.log("Whitelisted with proofs: " + proofs);
                   }
                }

               if (!whitelisted) {
                   console.log("NO PROOFS - NOT WHITELISTED");
                   setErrorMessage(`Account ${waladdress} is not in the whitelist. Please connect or switch to the whitelisted account.`);
                   setConnected(false);
                   setLoading(false);
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

            console.log(`Sent a tx for ${tokens} tokens for a total of ${totalValue}`);
            const receipt = await transaction.wait();

            const _contractUrl = 'https://' + etherscanNetwork + "/tx/"+receipt['transactionHash'];
            setEtherscanLink(_contractUrl);

            console.log(`Minted ${tokens} with ${mintedWith} for a total of ${totalValue}`);

            // Router.pushRoute('/');
            setSuccessMessage(true);

        } catch (err) {
            let errToDisplay = "An error occurred!";
            if (err.message.includes("invalid Merkle proof")) {
                errToDisplay = "Invalid Merkle Proof. You are not in the Whitelist!";
            }

            setErrorMessage(errToDisplay);
            console.log(err.message);
        }
        setLoading(false);
    };

    const onConnect = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        setLoading(true);

        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);

            // provider = new ethers.Web3Provider(ethers.web3.currentProvider);
            // await provider.send('eth_requestAccounts', []);

            const signer = await provider.getSigner(0);
            console.log(signer);
            const _address = await signer.getAddress();
            console.log("After connect the wallet address is: " + _address);
            setAccount(_address);
            setChainName(await provider.getNetwork());
            console.log("After connect the chainName is: " + chainName);
            // if (signer === undefined) setAccount(signer.)
            console.log(provider);

            setConnected(true);

            console.log("Connect wallet");
        }
        catch (err) {
            let errToDisplay = "An error occurred!";
            setErrorMessage(errToDisplay);
        }
        setLoading(false);
    }

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
            <div className={styles.under}></div>
            {errorMessage ? <div className={styles.errorclass}>{errorMessage} </div> : <br/> }
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
                    connected={connected}
                    onConnect={onConnect}
                    account={account}
                ></ChMintForm>
            }

            <br/>

        </div>
    )
}

export const getServerSideProps = async ({req, res}) => {
    const ipData = useWhitelist(req, res)

    let saleIsActive = await contract.saleIsActive();
    let totalSupply = await contract.totalSupply();
    let maxSupply = await contract.MAX_TOKENS();
    let wlSaleIsActive = await contract.wlSaleIsActive();

    totalSupply = totalSupply.toNumber();
    maxSupply = maxSupply.toNumber();

    let r = {props: {saleIsActive, wlSaleIsActive, totalSupply, maxSupply}};
    return r;
}

export default Mint
