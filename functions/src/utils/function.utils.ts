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
  userEmail: string;
  username: string;
  currency: string;
  units: number;
  networkSymbol: string,
  walletAddress: string;
  veveUsername?: string;
  fees: IFees;
}

export interface IFees {
  networkFees: number;
  platformFees: number;
  totalPostFees: number;
}
