/* eslint-disable require-jsdoc */
import {
  AppTransactionCurrencies,
  AppTransactionItemTypes,
  AppTransactionStates,
  Networks,
  NetworkSymbols,
} from "./enums.utils";

export interface IUserPrivate {
    uid: string | undefined;
    secret: string;
}

export interface IUser {
    email: string | null | undefined;
    uid: string | undefined;
    username: string | null | undefined;
    secret?: string | null | undefined;
    photoURL?: string | null;
}

export class User implements IUser {
  constructor(
        public email: string,
        public uid: string | undefined,
        public username: string,
        public secret?: string | undefined,
        public photoURL?: string | null
  ) { }
}

export interface Credentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface ITransaction {
    id?: string;
    creator: IAmount;
    purchasor: IAmount;
    status?: AppTransactionStates;
    datePosted?: string;
}

export interface IAmount {
    useruid?: string;
    email?: string;
    username?: string;
    itemType?: AppTransactionItemTypes;
    sendingCurrency?: AppTransactionCurrencies;
    sendingUnits?: number;
    sendingWallet?: IWallet;
    receivingWallet?: IWallet;
    platformReceivingWallet?: IWallet;
    receivingFees?: IFees;
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

export interface INetworkFees {
    [network: string]: INetworkDetails[];
}

export interface INetworkDetails {
    symbol: NetworkSymbols;
    fee: number;
    minimum: number;
}
