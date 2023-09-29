/**
 * スマートコントラクトやウォレット接続などのWeb3関連の処理をまとめたhookコンポーネントファイル
 */

//import Web3 from 'web3';
import MultiSigWallet from './../../contracts/MultiSigWallet.json';
import MyToken from './../../contracts/MyToken.json';
import WalletFactory from './../../contracts/WalletFactoryV4.json';
import { CHAIN_ID, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL } from "./../common/Constant";
import { ethers } from 'ethers';


/**
 * createContractObject メソッド
 * @param contractAbi コントラクトABI
 * @param contractAddress コントラクトアドレス
 */

console.log('CHAIN',CHAIN_ID,RPC_URL)
const createContractObject = ( contractAbi, contractAddress) => {
      // get provider

      let provider = new ethers.providers.JsonRpcProvider(RPC_URL);//new ethers.JsonRpcProvider(RPC_URL);
      let contract = new ethers.Contract(contractAddress, contractAbi, provider)
      
      return contract
};

// import the builder util


// web3wallet.on('session_proposal', async sessionProposal => {
//   const { id, params } = sessionProposal

//   // ------- namespaces builder util ------------ //
//   const approvedNamespaces = buildApprovedNamespaces({
//     proposal: params,
//     supportedNamespaces: {
//       eip155: {
//         chains: ['eip155:80001'],
//         methods: ['eth_sendTransaction', 'personal_sign'],
//         events: ['accountsChanged', 'chainChanged'],
//         accounts: [
//           'eip155:80001:0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6',
         
//         ]
//       }
//     }
//   })
//   // ------- end namespaces builder util ------------ //

//   const session = await web3wallet.approveSession({
//     id,
//     namespaces: approvedNamespaces
//   })
// })


//     const {topic, uri} = await AuthClient.core.pairing.create()
//     await web3wallet.pair({ uri })

/**
 * connectWallet メソッド
 */
 export const connectWallet = async() => {
      // create bloctoSDK object
      // const bloctoSDK = new BloctoSDK({
      //       ethereum: {
      //           chainId: CHAIN_ID, 
      //           rpc: RPC_URL,
      //       }
      // });
      // // request
      // const signers = await bloctoSDK.ethereum.request({ method: 'eth_requestAccounts' });
      
      // const signer = signers[0]
      
      // console.log('BLOCKTO',bloctoSDK.ethereum, signers)
      
// console.log("process.env.CONNECT_KEY", process.env.CONNECT_KEY)
// const authClient = await AuthClient.init({
//   projectId: "6df1086ec4c69b1400bf2426405b9a93",
//   metadata: {
//     name: 'idq-soul-wallet',
//     description: 'A wallet using WalletConnect AuthClient',
//     url: 'https://idq-front.vercel.app',
//     icons: ['']
//   }
// })
//       //console.log(authClient.emit("auth_request"))
//       authClient.emit("auth_request")
//       authClient.on('auth_request', async ({ id, params }) => {
//             // the user’s address
//             let wallet = ethers.Wallet.createRandom()
//             const iss = `did:pkh:eip155:80001:${wallet.address}`
          
//             // format the cacao payload with the user’s address
//             const message = authClient.formatMessage(params.cacaoPayload, iss)
          
//             // This is a good point to trigger a UI event to provide the user
//             // with a button to accept or reject the authentication request,
//             // instead of automatically responding.
//             const signature = await wallet.signMessage(message)
          
//             await authClient.respond(
//               {
//                 id: id,
//                 signature: {
//                   s: signature,
//                   t: 'eip191'
//                 }
//               },
//               iss
//             )
          
//           })
//           const {topic, uri} = await authClient.core.pairing.create()
//           await authClient.core.pairing.pair({ uri })

          
      
 };

/**
 * getDidメソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getDid = async(signer) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
       
       const result = await FactoryContract.dids(signer) 
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
      const num = await MyTokenContract.balanceOf(signer)
 
      return Number(num);
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

export const userexist = async(email) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get status info
      var status = await FactoryContract.pass(email)
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
      
      return Number(count);
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
       let balance = await WalletContract.getAsset();
       let ownersaddr = await WalletContract.getOwners();
       required = Number(required);
       counts = Number(counts)
       balance = ethers.utils.formatEther( Number(balance).toString())
      console.log('walletinfo',required, counts, balance, ownersaddr)
      return {
            wName,
             required,
             counts,
             ownersaddr,
             balance
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
       console.log('aprove',approvement)
      return Number(approvement);
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
      console.log('require',req)
      return Number(req);
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



