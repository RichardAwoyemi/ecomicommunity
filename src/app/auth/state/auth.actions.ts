/* NgRx */
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/app';
import { IUser } from './auth.model';

export enum AuthActionTypes {
  CredentialsLogin = '[Auth] [Login] Credentials Login Attempt',
  CredentialsLoginFailure = '[Auth] [Login] Credentials Login Error',
  CredentialsLoginSuccess = '[Auth] [Login] Credentials Login Success',
  CredentialsRegistration = '[Auth] [Signup] Credentials Registration Attempt',
  CredentialsRegistrationFailure = '[Auth] [Signup] Credentials Registration Failure',
  CredentialsRegistrationSuccess = '[Auth] [Signup] Credentials Registration Success',
  ResetSignupError = '[Auth] [Signup] Reset Sign Up Error Message',
  ResetLoginError = '[Auth] [Login] Reset Login Error Message',
  SetUser = '[Auth] [Login] Set User',
}

export const credentialsLogin = createAction(
  AuthActionTypes.CredentialsLogin,
  props<{
    email: string;
    password: string;
    remember?: boolean;
  }>()
);

export const credentialsLoginFailure = createAction(
  AuthActionTypes.CredentialsLoginFailure,
  props<{ error: { code: string; message: string } }>()
);

export const credentialsLoginSuccess = createAction(
  AuthActionTypes.CredentialsLoginSuccess,
  props<{ user: IUser }>()
);

export const credentialsRegistration = createAction(
  AuthActionTypes.CredentialsRegistration,
  props<{
    email: string;
    password: string;
    remember?: boolean;
  }>()
);

export const credentialsRegistrationFailure = createAction(
  AuthActionTypes.CredentialsRegistrationFailure,
  props<{ error: { code: string; message: string } }>()
);

export const credentialsRegistrationSuccess = createAction(
  AuthActionTypes.CredentialsRegistrationSuccess
);

export const resetLoginError = createAction(AuthActionTypes.ResetLoginError);
export const resetSignupError = createAction(AuthActionTypes.ResetSignupError);

export const setUser = createAction(
  AuthActionTypes.SetUser,
  props<{ user: firebase.auth.UserCredential }>()
);
