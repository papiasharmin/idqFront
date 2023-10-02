import React, { useCallback, useEffect, useState } from 'react'
import './../../assets/css/App.css'
import { CurrentConfig } from '../../utils/config'
import { getCurrencyBalance, wrapETH } from '../../utils/walletinfoswap'
// import {
//   connectBrowserExtensionWallet,
//   getProvider,
//   getWalletAddress,
//   TransactionState,
// } from '../libs/providers'
import { getProvider } from '../hooks/UseContract'
import { executeRoute, generateRoute } from './../../utils/routing'
import { SwapRoute } from '@uniswap/smart-order-router'

const useOnBlockUpdated = (callback) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

const Example = () => {
  const [tokenInBalance, setTokenInBalance] = useState()
  const [tokenOutBalance, setTokenOutBalance] = useState()
 // const [txState, setTxState] = useState(TransactionState.New)
  const [blockNumber, setBlockNumber] = useState(0)

  const [route, setRoute] = useState(null)

  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber) => {
    refreshBalances()
    setBlockNumber(blockNumber)
  })

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = "0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6"
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])

  // Event Handlers

//   const onConnectWallet = useCallback(async () => {
//     if (await connectBrowserExtensionWallet()) {
//       refreshBalances()
//     }
//   }, [refreshBalances])

  const onCreateRoute = useCallback(async () => {
    setRoute(await generateRoute())
  }, [])

  const executeSwap = useCallback(async (route) => {
    if (!route) {
      return
    }
    //setTxState(TransactionState.Sending)
    //setTxState(await executeRoute(route))
  }, [])

  return (
    <div className="App">

      <h3>{`Wallet Address: ${"0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6"}`}</h3>
      <h3>{`Block Number: ${blockNumber + 1}`}</h3>
      <h3>{`Transaction State: ${''}`}</h3>
      <h3>{`Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`}</h3>
      <h3>{`Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`}</h3>
      <button
        onClick={onCreateRoute}
        disabled={
          //txState === TransactionState.Sending ||
          getProvider() === null 
        }>
        <p>Create Route</p>
      </button>
      <h3>

      </h3>
      <h3>
     
      </h3>
      <button
        onClick={() => wrapETH(100)}
        disabled={getProvider() === null }>
        <p>Wrap ETH</p>
      </button>
      <button
        onClick={() => executeSwap(route)}
        disabled={
          //txState === TransactionState.Sending ||
          getProvider() === null ||
         
          route === null
        }>
        <p>Swap Using Route</p>
      </button>
    </div>
  )
}

export default Example


// {route &&
//   `Route: ${CurrentConfig.tokens.amountIn} ${
//     CurrentConfig.tokens.in.symbol
//   } to ${route.quote.toExact()} ${
//     route.quote.currency.symbol
//   } using $${route.estimatedGasUsedUSD.toExact()} worth of gas`}

// {route &&
//   route.route
//     .map((r) => r.tokenPath.map((t) => t.symbol).join(' -> '))
//     .join(', ')}