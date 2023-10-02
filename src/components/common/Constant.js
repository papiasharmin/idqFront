/**
 * 各種定数を管理するためのファイル
 */

import { SupportedChainId, Token } from '@uniswap/sdk-core'
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

/////
//swap token config
// Addresses

export const V3_SWAP_ROUTER_ADDRESS =
  '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
export const WETH_CONTRACT_ADDRESS =
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

// Currencies and Tokens

export const XRP_TOKEN = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xCc2a9051E904916047c26C90f41c000D4f273456',
  6,
  'XRP',
)

export const MTN_TOKEN = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  MYTOKEN_ADDRESS,
  18,
  'MTN',
  'MyToken'
)

export const WETH_TOKEN = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 10000