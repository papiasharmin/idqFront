// mui関連のコンポーネントのインポート
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionButton2 from '../../common/ActionButton2';
import './../../../assets/css/App.css';
import {
    getWalletInfo
} from './../../hooks/UseContract';

/**
 * WalletTable
 * @param props 引数
 */
const WalletTable = (props) => {

    // propsから引数を取得する。
    const { 
        _wallet, 
        _columns, 
        row, 
        index, 
        depositAction,
        showdetail,
        setdetail
    } = props;

    // ウォレットの名前を格納するステート変数
    const [name, setName] = useState(null); 
    // ウォレットのアドレスを格納するステート変数
    const [addr, setAddr] = useState(null);
    // ownerの数を格納するステート変数
    const [ownerCounts, setOwnerCounts] = useState(null);
    // 閾値を格納するステート変数
    const [req, setReq] = useState(null);
    const [asset, setAsset] = useState(null);

    // トランザクション一覧画面に渡す要素
    const toTx = {
        addr: addr,
    };

    /**
     * initialization
     */
    const init = async(wallet) => {
        // ウォレットコントラクトの各情報を取得する。
    //     const { 
    //         wName,
    //         required,
    //         counts,
    //         ownersaddr,
    //          balance
            
    //     } = await getWalletInfo(wallet);
        
    //     // ステート変数に格納する。
    //     console.log('walletinfoprob',required,counts)
    //    setdetail({wName, required,counts,balance, wallet})
        setAddr(wallet);
        
     
    };

    // 副作用フック
    useEffect(() => {
        init(_wallet);
    }, [_wallet]);

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            {_columns.map((column) => {
                // セルに格納する値用の変数
                let value = row; 
                // カラムの値により、セットする値を変更する。
                if(column.label === "No.") {
                    return (
                        <TableCell style={{fontSize:'18px', fontWeight: 400}} key={column.id} align={column.align}>
                            {index + 1}
                        </TableCell>
                    );
                }
                if(column.label === "Address") {
                    return (
                        <TableCell style={{color: 'rgb(173, 84, 250)', fontSize:'18px'}}key={column.id} align={column.align}>
                            {_wallet}
                        </TableCell>
                    );
                }
                if(column.label === "Detail") {
                    return (
                        <TableCell key={column.id} align={column.align}>
                           <ActionButton2 buttonName="detail" color="primary" clickAction={()=>{setdetail(_wallet)
                            showdetail(true)}} />
                        </TableCell>
                    )
                } 
                if(column.label === "Deposit") {
                    return (
                        <TableCell key={column.id} align={column.align}>
                           <ActionButton2 buttonName="deposit" color="primary" clickAction={depositAction} />
                        </TableCell>
                    )
                }   
    
            })}
        </TableRow>
    )
    
};

export default WalletTable;