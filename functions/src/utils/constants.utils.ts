/* eslint-disable max-len */
import {AppTransactionCurrencies, NetworkSymbols} from "./enums.utils";
import {INetworkFees} from "./interfaces.utils";

export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_CREATOR_UID: "x-buyer-uid",
  X_PURCHASOR_UID: "x-purchasor-uid",
  X_CREATOR_RECEIVING_WALLET_ADDRESS: "x-creator-receiving-wallet-address",
  X_CREATOR_RECEIVING_VEVE_USERNAME: "x-creator-receiving-veve-username",
  X_PURCHASOR_SENDING_WALLET_ADDRESS: "x-purchasor-sending-wallet-address",
  X_PURCHASOR_SENDING_VEVE_USERNAME: "x-purchasor-sending-veve-username",
  X_ECOMI_RECEIVING_CREATOR_WALLET_ADDRESS: "x-ecomi-receiving-creator-wallet-address",
  X_ECOMI_RECEIVING_CREATOR_VEVE_USERNAME: "x-ecomi-receiving-creator-veve-username",
  X_ECOMI_RECEIVING_PURCHASOR_WALLET_ADDRESS: "x-ecomi-receiving-purchasor-wallet-address",
  X_ECOMI_RECEIVING_PURCHASOR_VEVE_USERNAME: "x-ecomi-receiving-purchasor-veve-username",
};

export const DEFAULT_NETWORKS = {
  [AppTransactionCurrencies.BNB]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.BTC]: NetworkSymbols.BTC,
  [AppTransactionCurrencies.DAI]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.GEMS]: NetworkSymbols.VEVE,
  [AppTransactionCurrencies.OMI]: NetworkSymbols.GO,
  [AppTransactionCurrencies.USDC]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.USDT]: NetworkSymbols.BEP20,
};

export const INTERNAL_NETWORK_ADDRESSES = {
  [NetworkSymbols.ERC20]: "0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce",
  [NetworkSymbols.BEP20]: "0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce",
  [NetworkSymbols.BTC]: "BTC-TODO",
  [NetworkSymbols.GO]: "GO-TODO",
  [NetworkSymbols.VEVE]: "VEVE-TODO",
};

export const NETWORK_FEES_PC: INetworkFees = {
  [AppTransactionCurrencies.BNB]: [
    {symbol: NetworkSymbols.ERC20, fee: 0.05, minimum: 0.5},
    {symbol: NetworkSymbols.BEP20, fee: 0.01, minimum: 0.5},
  ],
  [AppTransactionCurrencies.BTC]: [
    {symbol: NetworkSymbols.BTC, fee: 0.0005, minimum: 0.005},
  ],
  [AppTransactionCurrencies.DAI]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250},
    {symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250},
  ],
  [AppTransactionCurrencies.GEMS]: [
    {symbol: NetworkSymbols.VEVE, fee: 0, minimum: 250},
  ],
  [AppTransactionCurrencies.OMI]: [
    {symbol: NetworkSymbols.GO, fee: 1000, minimum: 50000},
  ],
  [AppTransactionCurrencies.USDC]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250},
    {symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250},
  ],
  [AppTransactionCurrencies.USDT]: [
    {symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250},
    {symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250},
  ],
};
