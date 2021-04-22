import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppAuthModalStates, AppAuthMessages } from './app.enums';
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
    AppActions.hideAuthModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Closed,
      };
    }
  ),
  on(
    AppActions.showLoginModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Login,
      };
    }
  ),
  on(
    AppActions.showLogOutModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.LogOut,
      };
    }
  ),
  on(
    AppActions.showRegstrationModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.Registration,
      };
    }
  ),
  on(
    AppActions.showEmailVerificationModal,
    (state): AppState => {
      return {
        ...state,
        authModalState: AppAuthModalStates.EmailVerification,
      };
    }
  ),
  on(
    AppActions.toggleNavbar,
    (state): AppState => {
      return {
        ...state,
        isNavbarVisible: !state.isNavbarVisible,
      };
    }
  ),
  on(
    AppActions.toggleEmailConsent,
    (state): AppState => {
      return {
        ...state,
        emailConsent: !state.emailConsent,
      };
    }
  ),
  on(
    AppActions.toggleRememberMe,
    (state): AppState => {
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };
    }
  ),
  on(
    AppActions.credentialsLoginSuccess,
    (state, props): AppState => {
      return {
        ...state,
        user: props.user.emailVerified ? props.user : undefined,
        loginErrorMessage: props.user.emailVerified
          ? ''
          : AppAuthMessages.EmailUnverified,
        authModalState: props.user.emailVerified
          ? AppAuthModalStates.Closed
          : AppAuthModalStates.Login,
      };
    }
  ),
  on(
    AppActions.clearUser,
    (state): AppState => {
      return {
        ...state,
        user: undefined,
      };
    }
  ),
);
