import { AppTransactionStates, AppTransactionCurrencies } from './app.enums';
import { Networks, NetworkSymbols } from '../data/currency-settings';

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
  ) {}
}

export class ExistingUser implements IUser {
  constructor(
    public email: string,
    public uid: string,
    public username: string,
    public secret: string,
    public photoURL?: string | null
  ) {}
}

export interface Credentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ITransaction {
  id?: string;
  selling: IAmount;
  buying: IAmount;
  status?: AppTransactionStates;
  datePosted?: string;
}

export interface IAmount {
  useruid?: string;
  username?: string;
  currency?: AppTransactionCurrencies;
  units?: number;
  sendingWallet?: IWallet;
  receivingWallet?: IWallet;
  veveUsername?: string;
  fees?: IFees;
}

export interface IWallet {
  network?: Networks,
  networkSymbol?: NetworkSymbols,
  walletAddress?: string;
}

export interface IFees {
  networkFees: number;
  platformFees: number;
  totalPostFees: number;
}
