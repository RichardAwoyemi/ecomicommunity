/* eslint-disable max-len */
export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_CREATOR_UID: "x-buyer-uid",
  X_PURCHASOR_UID: "x-purchasor-uid",
  X_CREATOR_RECEIVING_WALLET_ADDRESS: "x-creator-receiving-wallet-address",
  X_CREATOR_RECEIVING_VEVE_USERNAME: "x-creator-receiving-veve-username",
  X_PURCHASOR_SENDING_WALLET_ADDRESS: "x-purchasor-sending-wallet-address",
  X_PURCHASOR_SENDING_VEVE_USERNAME: "x-purchasor-sending-veve-username",
  X_ECOMI_CREATOR_SENDING_WALLET_ADDRESS: "x-ecomi-creator-sending-wallet-address",
  X_ECOMI_CREATOR_SENDING_VEVE_USERNAME: "x-ecomi-creator-sending-veve-username",
  X_ECOMI_PURCHASOR_RECEIVING_WALLET_ADDRESS: "x-ecomi-purchasor-receiving-wallet-address",
  X_ECOMI_PURCHASOR_RECEIVING_VEVE_USERNAME: "x-ecomi-purchasor-receiving-veve-username",
};

export interface ITransactionSummary {
  id: string,
  creator: IAmount
  purchasor: IAmount
}

export interface IAmount {
  userEmail: string;
  username: string;
  currency: string;
  units: number;
  networkSymbol: string,
  sendingWallet?: IWallet;
  receivingWallet?: IWallet;
  fees: IFees;
}

export interface IWallet {
  network?: string,
  networkSymbol?: string,
  walletAddress?: string;
  veveUsername?: string;
}

export interface IFees {
  networkFees: number;
  platformFees: number;
  totalPostFees: number;
}
