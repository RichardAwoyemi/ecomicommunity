export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_BUYER_UID: "x-buyer-uid",
  X_SELLER_UID: "x-seller-uid",
  X_BUYER_WALLET_ADDRESS: "x-buyer-wallet-address",
  X_BUYER_VEVE_USERNAME: "x-buyer-veve-username",
};

export interface ITransactionSummary {
  id: string,
  buying: IAmount
  selling: IAmount
}


export interface IAmount {
  useruid?: string;
  username?: string;
  itemType?: AppTransactionItemTypes;
  currency?: AppTransactionCurrencies;
  units?: number;
  sendingWallet?: IWallet;
  receivingWallet?: IWallet;
  fees?: IFees;
}

export interface IWallet {
  network?: Networks,
  networkSymbol?: NetworkSymbols,
  walletAddress?: string;
  veveUsername?: string;
}

export interface IFees {
  networkFees: number;
  platformFees: number;
  totalPostFees: number;
}

export enum AppTransactionItemTypes {
  Collectible = 'Collectible',
  Currency = 'Currency',
}

export enum AppTransactionCurrencies {
  GEMS = 'GEMS',
  BTC = 'BTC',
  BNB = 'BNB',
  DAI = 'DAI',
  OMI = 'OMI',
  USDC = 'USDC',
  USDT = 'USDT',
}

export enum Networks {
  ERC20 = 'Ethereum Network (ERC20)',
  BEP20 = 'Binance Smart Chain (BEP20)',
  BTC = 'Bitcoin (BTC)',
  GO = 'GoChain (GO)',
  VEVE = 'VeVe App',
  NULL = 'NULL'
}

export enum NetworkSymbols {
  ERC20 = 'ERC20',
  BEP20 = 'BEP20',
  BTC = 'BTC',
  GO = 'GO',
  VEVE = 'VEVE'
}

export enum NetworkAddresses {
  ERC20 = '0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce',
  BEP20 = '0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce',
  BTC = '',
  GO = '',
  VEVE = '',
}