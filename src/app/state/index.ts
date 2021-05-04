import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AppDropdownState } from './app.enums';
import { NETWORK_FEES_PC } from '../data/currency-settings';

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getNavbarVisibility = createSelector(
  getAppFeatureState,
  (state) => state.isNavbarVisible
);

export const getEmailConsent = createSelector(
  getAppFeatureState,
  (state) => state.emailConsent
);

export const getRememberMe = createSelector(
  getAppFeatureState,
  (state) => state.rememberMe
);

export const getDropdownState = createSelector(
  getAppFeatureState,
  (state) => state.dropdownState
);

export const getmodalState = createSelector(
  getAppFeatureState,
  (state) => state.modalState
);

export const getUser = createSelector(
  getAppFeatureState,
  (state) => state.user
);

export const getUID = createSelector(
  getUser,
  (state) => state?.uid
);

export const getUsername = createSelector(
  getUser,
  (state) => state?.username
);

export const getLoginError = createSelector(
  getAppFeatureState,
  (state) => state.loginErrorMessage
);

export const getRegistrationError = createSelector(
  getAppFeatureState,
  (state) => state.registrationErrorMessage
);

export const getActiveDropdownOptions = createSelector(
  getAppFeatureState,
  (state) => state.activeDropdownOptions
);

export const getActiveDropdownTransactionType = createSelector(
  getActiveDropdownOptions,
  (state) =>
    (state.find(
      (option) =>
        Object.keys(option)[0] === AppDropdownState.AddNewTransactionItemType
    ) || { [AppDropdownState.AddNewTransactionItemType]: undefined })[
      AppDropdownState.AddNewTransactionItemType
    ]
);

export const getTransactions = createSelector(
  getAppFeatureState,
  (state) => state.transactions
);

export const getActiveTransaction = createSelector(
  getAppFeatureState,
  (state) => state.activeTransaction
)

export const getSaleItems = createSelector(
  getAppFeatureState,
  (state) => state.saleItems
);

export const getSaleItemsCurrency = createSelector(
  getSaleItems,
  (state) => state.currency!
);

export const getSaleItemsUnits = createSelector(
  getSaleItems,
  (state) => state.units
);

export const getSaleItemsNetworkSymbol = createSelector(
  getSaleItems,
  (state) => state.networkSymbol!
);

export const getSaleItemsNetwork = createSelector(
  getSaleItems,
  (state) => state.network!
);

export const getSaleItemsFees = createSelector(
  getSaleItems,
  (state) => state.fees!
);

export const getSalesWalletAddress = createSelector(
  getSaleItems,
  (state) => state.walletAddress!
);

export const getSalesVeveUsername = createSelector(
  getSaleItems,
  (state) => state.veveUsername!
);

export const getPriceItems = createSelector(
  getAppFeatureState,
  (state) => state.priceItems
);

export const getPriceItemsCurrency = createSelector(
  getPriceItems,
  (state) => state.currency!
);

export const getPriceItemsUnits = createSelector(
  getPriceItems,
  (state) => state.units
);

export const getPriceItemsNetworkSymbol = createSelector(
  getPriceItems,
  (state) => state.networkSymbol!
);

export const getPriceItemsFees = createSelector(
  getPriceItems,
  (state) => state.fees!
);

export const getPriceItemsNetwork = createSelector(
  getPriceItems,
  (state) => state.network!
);

export const getPriceWalletAddress = createSelector(
  getPriceItems,
  (state) => state.walletAddress!
);

export const getPriceVeveUsername = createSelector(
  getPriceItems,
  (state) => state.veveUsername!
);


export const getSaleCurrencyNetworkSymbolList = createSelector(
  getSaleItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map( details => details.symbol )
)

export const getPriceCurrencyNetworkSymbolList = createSelector(
  getPriceItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map( details => details.symbol )
)
