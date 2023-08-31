/**
 * 各種定数を管理するためのファイル
 */


console.log('evn',process.env.PROJECT_ID)

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0xBf5a606bd2A354e4510A641bdf643A36D2f10445"//"0x80B5C9C3fAe313C408496dC6E9D9604cE92ca360"; 
// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0x8dDbFD6f1832e0B1342E5871c6a8De4D8549Ca27"//"0x36DaB5fD351E0460A9EBC9b01f9ab957A1374Dda";
// chain ID 
export const CHAIN_ID = '80001';
// rpc URL 
export const RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://eth-goerli.g.alchemy.com/v2/${PROJECT_ID}`;
// API Base URL
export const baseURL = `http://localhost:3001`;//'https://idq-fufksazl0-papiasharmin.vercel.app';
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';
// width threshold
export const WIDTH_THRESHOLD = 768;
