import { AppTransactionStates, AppTransactionCurrencies } from './app.enums';

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
  price: IAmount;
  status?: AppTransactionStates;
  datePosted?: string;
  buyer?: IUser;
  sellerUid: string;
  sellerUsername: string;
}

export interface IAmount {
  currency?: string;
  units?: number;
}
