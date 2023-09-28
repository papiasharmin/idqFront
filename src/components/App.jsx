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
import { Container } from '@mui/material';
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
import logo from '../assets/imgs/logo.png'
import superAgent from 'superagent';
import { baseURL } from './common/Constant';
import QrCodeReader from './common/QrCodeReader';
import QrCodeDialog from './common/QrCodeDialog';
import ActionButton from './common/ActionButton';
import { Web3Auth } from "@web3auth/modal";
import { WalletConnectV2Adapter } from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
 import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { userexist } from './hooks/UseContract';
/**
 * Appコンポーネント
 */
function App() {
  // create contract
  const {
    currentAccount,
    setCurrentAccount,
 
} = useMyContext();

  // const [data, setdata] = useState({
  //   address: "",
  //   Balance: null,
  // });


  // const [pass,setpass] = useState(null)
  // const [conpass,setconpass] = useState(null)
   const [isLoading, setIsLoading] = useState(false);
   const [web3auth, setweb3auth] = useState(null)
  // const [usercreated, setusercreated] = useState(null)
  // const [qrOpen, setQrOpen] = useState(false);
  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {
  // let signer = await connectWallet();
  // console.log('signer',signer)
  //await connectWallet();

  setCurrentAccount(); //"0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6"
  // try{
  //   const MMSDK = new MetaMaskSDK({
  //     useDeeplink: false,
  //     communicationLayerPreference: "socket",
  //  });
  //  const ethereum = MMSDK.getProvider();
    
  //   console.log('MMSDK',MMSDK, ethereum)
  // } catch (err) {
  //   console.log(err)
  // }
  //     // Asking if metamask is already present or not
  //     if (window.ethereum) {
    
  //       // res[0] for fetching a first wallet
  //       window.ethereum
  //         .request({ method: "eth_requestAccounts" })
  //         .then((res) => accountChangeHandler(res[0]));
  //     } else {
  //       //let acc = await ethereum.request({ method: 'wallet_scanQRCode', params: [] });
  //       //accountChangeHandler(acc)
  //       alert("install metamask extension!!");
  //       return;
  //     }
    
    
  //   // getbalance function for getting a balance in
  //   // a right format with help of ethers
  //   const getbalance = (address) => {
    
  //     // Requesting balance method
  //     window.ethereum
  //       .request({ 
  //         method: "eth_getBalance", 
  //         params: [address, "latest"] 
  //       })
  //       .then((balance) => {
  //         // Setting balance
  //         //console.log('balance', new ethers.formatEther(balance))
  //         // setdata({
  //         //   Balance: new ethers.formatEther(balance),
  //         // });
  //       });
  //   };
    
  //   // Function for getting handling all events
  //   const accountChangeHandler = (account) => {
  //     // Setting an address data
  //     setdata({
  //       address: account,
  //     });
  //     //setCurrentAccount(account);//account
  //     // Setting a balance
  //     getbalance(account);
  //   }
   
    // try {
    //   // call createContractObject function
    //   //const signer  = "0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6";//await connectWallet(); //INSTEAD OF USING BLOCKTO CREAT AN ACOUNT IN  METAMAK AND USE IT 
    //   //await connectWallet()
    //   setCurrentAccount(signer);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //setCurrentAccount("0xb8fAb188F71e3cF627161502112070CbAb595fd2")
  function createuser(user){
      setIsLoading(true);
   
      // 送金用のAPIを呼び出す
      superAgent
          .post(baseURL + '/api/createuser')
          .query({
              password: user,   
          })
          .end(async(err, res) => {
              if (err) {
                  console.log("Token送金用API呼び出し中に失敗", err);
                  // popUpメソッドの呼び出し
                 // popUp(false, "failfull...");
                  setIsLoading(false);
                  return err;
              }
              console.log('RESPONSEBODY',res.body)
              setIsLoading(false);
              setCurrentAccount(res.body.addr)
              // popUpメソッドの呼び出し
              //popUp(true, "successfull!!");
          });
  }

//   function loginuser(e){
    
//     setIsLoading(true);
//    console.log('qrresult', qrResult.text)
//       // 送金用のAPIを呼び出す
//       superAgent
//           .post(baseURL + '/api/login')
//           .query({
//                   password: qrResult.text || pass,
                
//           })
//           .end(async(err, res) => {
//               if (err) {
//                   console.log("Token送金用API呼び出し中に失敗", err);
//                   // popUpメソッドの呼び出し
//                  // popUp(false, "failfull...");
//                   setIsLoading(false);
//                   return err;
//               }
//               console.log('userrrrr', res.body)
//               setCurrentAccount(res.body.addr)
//               setIsLoading(false);
//               // popUpメソッドの呼び出し
//               //popUp(true, "successfull!!");
//           });
//   }

//   const handleQrOpen = (wallet) => {
//     setQrOpen(true);
// }

// /**
//  * Close Dialog
//  */
// const handleQrClose = () => {
//     setQrOpen(false);
// }




// const web3auth = new Web3AuthNoModal({
//   clientId: "BIa-f6T5jiSUFcujnPzZni7hSTti-zUpn3oh0Fl0cHDmtSZi17WeNLQHqC1Ai20BLuCvqcgUgd2t1vW68F9Vzwc", // Get your Client ID from the Web3Auth Dashboard
//   web3AuthNetwork: "testnet", // Web3Auth Network
//   chainConfig: chainConfig,
  
// });



//  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });


// // // ///////
// const OpenloginAdapterOptions = {

//   chainConfig,
//   loginSettings: {
    
//     mfaLevel: "optional", // default, optional, mandatory, none
//   },
//   adapterSettings: {
//     loginConfig: {
//       google: {
//         verifier: "idq-wallet", // Pass the Verifier name here
//         typeOfLogin: "google", // Pass on the login provider of the verifier you've created
//         clientId: "936409871925-i50gk055ji20icst0f5lkldtotjp9i03.apps.googleusercontent.com", // Pass on the Google `Client ID` here
//       },
//     },
//      mfaSettings: {
//       deviceShareFactor: {
//         enable: true,
//         priority: 1,
//         mandatory: true,
//       },
//       backUpShareFactor: {
//         enable: true,
//         priority: 2,
//         mandatory: false,
//       },
//       socialBackupFactor: {
//         enable: true,
//         priority: 3,
//         mandatory: false,
//       },
//       passwordFactor: {
//         enable: true,
//         priority: 4,
//         mandatory: false,
//       },
//     },
//     sessionTime:600,
//     uxMode: "popup",
//     whiteLabel: {
//       appName: "IDQ Soul Wallet",
//       appUrl: "http://localhost:3000/",
//       logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
//       logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
//       defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
//       mode: "dark", // whether to enable dark mode. defaultValue: auto
//       theme: {
//         primary: "#00D1B2",
//       },
//       useLogoLoader: true,
//     },
//   },
//   privateKeyProvider,
// }

// const openloginAdapter = new OpenloginAdapter(OpenloginAdapterOptions);

// web3auth.configureAdapter(openloginAdapter);


// const walletConnectModal = new WalletConnectModal({ projectId: "6df1086ec4c69b1400bf2426405b9a93" });
// const walletConnectV2Adapter = new WalletConnectV2Adapter({
//   adapterSettings: {
//     qrcodeModal: walletConnectModal,
//     walletConnectInitOptions: {
//       projectId: "6df1086ec4c69b1400bf2426405b9a93",
//       relayUrl: "wss://relay.walletconnect.com",
//       metadata: {
      
//         url: window.location.origin,
        
//       },
//     },
//   },
//   loginSettings: {
//     requiredNamespaces:{
//       eip155: {
//         chains: ['eip155:80001'],
//         methods: ['eth_sendTransaction', 'personal_sign'],
//         events: ['accountsChanged', 'chainChanged'],
//         accounts: [
//           'eip155:80001:0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6',
         
//         ]
//       }
//     },
//   },
// });

//web3auth.configureAdapter(walletConnectV2Adapter);

const connect = async()=>{
  const chainConfig= {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: "https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP",
    displayName: "Polygon Testnet",
    blockExplorer: "https://polygon.etherscan.io",
    ticker: "MATIC",
    tickerName: "Polygon",
  }

  //   const chainConfig= {
  //   chainNamespace: "eip155",
  //   chainId: "0x1",
  //   rpcTarget: `https://rpc-evm-sidechain.xrpl.org`,
  //   displayName: "evm sidechain",
  //   ticker: "XRP",
  //   tickerName: "Ripple",
  // }
  
  let web3auth= new Web3Auth({
    clientId: "BNb8D2QLifj-8iSBY2EtMjpl8Qi1F8BFxx_HimYKCxlrtKRpVJ9VRydycSmHv75QsJijy7qyyV6xBDYLUWMW1eY", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: "testnet", // Web3Auth Network
    chainConfig,
    authMode:"WALLET",
    uiConfig: {
      appName: "IDQ Soul Wallet",
      appUrl: "http://localhost:3000/",
      logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      mode: "dark", // whether to enable dark mode. defaultValue: auto
      theme: {
        primary: "#00D1B2",
      },
      useLogoLoader: true,
    },
  });
  setweb3auth(web3auth);
 
   //await web3auth.init();
    await web3auth.initModal()
    console.log(web3auth)
  console.log(web3auth.provider)
  const res = await web3auth.connect()
 
//  const res = await web3auth.connectTo(
//   WALLET_ADAPTERS.OPENLOGIN,
//   WALLET_ADAPTERS.WALLET_CONNECT_V2,

// )

  console.log('RESPONSE',res)
  if(res){
    let userinfo = await web3auth.getUserInfo();
    let user = await userexist(userinfo.email);
    if(user){
      console.log('USER',user)
      setCurrentAccount(user)
    }else{
      createuser(userinfo.email);
    }
  }
}
useEffect(()=>{
  console.log('currentacc',currentAccount)


},[currentAccount])
  
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
                    onClick={connect}
                  >
                    <StartIcon />
                  </IconButton>
                ) :
                  /* 各画面に遷移するためのWeb3Menuコンポーネントを表示する。 */
                <div className='dis'>
                  <Web3Menu/>
                  <button type='' onClick={async ()=>{   
                                         
                                         await web3auth.logout({cleanup: true});
                                         web3auth.clearCache();
                                         setCurrentAccount(null)}}
                  >
                        logout
                  </button>
                </div>
                }
              </Typography>
            </Toolbar>
          </AppBar>
          { currentAccount === null ? (
            <header className="App-header">
              <p>Welcome to IDQ | Soul Wallet!!</p>
              <div className="container">
              <div className="logo">
                <img src={logo} width={'100px'} alt="logo" />
              </div>

                <ActionButton buttonName="Connectwallet" color="secondary" clickAction={connect} />
              </div>
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