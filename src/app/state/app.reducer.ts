import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import {
  AppModalStates,
  AppAuthMessages,
  AppDropdownState,
  AppTransactionCurrencies,
} from './app.enums';
import { IUser, ITransaction, IAmount } from './app.model';

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
  transactions: ITransaction[];
  saleItems: IAmount;
  priceItems: IAmount;
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
  transactions: [],
  saleItems: {
    currency: AppTransactionCurrencies.GEMS,
    units: 100,
  },
  priceItems: {
    currency: AppTransactionCurrencies.BTC,
    units: 0.001,
  },
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
    AppActions.showModal,
    (state, props): AppState => {
      return {
        ...state,
        modalState: props.modalState,
        dropdownState: AppDropdownState.Hidden,
        loginErrorMessage: '',
        registrationErrorMessage: '',
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
        user: props.user,
        loginErrorMessage: '',
        modalState: AppModalStates.Closed
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
    AppActions.clearUser,
    (state): AppState => {
      return {
        ...state,
        user: undefined,
      };
    }
  ),
  on(
    AppActions.resetActiveTransaction,
    (state): AppState => {
      return {
        ...state,
        saleItems: {
          currency: AppTransactionCurrencies.GEMS,
          units: 100,
        },
      };
    }
  ),
  on(
    AppActions.setTransactions,
    (state, props): AppState => {
      return {
        ...state,
        transactions: props.txs,
      };
    }
  ),
  on(
    AppActions.setSaleItems,
    (state, props): AppState => {
      return {
        ...state,
        saleItems: props.amount,
      };
    }
  ),
  on(
    AppActions.setPriceItems,
    (state, props): AppState => {
      return {
        ...state,
        priceItems: props.amount,
      };
    }
  ),
  on(
    AppActions.setEmailVerificationFailMessage,
    (state, props): AppState => {
      return {
        ...state,
        loginErrorMessage: AppAuthMessages.EmailUnverified
      };
    }
  )
);
