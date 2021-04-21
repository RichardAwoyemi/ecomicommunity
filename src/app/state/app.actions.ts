/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser } from './app.model';

export enum AppActionTypes {
  ShowLoginModal = '[App] [Login] Show App Login',
  ShowRegstrationModal = '[App] [Registration] Show App Registration Form',
  HideAuthModal = '[App] Hide App Modal',
  CredentialsLogin = '[App] [Login] Credentials Login Attempt',
  CredentialsLoginFailure = '[App] [Login] Credentials Login Error',
  CredentialsLoginSuccess = '[App] [Login] Credentials Login Success',
  CredentialsRegistration = '[App] [Signup] Credentials Registration Attempt',
  CredentialsRegistrationFailure = '[App] [Signup] Credentials Registration Failure',
  CredentialsRegistrationSuccess = '[App] [Signup] Credentials Registration Success',
  ResetSignupError = '[App] [Signup] Reset Sign Up Error Message',
  ResetLoginError = '[App] [Login] Reset Login Error Message',
  SetUser = '[App] [Login] Set User',
  ToggleNavbar = '[App] Toggle Navbar',
  ToggleEmailConsent = '[App] Toggle Email Consent',
  ToggleRememberMe = '[App] Toggle Remember me'
}

export const ShowLoginModal = createAction(AppActionTypes.ShowLoginModal);
export const ShowRegstrationModal = createAction(AppActionTypes.ShowRegstrationModal);
export const HideAuthModal = createAction(AppActionTypes.HideAuthModal);
export const ToggleNavbar = createAction(AppActionTypes.ToggleNavbar);
export const ToggleEmailConsent = createAction(AppActionTypes.ToggleEmailConsent);
export const ToggleRememberMe = createAction(AppActionTypes.ToggleRememberMe);

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

export const setUser = createAction(
  AppActionTypes.SetUser,
  props<{ user: firebase.auth.UserCredential }>()
);
