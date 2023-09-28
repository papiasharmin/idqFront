/**
 * 各種定数を管理するためのファイル
 */


console.log('evn',process.env.PROJECT_ID)

// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0xf01605c54Cc3b0C45bbA011b028eF6e05C46Cc1e";//"0x8AE069aCb6ddF7B32b92fef419d30c30e4ED9D95";

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0x3Bdf037317Af5be7f623cEb0b94FB9a5dD5480db";//"0x80d6c044a4b9c1D969673cA750B669ADAAD9d5fe";

// chain ID 
export const CHAIN_ID = '1440002';//'80001';//'11155111'
// rpc URL 
export const RPC_URL = `https://rpc-evm-sidechain.xrpl.org`;//`https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://eth-sepolia.g.alchemy.com/v2/3fMr3CwsUtbgtcenWRgX9A0Cx9tkOfVr`;//
export const baseURL =`https://idq-api.vercel.app`;//`http://localhost:3001`;
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';

export const WIDTH_THRESHOLD = 768;
