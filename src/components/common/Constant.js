/**
 * 各種定数を管理するためのファイル
 */


console.log('evn',process.env.PROJECT_ID)

// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0x15F4b22e1312E55FE3e75D789728d2afe219f81d";

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0x7eFb830f31055e545751603560b78105df49D753";

// chain ID 
export const CHAIN_ID = '80001';//'1440002';//'11155111'
// rpc URL 
export const RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://eth-sepolia.g.alchemy.com/v2/3fMr3CwsUtbgtcenWRgX9A0Cx9tkOfVr`;//`https://rpc-evm-sidechain.xrpl.org`;
export const baseURL =`https://idq-api.vercel.app`;//`http://localhost:3001`;//
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';

export const WIDTH_THRESHOLD = 768;
