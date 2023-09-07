// mui関連をインポートする。
import StartIcon from '@mui/icons-material/Start';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './../assets/css/App.css';
import { useMyContext } from './../Contexts';
import ActionButton2 from './common/ActionButton2';
import Web3Menu from "./common/Web3Menu";
import {
  connectWallet
} from './hooks/UseContract';
import Buy from './pages/Buy';
import Create from './pages/Create';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Tips from './pages/Tips';
import Txs from './pages/Tx/Txs';
import Upload from './pages/Upload';
import MyVC from './pages/Vc/MyVc';
import Verify from './pages/Verify';
import Wallets from './pages/Wallet/Wallets';
import { ethers } from 'ethers';
import MetaMaskSDK from "@metamask/sdk";

/**
 * Appコンポーネント
 */
function App() {
  // create contract
  const {
    currentAccount,
    setCurrentAccount
  } = useMyContext();

  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {

  try{
    const MMSDK = new MetaMaskSDK({
      useDeeplink: false,
      communicationLayerPreference: "socket",
   });
   const ethereum = MMSDK.getProvider();
    
    console.log('MMSDK',MMSDK, ethereum)
  } catch (err) {
    console.log(err)
  }
      // Asking if metamask is already present or not
      if (window.ethereum) {
    
        // res[0] for fetching a first wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        //let acc = await ethereum.request({ method: 'wallet_scanQRCode', params: [] });
        //accountChangeHandler(acc)
        alert("install metamask extension!!");
        return;
      }
    
    
    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
    
      // Requesting balance method
      window.ethereum
        .request({ 
          method: "eth_getBalance", 
          params: [address, "latest"] 
        })
        .then((balance) => {
          // Setting balance
          console.log('balance', new ethers.formatEther(balance))
          // setdata({
          //   Balance: new ethers.formatEther(balance),
          // });
        });
    };
    
    // Function for getting handling all events
    const accountChangeHandler = (account) => {
      // Setting an address data
      setdata({
        address: account,
      });
      setCurrentAccount("0xb8fAb188F71e3cF627161502112070CbAb595fd2");//account
      // Setting a balance
      getbalance(account);
    }
   
    // try {
    //   // call createContractObject function
    //   //const signer  = "0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6";//await connectWallet(); //INSTEAD OF USING BLOCKTO CREAT AN ACOUNT IN  METAMAK AND USE IT 
    //   //await connectWallet()
    //   setCurrentAccount(signer);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  setCurrentAccount("0xb8fAb188F71e3cF627161502112070CbAb595fd2")

  console.log('metadata',data)
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Router>
        <div sx={{ flexGrow: 1 }}>
          { /* 画面上部に表示するAppBarコンポーネント */ }
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
                <strong>IDQ | Soul Wallet</strong>
              </Typography>
              { /* ウォレットに接続していなければログインアイコンを表示する。 */ }
              <Typography variant="h6" color="inherit">
                {currentAccount === null ? (
                  <IconButton 
                    aria-label="more"
                    id="connect-wallet"
                    aria-haspopup="true"
                    onClick={connectWalletAction}
                  >
                    <StartIcon />
                  </IconButton>
                ) :
                  /* 各画面に遷移するためのWeb3Menuコンポーネントを表示する。 */
                  <Web3Menu/>
                }
              </Typography>
            </Toolbar>
          </AppBar>
          { currentAccount === null ? (
            <header className="App-header">
              <p>Welcome to IDQ | Soul Wallet!!</p>
              <ActionButton2 buttonName="Enter App" color="primary" clickAction={()=>{}} />
            </header>
          ) : (
            <Routes>
              <Route path="/" exact element={ <Home /> } />
              <Route path="/home" exact element={ <Home /> } />
              <Route path="/wallets" exact element={ <Wallets /> } />
              <Route path="/create" exact element={ <Create /> } />
              <Route path="/buy" exact element={ <Buy /> } />
              <Route path="/txs" exact element={ <Txs /> } />
              <Route path="/myvc" exact element={ <MyVC /> } />
              <Route path="/upload" exact element={ <Upload /> } />
              <Route path="/verify" exact element={ <Verify/> } />
              <Route path="/tips" exact element={ <Tips/> } />
              <Route path="*" exact element={ <NoPage/> } />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;