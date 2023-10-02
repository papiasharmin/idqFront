// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from '@uniswap/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { providers } from 'ethers'
import {
  ERC20_ABI,
  WETH_ABI,
  WETH_CONTRACT_ADDRESS,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
} from './../components/common/Constant'
import { getProvider } from './../components/hooks/UseContract'
import { toReadableAmount } from './convertion'
import JSBI from 'jsbi'
//import { getProvider, getWalletAddress, sendTransaction } from './providers'

export async function getCurrencyBalance(
  provider,
  address,
  currency
){
  // Handle ETH directly
  if (currency.isNative) {
    return ethers.utils.formatEther(56)
  }

  // Get currency otherwise
  const walletContract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  )
  const balance = await walletContract.balanceOf(address)
  const decimals= await walletContract.decimals()

  // Format with proper units (approximate)
  return toReadableAmount(balance, decimals).toString()
}

// wraps ETH (rounding up to the nearest ETH for decimal places)
export async function wrapETH(eth) {

  const provider = getProvider()
  const address = "0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6"
  if (!provider || !address) {
    throw new Error('Cannot wrap ETH without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('deposit'),
    value: BigNumber.from(Math.ceil(eth))
      .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
      .toString(),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }

 /////////////////////
 // await sendTransaction(transaction)
}

// unwraps ETH (rounding up to the nearest ETH for decimal places)
export async function unwrapETH(eth) {
  const provider = getProvider()
  const address = "0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6"
  if (!provider || !address) {
    throw new Error('Cannot unwrap ETH without a provider and wallet address')
  }

  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  )

  const transaction = {
    data: wethContract.interface.encodeFunctionData('withdraw', [
      BigNumber.from(Math.ceil(eth))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
    from: address,
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }
  ///////////////////////////////
  ////////////////await sendTransaction(transaction)
}