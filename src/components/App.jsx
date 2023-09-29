// mui関連をインポートする。
import StartIcon from '@mui/icons-material/Start';
import PersonIcon from '@mui/icons-material/Person';
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
import { userexist } from './hooks/UseContract';
import LockIcon from '@mui/icons-material/Lock';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


/**
 * Appコンポーネント
 */
function App() {
  // create contract
  const {
    currentAccount,
    setCurrentAccount,
 
} = useMyContext();

const [anchorEl, setAnchorEl] = useState(null);
// メニュー用の変数
const open = Boolean(anchorEl);

/**
 * メニューアイコンをクリックした時の処理
 * @param {*} event イベントハンドラ
 */
const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
};

/**
 * メニューバーを閉じる時の処理
 */
const handleClose = () => {
      setAnchorEl(null);
};

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
    clientId: "BIa-f6T5jiSUFcujnPzZni7hSTti-zUpn3oh0Fl0cHDmtSZi17WeNLQHqC1Ai20BLuCvqcgUgd2t1vW68F9Vzwc",//"BNb8D2QLifj-8iSBY2EtMjpl8Qi1F8BFxx_HimYKCxlrtKRpVJ9VRydycSmHv75QsJijy7qyyV6xBDYLUWMW1eY"
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

const copy = () => {
  //コピー
  navigator.clipboard.writeText(currentAccount)
      .then(function() {
          console.log('Async: Copyed to clipboard was successful!');
          alert("Copying to clipboard was successful!")
      }, function(err) {
          console.error('Async: Could not copy text: ', err);
      });
};
  
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <Router>
        <div sx={{ flexGrow: 1 }}>
          { /* 画面上部に表示するAppBarコンポーネント */ }
          <AppBar position="static" sx={{backgroundColor:'whitesmoke'}}>
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
                    sx={{color:'black'}}
                  >
                    <StartIcon />
                  </IconButton>
                ) :
                  /* 各画面に遷移するためのWeb3Menuコンポーネントを表示する。 */
                <div className='dis'>
                  
                  <IconButton 
aria-label="more"
id="user-menu-button"
aria-controls={open ? 'user-menu-button' : undefined}
aria-expanded={open ? 'true' : undefined}
aria-haspopup="true"
onClick={handleClick}
sx={{color:'black'}}
>
<PersonIcon/>
</IconButton>
<Menu
id="user-menu"
MenuListProps={{
      'aria-labelledby': 'user-menu-button',
}}
anchorEl={anchorEl}
open={open}
onClose={handleClose}
PaperProps={{
      style: {
     
      width: '20ch',
      },
}}
>

<MenuItem sx={{fontSize:'12px'}}>{'Addr:'+ currentAccount.substr(0,12) + '...'}<ContentCopyIcon className='pointer' fontSize="small" onClick={copy}/></MenuItem>
<MenuItem  onClick={async ()=>{

await web3auth.logout({cleanup: true});
web3auth.clearCache();
setCurrentAccount(null)
}}><LockIcon/></MenuItem>
</Menu>
                  <Web3Menu/>
 
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

                <ActionButton buttonName="Connect Wallet" color="secondary" clickAction={connect} />
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