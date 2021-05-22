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
