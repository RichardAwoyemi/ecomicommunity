import { AppTransactionStates } from './app.enums';

export interface IUser {
  email: string | null | undefined;
  uid: string | undefined;
  username: string | null | undefined;
  photoURL?: string | null;
}

export class User implements IUser {
  constructor(
    public email: string,
    public uid: string | undefined,
    public username: string,
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
  userid: string;
  selling: IAmount;
  price: IAmount;
  status?: AppTransactionStates;
  datePosted?: string;
}

export interface IAmount {
  currency?: string;
  units?: number;
}
