/* eslint-disable max-len */
import {AppTransactionCurrencies, NetworkSymbols} from "./enums.utils";
import {INetworkFees} from "./interfaces.utils";

export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_CREATOR_UID: "x-buyer-uid",
  X_PURCHASOR_UID: "x-purchasor-uid",
  X_PURCHASOR_EMAIL: "x-purchasor-email",
  X_PURCHASOR_USERNAME: "x-purchasor-username",
  X_PURCHASOR_RECEIVING_WALLET_ADDRESS: "x-purchasor-receiving-wallet-address",
  X_PURCHASOR_RECEIVING_VEVE_USERNAME: "x-purchasor-receiving-veve-username",
  X_PURCHASOR_SENDING_WALLET_ADDRESS: "x-purchasor-sending-wallet-address",
  X_PURCHASOR_SENDING_VEVE_USERNAME: "x-purchasor-sending-veve-username",
};

export const DEFAULT_NETWORKS = {
  [AppTransactionCurrencies.BNB]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.BTC]: NetworkSymbols.BTC,
  [AppTransactionCurrencies.DAI]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.GEMS]: NetworkSymbols.VEVE,
  [AppTransactionCurrencies.OMI]: NetworkSymbols.GO20,
  [AppTransactionCurrencies.USDC]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.USDT]: NetworkSymbols.TRC20,
};

export const INTERNAL_NETWORK_ADDRESSES = {
  [NetworkSymbols.ERC20]: "0x518Ed2A0C418Cd90828983268f4adc25090E4De6",
  [NetworkSymbols.BEP20]: "0x518Ed2A0C418Cd90828983268f4adc25090E4De6",
  [NetworkSymbols.BEP2]: "bnb1nhu2h8zhn4d5mspnpsve5qdwtcjurtqeszgc88",
  [NetworkSymbols.BTC]: "bc1ql80kha3ry679a4e2z957pwle6pm34jfzwtlxyq",
  [NetworkSymbols.GO20]: "0x7Eb0DFD3331C13c51b2CC8Ce2eb14C27628c18Cb",
  [NetworkSymbols.TRC20]: "TTsxFGWmh5Ni9mCZyBKYNDKZU9B2rm6kyY",
  [NetworkSymbols.VEVE]: "845dccc4-38f2-4963-bca8-7b2cbbdaaa2b",
};

export const NETWORK_FEES_PC: INetworkFees = {
  [AppTransactionCurrencies.BNB]: [
    {symbol: NetworkSymbols.ERC20, fee: 0.05, minimum: 0.5, default: 3.5},
    {symbol: NetworkSymbols.BEP20, fee: 0.01, minimum: 0.5, default: 3.5},
    {symbol: NetworkSymbols.BEP2, fee: 0.01, minimum: 0.5, default: 3.5},
  ],
  [AppTransactionCurrencies.BTC]: [
    {symbol: NetworkSymbols.BTC, fee: 0.0005, minimum: 0.005, default: 0.05},
  ],
  [AppTransactionCurrencies.DAI]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.BEP2, fee: 5, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250, default: 1000},
  ],
  [AppTransactionCurrencies.GEMS]: [
    {symbol: NetworkSymbols.VEVE, fee: 0, minimum: 250, default: 1000},
  ],
  [AppTransactionCurrencies.OMI]: [
    {symbol: NetworkSymbols.GO20, fee: 1000, minimum: 100000, default: 500000},
  ],
  [AppTransactionCurrencies.USDC]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.BEP2, fee: 5, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250, default: 1000},
  ],
  [AppTransactionCurrencies.USDT]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.BEP2, fee: 5, minimum: 250, default: 1000},
    {symbol: NetworkSymbols.TRC20, fee: 5, minimum: 250, default: 1000},
  ],
};
