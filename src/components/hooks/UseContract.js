/**
 * スマートコントラクトやウォレット接続などのWeb3関連の処理をまとめたhookコンポーネントファイル
 */
import BloctoSDK from '@blocto/sdk';
//import Web3 from 'web3';
import MultiSigWallet from './../../contracts/MultiSigWallet.json';
import MyToken from './../../contracts/MyToken.json';
import WalletFactory from './../../contracts/WalletFactoryV4.json';
import { CHAIN_ID, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL } from "./../common/Constant";
import { ethers } from 'ethers';
/**
 * getProvider メソッド
 */
// export const getProvider = () => {
//       // get provider
//       const provider = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`);
//       return provider;
// };

/**
 * createContractObject メソッド
 * @param contractAbi コントラクトABI
 * @param contractAddress コントラクトアドレス
 */
const createContractObject = ( contractAbi, contractAddress) => {
      // get provider
      //const provider = getProvider();
      let provider = new ethers.AlchemyProvider("maticmum","EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP");
      let contract = new ethers.Contract(contractAddress, contractAbi,provider)

      let newobj = new ethers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');
      let conxrp = new ethers.Contract(contractAddress, contractAbi, newobj)
      
      //console.log('dids',contract.getFunction("dids"))
      // create Contract Object
      //const ContractObject = new provider.eth.Contract(contractAbi, contractAddress);
      //return ContractObject;
      
      console.log('XRP', contract, conxrp)
      return contract
};

/**
 * connectWallet メソッド
 */
export const connectWallet = async() => {
      // create bloctoSDK object
      const bloctoSDK = new BloctoSDK({
            ethereum: {
                chainId: 80001, 
                rpc: `https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`,
            }
      });
      // request
      const signers = await bloctoSDK.ethereum.request({ method: 'eth_requestAccounts' });
      
      const signer = signers[0]
      
      console.log('BLOCKTO',bloctoSDK.ethereum, signers)
      return {
            bloctoSDK,
            signer
      };
};

/**
 * getDidメソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getDid = async(signer) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
       //console.log('DIDFACTORY',await FactoryContract.getAddress())
       const result = await FactoryContract.dids(signer) //await FactoryContract.methods.dids(signer).call();
       console.log('FACTORIDD', result)
      return result;
};

/**
 * getTokenBalanceOf メソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getTokenBalanceOf = async(signer) => {
      // call createContractObject メソッド
      const MyTokenContract  = createContractObject(MyToken.abi, MYTOKEN_ADDRESS);
      // get token balance
      const num = await MyTokenContract.balanceOf(signer)//await MyTokenContract.methods.balanceOf(signer).call();
      return num;
};

/**
 * getRegisterStatusメソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getRegisterStatus = async(signer) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get status info
      var status = await FactoryContract.isRegistered(signer)
      return status;
};

/**
 * getVcsメソッド
 * @param did ログイン中のdid情報
 */
export const getVcs = async(did) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      var vcs = await FactoryContract.getVcs(did);
      console.log('VCS', vcs)
      return vcs;
};

/**
 * walletsCountメソッド
 */
export const walletsCount = async() => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get wallet addresses
      const count = await FactoryContract.walletsCount();
      
      return count;
};


/**
 * getWalletsメソッド
 * @param count count 
 * @param start start
 */
export const getWallets = async(count, start) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      const multiSigWallets = await FactoryContract.getWallets(count, start);
     
      return multiSigWallets;
};



/**
 * getWalletInfoメソッド
 * @param addr ウォレットアドレス
 */
export const getWalletInfo = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      //console.log('',WalletContract.methods)
      // get Verifiable Credentials info
       const wName = await WalletContract.getName();
       let required = await WalletContract.getRequired();
       let counts = await WalletContract.getOwnersCount();
       required = Number(required);
       counts = Number(counts)
      console.log('walletinfo',required, counts)
      return {
            wName,
             required,
             counts
      };
};

/**
 * getApprovalCount メソッド
 * @param addr ウォレットアドレス
 * @param index ウォレットID
 */
export const getApprovalCount = async(addr, index) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // 承認済みの数を求める
      const approvement = await WalletContract._getApprovalCount(index);

      return approvement;
}; 

/**
 * getRequired メソッド
 * @param addr ウォレットアドレス
 */
export const getRequired = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // 閾値を取得する。
      const req = await WalletContract.getRequired();

      return req;
}; 

/**
 * getTxs メソッド
 * @param addr ウォレットアドレス
 */
export const getTxs = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // トランザクションの情報を取得する。
      const transactions = await WalletContract.getTxs();
      console.log('transactions',transactions)
      return transactions;
};