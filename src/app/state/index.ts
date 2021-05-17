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

export const getUID = createSelector(getUser, (state) => state?.uid);

export const getUsername = createSelector(getUser, (state) => state?.username);

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
);

export const getCreatorItems = createSelector(
  getAppFeatureState,
  (state) => state.creatorItems
);

export const getCreatorItemsCurrency = createSelector(
  getCreatorItems,
  (state) => state.currency!
);

export const getActiveCreatorItemsCurrency = createSelector(
  getActiveTransaction,
  (state) => state?.creator.currency!
);

export const getActivePurchaseItemsCurrency = createSelector(
  getActiveTransaction,
  (state) => state?.purchasor.currency!
);

export const getCreatorItemsUnits = createSelector(
  getCreatorItems,
  (state) => state.units
);

export const getCreatorSendingWalletNetworkSymbol = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.networkSymbol!
);

export const getCreatorSendingWalletNetwork = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.network!
);

export const getCreatorReceivingWalletNetworkSymbol = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.networkSymbol!
);

export const getCreatorReceivingWalletNetwork = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.network!
);

export const getCreatorItemsFees = createSelector(
  getCreatorItems,
  (state) => state.fees!
);

export const getCreatorSendingWalletAddress = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.walletAddress!
);

export const getCreatorReceivingWalletAddress = createSelector(
  getCreatorItems,
  (state) => state.receivingWallet!.walletAddress!
);

export const getCreatorReceivingVeveUsername = createSelector(
  getCreatorItems,
  (state) => state.receivingWallet?.veveUsername!
);

export const getCreatorSendingVeveUsername = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!.veveUsername!
);

export const getPurchasorItems = createSelector(
  getAppFeatureState,
  (state) => state.purchasorItems
);

export const getPurchasorItemsCurrency = createSelector(
  getPurchasorItems,
  (state) => state.currency!
);

export const getPurchasorItemsUnits = createSelector(
  getPurchasorItems,
  (state) => state.units
);

export const getPurchasorReceivingWalletNetworkSymbol = createSelector(
  getPurchasorItems,
  (state) => state.receivingWallet!.networkSymbol!
);

export const getPurchasorSendingWalletNetworkSymbol = createSelector(
  getPurchasorItems,
  (state) => state.sendingWallet?.networkSymbol!
);

export const getPurchasorReceivingWalletNetwork = createSelector(
  getPurchasorItems,
  (state) => state.receivingWallet!.network!
);

export const getPurchasorSendingWalletNetwork = createSelector(
  getPurchasorItems,
  (state) => state.sendingWallet?.network!
);

export const getPurchasorReceivingWalletAddress = createSelector(
  getPurchasorItems,
  (state) => state.receivingWallet!.walletAddress!
);

export const getPurchasorSendingWalletAddress = createSelector(
  getPurchasorItems,
  (state) => state.sendingWallet?.walletAddress!
);

export const getPurchasorItemsFees = createSelector(
  getPurchasorItems,
  (state) => state.fees!
);

export const getPurchasorReceivingVeveUsername = createSelector(
  getPurchasorItems,
  (state) => state.receivingWallet!.veveUsername!
);

export const getPurchasorSendingVeveUsername = createSelector(
  getPurchasorItems,
  (state) => state.sendingWallet?.veveUsername!
);

export const getCreatorCurrencyNetworkSymbolList = createSelector(
  getCreatorItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map((details) => details.symbol)
);

export const getPurchasorCurrencyNetworkSymbolList = createSelector(
  getPurchasorItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map((details) => details.symbol)
);
