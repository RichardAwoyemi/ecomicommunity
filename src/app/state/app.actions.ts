/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser, ITransaction, IAmount, IWallet } from './app.model';
import { AppModalStates, AppDropdownState, AppTransactionCurrencies } from './app.enums';
import { NetworkSymbols } from '../data/currency-settings';
import { IFees } from 'functions/src/utils/function.utils';

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

  SetCreatorUserDetails = '[App] [Transactions] Set Creator User Details',
  SetCreatorSendingAmount = '[App] [Transactions] Set Creator Sending Amount',
  SetCreatorSendingNetworkVeveUsername = '[App] [Transactions] Set Creator Sending Network Username',
  SetCreatorSendingNetworkWalletAddress = '[App] [Transactions] Set Creator Sending Network Wallet Address',
  SetCreatorSendingNetworkSymbol = '[App] [Transactions] Set Creator Sending Network Symbol',
  SetCreatorSendingCurrency = '[App] [Transactions] Set Creator Sending Currency',
  SetCreatorReceivingNetworkVeveUsername = '[App] [Transactions] Set Creator Receiving Network Username',
  SetCreatorReceivingNetworkWalletAddress = '[App] [Transactions] Set Creator Receiving Network Wallet Address',
  SetCreatorReceivingNetworkSymbol = '[App] [Transactions] Set Creator Receiving Network Symbol',
  SetCreatorReceivingFees = '[App] [Transactions] Set Creator Receiving Fees',

  SetPurchasorUserDetails = '[App] [Transactions] Set Purchasor User Details',
  SetPurchasorSendingAmount = '[App] [Transactions] Set Purchasor Sending Amount',
  SetPurchasorSendingNetworkVeveUsername = '[App] [Transactions] Set Purchasor Sending Network Username',
  SetPurchasorSendingNetworkWalletAddress = '[App] [Transactions] Set Purchasor Sending Network Wallet Address',
  SetPurchasorSendingNetworkSymbol = '[App] [Transactions] Set Purchasor Sending Network Symbol',
  SetPurchasorSendingCurrency = '[App] [Transactions] Set Purchasor Sending Currency',
  SetPurchasorReceivingNetworkVeveUsername = '[App] [Transactions] Set Purchasor Receiving Network Username',
  SetPurchasorReceivingNetworkWalletAddress = '[App] [Transactions] Set Purchasor Receiving Network Wallet Address',
  SetPurchasorReceivingNetworkSymbol = '[App] [Transactions] Set Purchasor Receiving Network Symbol',
  SetPurchasorReceivingFees = '[App] [Transactions] Set Purchasor Receiving Fees',

  SetCreatorItems = '[App] [Transactions] Set Creator Assets',
  SetPurchasorItems = '[App] [Transactions] Set Purchasor Assets',
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

export const setCreatorUserDetails = createAction(
  AppActionTypes.SetCreatorUserDetails,
);
export const setCreatorSendingNetworkWalletAddress = createAction(
  AppActionTypes.SetCreatorSendingNetworkWalletAddress,
  props<{ walletAddress: string }>()
);
export const setCreatorSendingNetworkVeveUsername = createAction(
  AppActionTypes.SetCreatorSendingNetworkVeveUsername,
  props<{ veveUsername: string }>()
);
export const setCreatorSendingNetworkSymbol = createAction(
  AppActionTypes.SetCreatorSendingNetworkSymbol,
  props<{ symbol: NetworkSymbols }>()
);
export const setCreatorSendingAmount = createAction(
  AppActionTypes.SetCreatorSendingAmount,
  props<{ amount: IAmount }>()
);
export const setCreatorReceivingNetworkWalletAddress = createAction(
  AppActionTypes.SetCreatorReceivingNetworkWalletAddress,
  props<{ walletAddress: string }>()
);
export const setCreatorReceivingNetworkVeveUsername = createAction(
  AppActionTypes.SetCreatorReceivingNetworkVeveUsername,
  props<{ veveUsername: string }>()
);
export const setCreatorReceivingNetworkSymbol = createAction(
  AppActionTypes.SetCreatorReceivingNetworkSymbol,
  props<{ symbol: NetworkSymbols }>()
);
export const setCreatorReceivingFees = createAction(
  AppActionTypes.SetCreatorReceivingFees
);

export const setPurchasorUserDetails = createAction(
  AppActionTypes.SetPurchasorUserDetails,
);
export const setPurchasorSendingNetworkWalletAddress = createAction(
  AppActionTypes.SetPurchasorSendingNetworkWalletAddress,
  props<{ walletAddress: string }>()
);
export const setPurchasorSendingNetworkVeveUsername = createAction(
  AppActionTypes.SetPurchasorSendingNetworkVeveUsername,
  props<{ veveUsername: string }>()
);
export const setPurchasorSendingNetworkSymbol = createAction(
  AppActionTypes.SetPurchasorSendingNetworkSymbol,
  props<{ symbol: NetworkSymbols }>()
);
export const setPurchasorSendingAmount = createAction(
  AppActionTypes.SetPurchasorSendingAmount,
  props<{ amount: IAmount }>()
);
export const setPurchasorReceivingNetworkWalletAddress = createAction(
  AppActionTypes.SetPurchasorReceivingNetworkWalletAddress,
  props<{ walletAddress: string }>()
);
export const setPurchasorReceivingNetworkVeveUsername = createAction(
  AppActionTypes.SetCreatorReceivingNetworkVeveUsername,
  props<{ veveUsername: string }>()
);
export const setPurchasorReceivingNetworkSymbol = createAction(
  AppActionTypes.SetPurchasorReceivingNetworkSymbol,
  props<{ symbol: NetworkSymbols }>()
);
export const setPurchasorReceivingFees = createAction(
  AppActionTypes.SetPurchasorReceivingFees
);

export const setCreatorItems = createAction(
  AppActionTypes.SetCreatorItems,
  props<{ amount: IAmount }>()
);
export const setPurchasorItems = createAction(
  AppActionTypes.SetPurchasorItems,
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
