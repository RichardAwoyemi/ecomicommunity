export interface IUser {
  email: string | null | undefined;
  uid: string | undefined;
  emailVerified: boolean | undefined;
  photoURL?: string | null;
}

export class User implements IUser {

  constructor(public email: string,
              public uid: string | undefined,
              public emailVerified: boolean,
              public photoURL?: string | null,
  ) {
  }
}

export interface Credentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ITransaction {
  selling: {
    type: string;
    unit: number;
    
  }[]
}
