/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser, ITransaction, IAmount } from './app.model';
import { AppModalStates, AppDropdownState } from './app.enums';

export enum AppActionTypes {
  IsLoggedIn = '[App] Is Logged In',
  ShowModal = '[App] Show Modal',
  ToggleDropdown = '[App] Toggle Dropdown',
  SetDropdownOption = '[App] Set Dropdown Option',
  CredentialsLogin = '[App] [Login] Credentials Login Attempt',
  CredentialsLoginFailure = '[App] [Login] Credentials Login Error',
  CredentialsLoginSuccess = '[App] [Login] Credentials Login Success',
  CredentialsLoginVerification = '[App] [Signup] Credentials Login Email Verifcation Check',
  CredentialsRegistration = '[App] [Signup] Credentials Registration Attempt',
  CredentialsRegistrationFailure = '[App] [Signup] Credentials Registration Failure',
  CredentialsRegistrationSuccess = '[App] [Signup] Credentials Registration Success',
  LogoutUser = '[App] [Logout] Logout User',
  ResetSignupError = '[App] [Signup] Reset Sign Up Error Message',
  ResetLoginError = '[App] [Login] Reset Login Error Message',
  GetTransactions = '[App] [Transactions] Get Full Transaction List',
  SetTransactions = '[App] [Transactions] Set Full Transaction List',
  DeleteTransaction = '[App] [Transaction] Delete Transaction from the table by ID',
  SetActiveTransaction = '[App] [Transaction] Set Active Transaction',
  ResetNewTransaction = '[App] [Transaction] Reset New Transaction',
  ConfirmPurchase = '[App] Confirm Purchase',
  AddTransaction = '[App] [Transactions] Add New Transaction',
  SetSaleItems = '[App] [Transactions] Set Sale Assets',
  SetBuyItems = '[App] [Transactions] Set Buying Assets',
  SetUser = '[App] [Login] Set User',
  GetUser = '[App] [Login] Get User Info',
  ClearUser = '[App] [Login] Clear User Info',
  SetEmailVerificationFailMessage = "[App] [Login] Email Verification Failed",
  EmailVerificationFailure = "[App] [Login] Email Verification Failure",
  PersistUser = '[App] [Register] Perist User',
  ToggleNavbar = '[App] Toggle Navbar',
  ToggleEmailConsent = '[App] Toggle Email Consent',
  ToggleRememberMe = '[App] Toggle Remember Me',
  ResetPurchaseModal = '[App] [Transaction] [Purchase] Reset Purchase Modal'
}

export const isLoggedIn = createAction(AppActionTypes.IsLoggedIn);
export const toggleNavbar = createAction(AppActionTypes.ToggleNavbar);
export const toggleEmailConsent = createAction(
  AppActionTypes.ToggleEmailConsent
);
export const toggleRememberMe = createAction(AppActionTypes.ToggleRememberMe);

export const setDropdownOption = createAction(
  AppActionTypes.SetDropdownOption,
  props<{ dropdownOption: string }>()
);

export const showModal = createAction(
  AppActionTypes.ShowModal,
  props<{ modalState: AppModalStates }>()
);

export const toggleDropdown = createAction(
  AppActionTypes.ToggleDropdown,
  props<{ dropdownState: AppDropdownState }>()
);

export const credentialsLogin = createAction(
  AppActionTypes.CredentialsLogin,
  props<{
    email: string;
    password: string;
    remember?: boolean;
  }>()
);

export const credentialsLoginFailure = createAction(
  AppActionTypes.CredentialsLoginFailure,
  props<{ error: { code: string; message: string } }>()
);

export const credentialsLoginSuccess = createAction(
  AppActionTypes.CredentialsLoginSuccess,
  props<{ user: IUser }>()
);

export const credentialsLoginVerification = createAction(
  AppActionTypes.CredentialsLoginVerification,
  props<{ user: IUser }>()
);

export const credentialsRegistration = createAction(
  AppActionTypes.CredentialsRegistration,
  props<{
    email: string;
    password: string;
    username: string;
    remember?: boolean;
  }>()
);

export const credentialsRegistrationFailure = createAction(
  AppActionTypes.CredentialsRegistrationFailure,
  props<{ error: { code: string; message: string } }>()
);

export const credentialsRegistrationSuccess = createAction(
  AppActionTypes.CredentialsRegistrationSuccess
);

export const resetLoginError = createAction(AppActionTypes.ResetLoginError);
export const resetSignupError = createAction(AppActionTypes.ResetSignupError);
export const logoutUser = createAction(AppActionTypes.LogoutUser);
export const clearUser = createAction(AppActionTypes.ClearUser);

export const setUser = createAction(
  AppActionTypes.SetUser,
  props<{ user: firebase.auth.UserCredential }>()
);

export const persistUser = createAction(
  AppActionTypes.PersistUser,
  props<{ user: IUser }>()
);

export const setEmailVerificationFailMessage = createAction(
  AppActionTypes.SetEmailVerificationFailMessage,
);

export const emailVerificationFailure = createAction(
  AppActionTypes.EmailVerificationFailure,
);

export const getUser = createAction(
  AppActionTypes.GetUser,
  props<{ key: string }>()
);

export const getTransactions = createAction(AppActionTypes.GetTransactions);
export const setTransactions = createAction(
  AppActionTypes.SetTransactions,
  props<{ txs: ITransaction[] }>()
);

export const addTransaction = createAction(
  AppActionTypes.AddTransaction,
  props<{ txn: ITransaction }>()
);

export const confirmPurchase = createAction(
  AppActionTypes.ConfirmPurchase,
  props<{ txn: ITransaction, user: IUser }>()
);

export const deleteTransaction = createAction(
  AppActionTypes.DeleteTransaction,
  props<{ id: string }>()
);


export const setSaleItems = createAction(
  AppActionTypes.SetSaleItems,
  props<{ amount: IAmount }>()
);
export const setBuyItems = createAction(
  AppActionTypes.SetBuyItems,
  props<{ amount: IAmount }>()
);
export const setActiveTransaction = createAction(
  AppActionTypes.SetActiveTransaction,
  props<{ txn?: ITransaction }>()
);
export const resetNewTransaction = createAction(
  AppActionTypes.ResetNewTransaction
);

export const resetPurchaseModal = createAction(
  AppActionTypes.ResetPurchaseModal
)
