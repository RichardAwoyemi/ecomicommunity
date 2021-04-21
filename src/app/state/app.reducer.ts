import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppAuthModalStates } from './app.enums';
import { IUser } from './app.model';

export interface AppState {
  // user: firebase.app.UserCredential | undefined;
  user: IUser | undefined;
  registrationErrorMessage: string;
  loginErrorMessage: string;
  authModalState: AppAuthModalStates;
  isNavbarVisible: boolean;
  emailConsent: boolean;
  rememberMe: boolean;
}

const initialState: AppState = {
  registrationErrorMessage: '',
  loginErrorMessage: '',
  user: undefined,
  authModalState: AppAuthModalStates.Closed,
  isNavbarVisible: false,
  emailConsent: false,
  rememberMe: false,
};

export const appReducer = createReducer<AppState>(
  initialState,
  on(
    AppActions.credentialsRegistrationFailure,
    (state, props): AppState => {
      return {
        ...state,
        registrationErrorMessage: props.error.message,
      };
    }
  ),
  on(
    AppActions.credentialsLoginFailure,
    (state, props): AppState => {
      return {
        ...state,
        loginErrorMessage: props.error.message,
      };
    }
  ),
  on(
    AppActions.resetSignupError,
    (state): AppState => {
      return {
        ...state,
        registrationErrorMessage: '',
      };
    }
  ),
  on(
    AppActions.resetLoginError,
    (state): AppState => {
      return {
        ...state,
        loginErrorMessage: '',
      };
    }
  ),
  on(
    AppActions.credentialsLoginSuccess,
    (state, props): AppState => {
      return {
        ...state,
        user: props.user,
      };
    }
  ),
  on(
    AppActions.HideAuthModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Closed,
      };
    }
  ),
  on(
    AppActions.ShowLoginModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Login,
      };
    }
  ),
  on(
    AppActions.ShowRegstrationModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Registration,
      };
    }
  ),
  on(
    AppActions.ShowEmailVerificationModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.EmailVerification,
      };
    }
  ),
  on(
    AppActions.ToggleNavbar,
    (state): AppState => {
      return {
        ...state,
        isNavbarVisible: !state.isNavbarVisible,
      };
    }
  ),
  on(
    AppActions.ToggleEmailConsent,
    (state): AppState => {
      return {
        ...state,
        emailConsent: !state.emailConsent,
      };
    }
  ),
  on(
    AppActions.ToggleRememberMe,
    (state): AppState => {
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };
    }
  ),
);
