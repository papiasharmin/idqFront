/**
 * 各種定数を管理するためのファイル
 */


console.log('evn',process.env.PROJECT_ID)

// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0xd13693f8458e9faDDDeB1Aec354A594A98934f65";// '0x36DaB5fD351E0460A9EBC9b01f9ab957A1374Dda';//"0x36DaB5fD351E0460A9EBC9b01f9ab957A1374Dda";

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0xBd2BED22E528070668E22eE3243E7dDBb6F1577a";//'0x80B5C9C3fAe313C408496dC6E9D9604cE92ca360';//"0x80B5C9C3fAe313C408496dC6E9D9604cE92ca360"; 

// chain ID 
export const CHAIN_ID = '80001';//'1440002';//
// rpc URL 
export const RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://rpc-evm-sidechain.xrpl.org`;//`https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://eth-goerli.g.alchemy.com/v2/${PROJECT_ID}`;
// API Base URL
export const baseURL =`https://idq-api.vercel.app`;//; `http://localhost:3001`//
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';

export const WIDTH_THRESHOLD = 768;
