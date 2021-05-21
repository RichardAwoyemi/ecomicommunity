/* eslint-disable max-len */
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
  ecomiReceivingWallet?: IWallet;
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

export enum NetworkAddresses {
  ERC20 = "0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce",
  BEP20 = "0xA6B300A0F83a3D49b720F1B5734Fee4A59AEddce",
  BTC = "",
  GO = "",
  VEVE = "",
}
