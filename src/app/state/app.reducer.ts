import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import {
  AppAuthMessages,
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
} from './app.enums';
import { IAmount, ITransaction, IUser } from './app.model';
import { UtilService } from '../services/util.service';
import { DEFAULT_NETWORKS } from 'src/app/data/currency-settings';
import { NetworkSymbols, Networks } from '../data/currency-settings';

export interface AppState {
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
  activeTransaction: ITransaction | undefined;
  saleItems: IAmount;
  priceItems: IAmount;
}

const initialState: AppState = {
  registrationErrorMessage: '',
  loginErrorMessage: '',
  user: undefined,
  // modalState: AppModalStates.Closed,
  modalState: AppModalStates.SaleItem,
  isNavbarVisible: false,
  emailConsent: false,
  rememberMe: false,
  dropdownState: AppDropdownState.Hidden,
  activeDropdownOptions: [],
  transactions: [],
  activeTransaction: undefined,
  saleItems: {
    currency: AppTransactionCurrencies.GEMS,
    units: 1000,
    network: Networks.VEVE,
    networkSymbol: NetworkSymbols.VEVE,
    walletAddress: '',
  },
  priceItems: {
    currency: AppTransactionCurrencies.BTC,
    units: 0.0125,
    network: Networks.BTC,
    networkSymbol: NetworkSymbols.BTC,
    walletAddress: '',
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
        ? localStorage.setItem('ec-user', JSON.stringify(props.user))
        : sessionStorage.setItem('ec-user', JSON.stringify(props.user));
      return {
        ...state,
        user: props.user,
        loginErrorMessage: '',
        modalState: AppModalStates.Closed,
      };
    }
  ),
  on(
    AppActions.isLoggedIn,
    (state): AppState => {
      const localUser = UtilService.checkUser(localStorage.getItem('ec-user'));
      const sessionUser = UtilService.checkUser(sessionStorage.getItem('ec-user'));
      return {
        ...state,
        user: state.user ? state.user : localUser ? localUser : sessionUser || undefined,
      };
    }
  ),
  on(
    AppActions.clearUser,
    (state): AppState => {
      if (localStorage.getItem('ec-user')) {
        localStorage.removeItem('ec-user');
      }
      if (sessionStorage.getItem('ec-user')) {
        sessionStorage.removeItem('ec-user');
      }
      return {
        ...state,
        user: undefined,
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
      const networkSymbol = (props?.amount?.currency && (props?.amount?.currency !== state.saleItems.currency)) ? DEFAULT_NETWORKS[props?.amount?.currency!] : state.saleItems.networkSymbol;
      return {
        ...state,
        saleItems: {
          currency: props?.amount?.currency || state.saleItems.currency,
          units: props?.amount?.units || state.saleItems.units,
          networkSymbol: props?.amount?.networkSymbol || networkSymbol,
          network: Networks[props?.amount?.networkSymbol || networkSymbol!],
          walletAddress: props?.amount?.walletAddress || state.saleItems.walletAddress
        },
      };
    }
  ),
  on(
    AppActions.setPriceItems,
    (state, props): AppState => {
      const networkSymbol = (props?.amount?.currency && (props?.amount?.currency !== state.priceItems.currency)) ? DEFAULT_NETWORKS[props?.amount?.currency!] : state.priceItems.networkSymbol;
      return {
        ...state,
        priceItems: {
          currency: props?.amount?.currency || state.priceItems.currency,
          units: props?.amount?.units || state.priceItems.units,
          networkSymbol: props?.amount?.networkSymbol || networkSymbol,
          network: Networks[networkSymbol!],
          walletAddress: props?.amount?.walletAddress || state.priceItems.walletAddress
        },
      };
    }
  ),
  on(
    AppActions.setEmailVerificationFailMessage,
    (state): AppState => {
      return {
        ...state,
        loginErrorMessage: AppAuthMessages.EmailUnverified,
      };
    }
  ),
  on(
    AppActions.setActiveTransaction,
    (state, props): AppState => {
      return {
        ...state,
        activeTransaction: props.txn,
      };
    }
  ),
  on(
    AppActions.resetNewTransaction,
    (state): AppState => {
      return {
        ...state,
        saleItems: initialState.saleItems,
        priceItems: initialState.priceItems
      };
    }
  )
);
