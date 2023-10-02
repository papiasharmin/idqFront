// mui関連のコンポーネントのインポート
import Grid from "@mui/material/Grid";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import QrCodeIcon from '@mui/icons-material/QrCode';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import superAgent from 'superagent';
import ActionButton from "../../common/ActionButton";
import WalletDialog from '../../common/Dialog';
import LoadingIndicator from '../../common/LoadingIndicator';
import './../../../assets/css/App.css';
import { useMyContext } from './../../../Contexts';
import {
    baseURL
} from './../../common/Constant';
import MainContainer from './../../common/MainContainer';
import {
    getWallets, walletsCount, getWalletInfo, getRequired, getTxs
} from './../../hooks/UseContract';
import WalletTable from './WalletTable';
import { Link } from "react-router-dom";
import QrCodeDialog from "../../common/QrCodeDialog";


/**
 * 表の最上位ヘッダー部の配列
 */
const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 150, align: 'center' },
    { id: 'detail', label: 'Detail', minWidth: 100, align: 'center'},
    { id: 'deposit', label: 'Deposit', minWidth: 100, align: 'center'},

];

/** 
 * StyledPaperコンポーネント
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 1400,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * Walletsコンポーネント
 */
const Wallets = (props) => {
    // create contract
    const {
        currentAccount
    } = useMyContext();
    
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // 作成済みのウォレットコントラクトを格納する配列
    const [wallets, setWallets] = useState([]);
    // 作成済みのウォレットが0であることのフラグ
    const [isZero, setIsZero] = useState(false);
    // ページ番号用のステート変数
    const [page, setPage] = useState(0);
    // 1ページに表示する上限数
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ローディングを表示するためのフラグ
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingdetail, setIsLoadingdetail] = useState(false);
    // トランザクションが正常に処理された場合のフラグ
    const [successFlg, setSuccessFlg] = useState(false);
    // トランザクションが異常終了した場合のフラグ
    const [failFlg, setFailFlg] = useState(false);
    // ポップアップの表示を管理するフラグ
    const [showToast, setShowToast] = useState(false);
    // Dialogの表示を切り替えるフラグ
    const [open, setOpen] = useState(false);
    // deposit address
    const [depositAddr, setDepositAddr] = useState(null);
    // depozit amount
    const [amount, setAmount] = useState(0);
    const [showWalletDetails, setShowWalletDetails] = useState(false);
    const [walletDetails, setWalletDetails] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [deposite,setdeposite] = useState(false)

    /**
     * コンポーネントが描画されたタイミングで実行する初期化関数
     */
    const init = async() => {
        try {
            var multiSigWallets;

            // 作成済みウォレットアドレスを取得する。
            const count = await walletsCount();
            // ウォレットの数がゼロだった時はゼロフラグをオンにする。

            if (count === '0n') {
                setIsZero(true);
            } else {
                multiSigWallets = await getWallets(10, 0);
            }
           console.log('WALLET',multiSigWallets,count)
            // コントラクトとアカウントの情報をステート変数に格納する。
            //let res = await getTxs(currentAccount)
            //console.log('RESSSS',res)
            setAccount(currentAccount);
            setWallets(multiSigWallets);//setWallets(multiSigWallets);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
        }
    };

    /**
     * 入金用のメソッド
     * @param wallet ウォレットアドレス
     */
    const depositAction = async () => {
        console.log('BURNN')
        try {
            setOpen(false);
            setIsLoading(true);
            // 入金額を16進数に変換する。
            const value = 0//Web3.utils.toWei(amount.toString());
            
            // 償却用APIを呼び出す
            superAgent
                .post(baseURL + '/api/burnToken')
                .query({
                    to: currentAccount,
                    amount: amount,
                    walletAddr: depositAddr
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("償却用API呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "failfull...");
                        setIsLoading(false);
                        return err;
                    }
                });
            
            setdeposite(true)
            setDepositAddr("");
            setAmount(0);
            setIsLoading(false);
            // popUpメソッドを呼び出す
            popUp(true);
        } catch(err) {
            console.error("err:", err);

            setDepositAddr("");
            setAmount(0);
            setOpen(false);
            setIsLoading(false);
            // popUpメソッドを呼び出す
            popUp(false);
        }
    }

    /**
     * Open Dialog
     * @param wallet MultoSig Wallet Addr
     */
     const handleOpen = (wallet) => {
        setDepositAddr(wallet);
        setOpen(true);
    }

    /**
     * Close Dialog
     */
     const handleClose = () => {
        setDepositAddr("");
        setOpen(false);
    }

    const handleQrOpen = (wallet) => {
        setQrOpen(true);
    }

    /**
     * Close Dialog
     */
    const handleQrClose = () => {
        setQrOpen(false);
    }

    /**
     * ページングするための関数
     * @param e イベント内容
     * @param newPage 新しいページ
     */
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
        
    /**
     * 1ページに表示する取引履歴の上限を引き上げる関数
     * @param e イベント内容
     */
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };

    const getwalletDetails = async(wallet)=>{
        setIsLoadingdetail(true)
        const { 
            wName,
            required,
            counts,
            ownersaddr,
             balance
            
        } = await getWalletInfo(wallet);
        if(wName){
            setIsLoadingdetail(false)
        }

        setWalletDetails({
            wName,
            required,
            counts,
            ownersaddr,
             balance,
             wallet
        })
  
    }

    const copy = () => {
        //コピー
        navigator.clipboard.writeText(walletDetails.wallet)
            .then(function() {
                console.log('Async: Copyed to clipboard was successful!');
                alert("Copying to clipboard was successful!")
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
    };

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     */
    const popUp = (flg) => {
        // 成功時と失敗時で処理を分岐する。
        if(flg === true) {
            // ステート変数を更新する。
            setSuccessFlg(true);
            setShowToast(true);       
            // 5秒後に非表示にする。
            setTimeout(() => {
                setSuccessFlg(false);
                setShowToast(false);             
            }, 5000);
        } else {
            // ステート変数を更新する。
            setFailFlg(true);
            setShowToast(true);     
            // 5秒後に非表示にする。
            setTimeout(() => {
                setFailFlg(false);
                setShowToast(false);
            }, 5000);
        }
    };

    //  const getdata = async() =>{
    //    let data = await getWalletInfo("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6");
    //    //let data1 = await getRequired("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6")
    //    //let data2 = await getTxs("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6")
    //    console.log('walletinfo', data)
    //  }

    // 副作用フック
    useEffect(() => {
        setIsLoading(true);
        init();
        setIsLoading(false);
    }, [account]);

    useEffect(()=>{
        
    },[deposite])

    return(
        <MainContainer >
            { /* Dialog */ } 
            <WalletDialog 
                open={open} 
                amount={amount}
                handleClose={(e) => {handleClose()}} 
                depositAction={(e) => {depositAction(depositAddr)}} 
                setAmountAction={(e) => {setAmount(e.target.value)}} 
            />
            { /* main content */ }
            <StyledPaper sx={{my: '10px', mx: "auto", p: 0, borderRadius: 4, marginTop: 4, backgroundColor:'whitesmoke',boxShadow:'5px 5px 15px gray'}}>
                {isLoading ? (
                    <Grid container justifyContent="center">
                        <header className="loading">
                            <p><LoadingIndicator/></p>
                            <h3>Please Wait・・・・</h3>
                        </header>
                    </Grid>
                ) : ( 
                    <>
                        {isZero ? (
                            <Grid container justifyContent="center">
                                <h3>No Wallets!!</h3>
                            </Grid>
                        ) : (
                            <>
                                {/* 読み込み時以外は作成済みのウォレットの情報を表で出力する。 */}
                                <Grid container justifyContent="center">
                                    <Grid 
                                        container
                                        justifyContent="center"
                                        sx={{ 
                                            alignItems: 'center', 
                                            m: 1,
                                        }}
                                    >
                                        <p><strong>Wallet Info</strong></p>
                                    </Grid>
                                </Grid>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead sx={{backgroundColor:'black', color:'white'}}>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { wallets
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, i) => {
                                                    /* WalletTableコンポーネントに値を詰めて描画する。 */
                                                    return (
                                                        <WalletTable 
                                                            _wallet={row} 
                                                            _columns={columns} 
                                                            row={row} 
                                                            index={i} 
                                                            depositAction={(e) => {
                                                                handleOpen(row)
                                                            }}
                                                            showdetail={setShowWalletDetails}
                                                            setdetail={getwalletDetails}
                                                        />);
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={wallets.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </>
                        )}
                    </>
                )}
            </StyledPaper>
            <QrCodeDialog
                        tag={'Mulltisig Wallet Address'}
                        open={qrOpen}
                        did={walletDetails.wallet}
                        handleClose={(e) => {handleQrClose()}} 
                    />
            {showWalletDetails && 
                    <StyledPaper 
                    sx={{
                        my: 1, 
                        mx: "auto", 
                        mb:1,
                        p: 0,  
                        padding: "5px 10px",
                        marginTop: 4,
                        backgroundColor: 'whitesmoke', 
                        borderRadius:'10px',
                        boxShadow:'5px 5px 15px gray',
                        width:'70%',
                        
                    }}
                >
                    {isLoadingdetail ? (
                        <Grid container justifyContent="center">
                            <div className="loading">
                                <p><LoadingIndicator/></p>
                                <h3>Please Wait・・・・</h3>
                            </div>
                        </Grid>
                    ) : ( 
                        <>
                            <Grid 
                                container 
                                alignItems="center"
                                justifyContent="center"
                                sx={{width:'100%'}}
                                
                            >
                                <div style={{padding:'10px 20px'}}>
                                    <p style={{fontSize:'20px', fontWeight:400, color:'dodgerblue'}}>{`${walletDetails.wName} Deatils`}</p>
                                    <p style={{backgroundColor:'skyblue', padding:'10px', color:'white',width:'40%', borderRadius:'5px'}}>EVM XRP Sidechain</p>
                                    <p><span style={{color:'#c344fa', fontSize:'18px'}}>Address</span> : { `${walletDetails.wallet}`}</p>
                                    <div style={{display:'flex', justifyContent:'center',alignContent:'center', gap:'20px', border:'1px solid gray',padding:'5px', width:'25%'}}>
                                    <ContentCopyIcon className='pointer' fontSize="small" onClick={copy}/>
                                     <QrCodeIcon onClick={handleQrOpen}/>
                                    </div>
                                    <p><span style={{color:'#c344fa', fontSize:'18px'}}>Required</span> : {`${walletDetails.required}/${walletDetails.counts}`}</p>
                                    <p><span style={{color:'#c344fa', fontSize:'18px'}}>Total Balance</span> : {`${walletDetails.balance} XRP`}</p>
                                    
                                    <Link to={"/txs"} state={{addr: walletDetails.wallet}} style={{borderRadius:'5px',textDecoration:'none',backgroundColor:'#c344fa',color:'white', padding:'10px',width:'50%', fontSize:'18px', fontWeight:400}}>
                                        Transactions
                                    </Link>
                                </div>   
                          
                            </Grid>
                        </>
                    )}
                </StyledPaper>
            }
            {successFlg && (
                /* 成功時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="secdesc">Create Trasaction Successfull!!</div>
                </div>
            )}
            {failFlg && (
                /* 失敗時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="desc">Create Trasaction failfull..</div>
                </div>
            )}
        </MainContainer>
    );
}

export default Wallets;