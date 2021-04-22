/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser } from './app.model';

export enum AppActionTypes {
  IsLoggedIn = '[App] Is Logged In',
  ShowLogOutModal = '[App] [Login] Show App Log Out',
  ShowLoginModal = '[App] [Login] Show App Login',
  showNewTransactionModal = '[App] [Transaction] Show New Transaction Modal',
  ShowRegstrationModal = '[App] [Registration] Show App Registration Form',
  ShowEmailVerificationModal = '[App] [Registration] Show App Email Verification Form',
  hideModal = '[App] Hide App Modal',
  CredentialsLogin = '[App] [Login] Credentials Login Attempt',
  CredentialsLoginFailure = '[App] [Login] Credentials Login Error',
  CredentialsLoginSuccess = '[App] [Login] Credentials Login Success',
  credentialsLoginVerification = '[App] [Signup] Credentials Login Email Verifcation Check',
  CredentialsRegistration = '[App] [Signup] Credentials Registration Attempt',
  CredentialsRegistrationFailure = '[App] [Signup] Credentials Registration Failure',
  CredentialsRegistrationSuccess = '[App] [Signup] Credentials Registration Success',
  LogoutUser = '[App] [Logout] Logout User',
  ClearUser = '[App] [Logout] Clear User',
  ResetSignupError = '[App] [Signup] Reset Sign Up Error Message',
  ResetLoginError = '[App] [Login] Reset Login Error Message',
  SetUser = '[App] [Login] Set User',
  ToggleNavbar = '[App] Toggle Navbar',
  ToggleEmailConsent = '[App] Toggle Email Consent',
  ToggleRememberMe = '[App] Toggle Remember me'
}

export const isLoggedIn = createAction(AppActionTypes.IsLoggedIn);
export const showLoginModal = createAction(AppActionTypes.ShowLoginModal);
export const showNewTransactionModal = createAction(AppActionTypes.showNewTransactionModal);
export const showLogOutModal = createAction(AppActionTypes.ShowLogOutModal);
export const showRegstrationModal = createAction(AppActionTypes.ShowRegstrationModal);
export const showEmailVerificationModal = createAction(AppActionTypes.ShowEmailVerificationModal);
export const hideModal = createAction(AppActionTypes.hideModal);
export const toggleNavbar = createAction(AppActionTypes.ToggleNavbar);
export const toggleEmailConsent = createAction(AppActionTypes.ToggleEmailConsent);
export const toggleRememberMe = createAction(AppActionTypes.ToggleRememberMe);
export const clearUser = createAction(AppActionTypes.ClearUser);

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
  props<{user: IUser}>()
);

export const credentialsRegistration = createAction(
  AppActionTypes.CredentialsRegistration,
  props<{
    email: string;
    password: string;
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

export const setUser = createAction(
  AppActionTypes.SetUser,
  props<{ user: firebase.auth.UserCredential }>()
);
