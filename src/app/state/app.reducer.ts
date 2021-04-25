import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppModalStates, AppAuthMessages, AppDropdownState } from './app.enums';
import { IUser, ITransaction } from './app.model';

export interface AppState {
  // user: firebase.app.UserCredential | undefined;
  user: IUser | undefined;
  registrationErrorMessage: string;
  loginErrorMessage: string;
  modalState: AppModalStates;
  isNavbarVisible: boolean;
  emailConsent: boolean;
  rememberMe: boolean;
  dropdownState: AppDropdownState;
  activeDropdownOptions: { [AppDropdownState: string]: string }[];
  activeTransaction: ITransaction;
  transactions: ITransaction[];
}

const initialState: AppState = {
  registrationErrorMessage: '',
  loginErrorMessage: '',
  user: undefined,
  modalState: AppModalStates.Closed,
  isNavbarVisible: false,
  emailConsent: false,
  rememberMe: false,
  dropdownState: AppDropdownState.Hidden,
  activeDropdownOptions: [],
  activeTransaction: {
    userid: '',
    selling: { units: 0, currency: '' },
    price: { units: 0, currency: '' },
  },
  transactions: []
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
    AppActions.showModal,
    (state, props): AppState => {
      return {
        ...state,
        modalState: props.modalState,
        dropdownState: AppDropdownState.Hidden,
      };
    }
  ),
  on(
    AppActions.toggleDropdown,
    (state, props): AppState => {
      return {
        ...state,
        dropdownState:
          props.dropdownState === state.dropdownState
            ? AppDropdownState.Hidden
            : props.dropdownState,
      };
    }
  ),
  on(
    AppActions.setDropdownOption,
    (state, props): AppState => {
      const array = Object.assign([], state.activeDropdownOptions) as {
        [AppDropdownState: string]: string;
      }[];
      const newItem = { [state.dropdownState]: props.dropdownOption };
      const index = array.findIndex(
        (o) => Object.keys(o)[0] === state.dropdownState
      );
      if (index === -1) {
        array.push(newItem);
      } else {
        array[index] = newItem;
      }
      return {
        ...state,
        activeDropdownOptions: array,
        dropdownState: AppDropdownState.Hidden,
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
      state.rememberMe
        ? localStorage.setItem('ec-user', JSON.stringify(state.user))
        : sessionStorage.setItem('ec-user', JSON.stringify(state.user));
      return {
        ...state,
        user: props.user.emailVerified ? props.user : undefined,
        loginErrorMessage: props.user.emailVerified
          ? ''
          : AppAuthMessages.EmailUnverified,
        modalState: props.user.emailVerified
          ? AppModalStates.Closed
          : AppModalStates.Login,
      };
    }
  ),
  on(
    AppActions.isLoggedIn,
    (state): AppState => {
      const user =
        sessionStorage.getItem('ec-user') || localStorage.getItem('ec-user');
      return {
        ...state,
        user: user ? JSON.parse(user) : undefined,
      };
    }
  ),
  on(
    AppActions.isLoggedIn,
    (state): AppState => {
      const user =
        sessionStorage.getItem('ec-user') || localStorage.getItem('ec-user');
      return {
        ...state,
        user: user ? JSON.parse(user) : undefined,
      };
    }
  ),
  on(
    AppActions.resetActiveTransaction,
    (state): AppState => {
      return {
        ...state,
        activeTransaction: {
          userid: '',
          selling: { units: 0, currency: '' },
          price: { units: 0, currency: '' },
        },
      };
    }
  ),
  on(
    AppActions.setTransactions,
    (state, props): AppState => {
      return {
        ...state,
        transactions: props.txs
      };
    }
  )
);
