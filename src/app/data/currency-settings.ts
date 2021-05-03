import { AppTransactionCurrencies } from '../state/app.enums';

export enum CurrencyNetworks {
  ERC20 = 'Ethereum Network (ERC20)',
  BEP20 = 'Binance Smart Chain (BEP20)',
  BTC = 'Bitcoin (BTC)',
  GO = 'GoChain (GO)',
  VEVE = 'VeVe App',
}

enum NetworkSymbol {
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
  symbol: NetworkSymbol;
  fee: number;
  minimum: number;
}

export const DEFAULT_NETWORKS = {
  [AppTransactionCurrencies.BNB]: NetworkSymbol.BEP20,
  [AppTransactionCurrencies.BTC]: NetworkSymbol.BTC,
  [AppTransactionCurrencies.DAI]: NetworkSymbol.BEP20,
  [AppTransactionCurrencies.GEMS]: NetworkSymbol.VEVE,
  [AppTransactionCurrencies.OMI]: NetworkSymbol.GO,
  [AppTransactionCurrencies.USDC]: NetworkSymbol.BEP20,
  [AppTransactionCurrencies.USDT]: NetworkSymbol.BEP20,
};

export const NETWORK_FEES_PC: INetworkFees = {
  [AppTransactionCurrencies.BNB]: [
    { symbol: NetworkSymbol.ERC20, fee: 0.05, minimum: 0.5 },
    { symbol: NetworkSymbol.BEP20, fee: 0.01, minimum: 0.5 },
  ],
  [AppTransactionCurrencies.BTC]: [
    { symbol: NetworkSymbol.BTC, fee: 0.01, minimum: 0.005 },
  ],
  [AppTransactionCurrencies.DAI]: [
    { symbol: NetworkSymbol.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbol.BEP20, fee: 5, minimum: 250 },
  ],
  [AppTransactionCurrencies.GEMS]: [
    { symbol: NetworkSymbol.VEVE, fee: 0, minimum: 250 },
  ],
  [AppTransactionCurrencies.OMI]: [
    { symbol: NetworkSymbol.GO, fee: 1000, minimum: 50000 },
  ],
  [AppTransactionCurrencies.USDC]: [
    { symbol: NetworkSymbol.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbol.BEP20, fee: 5, minimum: 250 },
  ],
  [AppTransactionCurrencies.USDT]: [
    { symbol: NetworkSymbol.ERC20, fee: 30, minimum: 250 },
    { symbol: NetworkSymbol.BEP20, fee: 5, minimum: 250 },
  ],
};
