import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUser } from './auth.model';

export interface AuthState {
  // user: firebase.auth.UserCredential | undefined;
  user: IUser | undefined;
  registrationErrorMessage: string;
  loginErrorMessage: string;
}

const initialState: AuthState = {
  registrationErrorMessage: '',
  loginErrorMessage: '',
  user: undefined
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(
    AuthActions.credentialsRegistrationFailure,
    (state, props): AuthState => {
      return {
        ...state,
        registrationErrorMessage: props.error.message,
      };
    }
  ),
  on(
    AuthActions.credentialsLoginFailure,
    (state, props): AuthState => {
      return {
        ...state,
        loginErrorMessage: props.error.message,
      };
    }
  ),
  on(
    AuthActions.resetSignupError,
    (state): AuthState => {
      return {
        ...state,
        registrationErrorMessage: '',
      };
    }
  ),
  on(
    AuthActions.resetLoginError,
    (state): AuthState => {
      return {
        ...state,
        loginErrorMessage: '',
      };
    }
  ),
  on(
    AuthActions.credentialsLoginSuccess,
    (state, props): AuthState => {
      return {
        ...state,
        user: props.user,
      };
    }
  ),
);
