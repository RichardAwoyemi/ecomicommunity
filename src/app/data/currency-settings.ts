import { AppTransactionCurrencies } from '../state/app.enums';

export enum Networks {
  ERC20 = 'Ethereum Network (ERC20)',
  BEP20 = 'Binance Smart Chain (BEP20)',
  BTC = 'Bitcoin (BTC)',
  GO = 'GoChain (GO)',
  VEVE = 'VeVe App',
}

export enum NetworkSymbols {
  ERC20 = 'ERC20',
  BEP20 = 'BEP20',
  BTC = 'BTC',
  GO = 'GO',
  VEVE = 'VEVE',
}

interface INetworkFees {
  [network: string]: INetworkDetails[];
}

interface INetworkDetails {
  symbol: NetworkSymbols;
  fee: number;
  minimum: number;
}


export const DEFAULT_NETWORKS = {
  [AppTransactionCurrencies.BNB]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.BTC]: NetworkSymbols.BTC,
  [AppTransactionCurrencies.DAI]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.GEMS]: NetworkSymbols.VEVE,
  [AppTransactionCurrencies.OMI]: NetworkSymbols.GO,
  [AppTransactionCurrencies.USDC]: NetworkSymbols.BEP20,
  [AppTransactionCurrencies.USDT]: NetworkSymbols.BEP20,
};

export const NETWORK_FEES_PC: INetworkFees = {
  [AppTransactionCurrencies.BNB]: [
    { symbol: NetworkSymbols.ERC20, fee: 0.05, minimum: 0.5 },
    { symbol: NetworkSymbols.BEP20, fee: 0.01, minimum: 0.5 },
  ],
  [AppTransactionCurrencies.BTC]: [
    { symbol: NetworkSymbols.BTC, fee: 0.0005, minimum: 0.005 },
  ],
  [AppTransactionCurrencies.DAI]: [
    { symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250 },
  ],
  [AppTransactionCurrencies.GEMS]: [
    { symbol: NetworkSymbols.VEVE, fee: 0, minimum: 250 },
  ],
  [AppTransactionCurrencies.OMI]: [
    { symbol: NetworkSymbols.GO, fee: 1000, minimum: 50000 },
  ],
  [AppTransactionCurrencies.USDC]: [
    { symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250 },
  ],
  [AppTransactionCurrencies.USDT]: [
    { symbol: NetworkSymbols.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbols.BEP20, fee: 5, minimum: 250 },
  ],
};
