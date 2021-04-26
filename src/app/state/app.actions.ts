/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser, ITransaction } from './app.model';
import { AppModalStates, AppDropdownState } from './app.enums';

export enum AppActionTypes {
  IsLoggedIn = '[App] Is Logged In',
  showModal = '[App] Show Modal',
  toggleDropdown = '[App] Toggle Dropdown',
  setDropdownOption = '[App] Set Dropdown Option',
  hideModal = '[App] Hide App Modal',
  CredentialsLogin = '[App] [Login] Credentials Login Attempt',
  CredentialsLoginFailure = '[App] [Login] Credentials Login Error',
  CredentialsLoginSuccess = '[App] [Login] Credentials Login Success',
  credentialsLoginVerification = '[App] [Signup] Credentials Login Email Verifcation Check',
  CredentialsRegistration = '[App] [Signup] Credentials Registration Attempt',
  CredentialsRegistrationFailure = '[App] [Signup] Credentials Registration Failure',
  CredentialsRegistrationSuccess = '[App] [Signup] Credentials Registration Success',
  LogoutUser = '[App] [Logout] Logout User',
  ResetSignupError = '[App] [Signup] Reset Sign Up Error Message',
  ResetLoginError = '[App] [Login] Reset Login Error Message',
  ResetActiveTransaction = '[App] [Transaction] Reset Active Transaction',
  GetTransactions = '[App] [Transactions] Get Full Transaction List',
  SetTransactions = '[App] [Transactions] Set Full Transaction List',
  SetUser = '[App] [Login] Set User',
  GetUser = '[App] [Login] Get User Info',
  ClearUser = '[App] [Login] Clear User Info',
  PersistUser = '[App] [Register] Perist User',
  ToggleNavbar = '[App] Toggle Navbar',
  ToggleEmailConsent = '[App] Toggle Email Consent',
  ToggleRememberMe = '[App] Toggle Remember me',
}

export const isLoggedIn = createAction(AppActionTypes.IsLoggedIn);
export const toggleNavbar = createAction(AppActionTypes.ToggleNavbar);
export const toggleEmailConsent = createAction(
  AppActionTypes.ToggleEmailConsent
);
export const toggleRememberMe = createAction(AppActionTypes.ToggleRememberMe);

export const setDropdownOption = createAction(
  AppActionTypes.setDropdownOption,
  props<{ dropdownOption: string }>()
);

export const showModal = createAction(
  AppActionTypes.showModal,
  props<{ modalState: AppModalStates }>()
);

export const toggleDropdown = createAction(
  AppActionTypes.toggleDropdown,
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
  AppActionTypes.credentialsLoginVerification,
  props<{ user: IUser }>()
);

export const credentialsRegistration = createAction(
  AppActionTypes.CredentialsRegistration,
  props<{
    email: string;
    password: string;
    username: string,
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

export const getUser = createAction(
  AppActionTypes.GetUser,
  props<{ uid: string, emailVerified: boolean }>()
);

export const getTransactions = createAction(AppActionTypes.GetTransactions);
export const setTransactions = createAction(
  AppActionTypes.SetTransactions,
  props<{ txs: ITransaction[] }>()
);
export const resetActiveTransaction = createAction(
  AppActionTypes.ResetActiveTransaction
);
