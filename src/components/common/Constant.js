/**
 * 各種定数を管理するためのファイル
 */


console.log('evn',process.env.PROJECT_ID)

// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0xec658386F735c4f02BA0B4CCC21A4a35bc87CD1D";//"0xd13693f8458e9faDDDeB1Aec354A594A98934f65";

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0xc103760cEdB83C39C9d3E7547681861a1d5110df";//"0xBd2BED22E528070668E22eE3243E7dDBb6F1577a";

// chain ID 
export const CHAIN_ID = '11155111';//'80001';//'1440002';//
// rpc URL 
export const RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/3fMr3CwsUtbgtcenWRgX9A0Cx9tkOfVr`;//`https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://rpc-evm-sidechain.xrpl.org`;
export const baseURL =`http://localhost:3001`;//`https://idq-api.vercel.app`;
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';

export const WIDTH_THRESHOLD = 768;
