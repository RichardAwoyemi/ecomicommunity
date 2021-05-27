import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AppDropdownState } from './app.enums';
import { NETWORK_FEES_PC } from 'functions/src/utils/constants.utils';

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

export const getTransactionModalError = createSelector(
  getAppFeatureState,
  (state) => state.transactionModalErrorMessage
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
  (state) => state.sendingCurrency!
);

export const getCreatorItemsUnits = createSelector(
  getCreatorItems,
  (state) => state.sendingUnits
);

export const getCreatorSendingWallet = createSelector(
  getCreatorItems,
  (state) => state.sendingWallet!
);

export const getCreatorSendingWalletNetworkSymbol = createSelector(
  getCreatorSendingWallet,
  (state) => state.networkSymbol!
);

export const getCreatorSendingWalletNetwork = createSelector(
  getCreatorSendingWallet,
  (state) => state.network!
);

export const getCreatorReceivingWallet = createSelector(
  getCreatorItems,
  (state) => state.receivingWallet!
);

export const getCreatorReceivingWalletNetworkSymbol = createSelector(
  getCreatorReceivingWallet,
  (state) => state.networkSymbol!
);

export const getCreatorReceivingWalletNetwork = createSelector(
  getCreatorReceivingWallet,
  (state) => state.network!
);

export const getCreatorItemsFees = createSelector(
  getCreatorItems,
  (state) => state.receivingFees!
);

export const getCreatorSendingWalletAddress = createSelector(
  getCreatorSendingWallet,
  (state) => state.walletAddress!
);

export const getCreatorReceivingWalletAddress = createSelector(
  getCreatorReceivingWallet,
  (state) => state.walletAddress!
);

export const getCreatorReceivingVeveUsername = createSelector(
  getCreatorReceivingWallet,
  (state) => state.veveUsername!
);

export const getCreatorSendingVeveUsername = createSelector(
  getCreatorSendingWallet,
  (state) => state.veveUsername!
);

export const getPurchasorItems = createSelector(
  getAppFeatureState,
  (state) => state.purchasorItems
);

export const getPurchasorItemsCurrency = createSelector(
  getPurchasorItems,
  (state) => state.sendingCurrency!
);

export const getPurchasorItemsUnits = createSelector(
  getPurchasorItems,
  (state) => state.sendingUnits
);

export const getPurchaserReceivingWallet = createSelector(
  getPurchasorItems,
  (state) => state.receivingWallet!
);

export const getPurchaserSendingWallet = createSelector(
  getPurchasorItems,
  (state) => state.sendingWallet!
);

export const getPurchasorReceivingWalletNetworkSymbol = createSelector(
  getPurchaserReceivingWallet,
  (state) => state.networkSymbol!
);

export const getPurchasorSendingWalletNetworkSymbol = createSelector(
  getPurchaserSendingWallet,
  (state) => state.networkSymbol!
);

export const getPurchasorReceivingWalletNetwork = createSelector(
  getPurchaserReceivingWallet,
  (state) => state.network!
);

export const getPurchasorSendingWalletNetwork = createSelector(
  getPurchaserSendingWallet,
  (state) => state.network!
);

export const getPurchasorReceivingWalletAddress = createSelector(
  getPurchaserReceivingWallet,
  (state) => state.walletAddress!
);

export const getPurchasorSendingWalletAddress = createSelector(
  getPurchaserSendingWallet,
  (state) => state.walletAddress!
);

export const getPurchasorItemsFees = createSelector(
  getPurchasorItems,
  (state) => state.receivingFees!
);

export const getPurchasorReceivingVeveUsername = createSelector(
  getPurchaserReceivingWallet,
  (state) => state.veveUsername!
);

export const getPurchasorSendingVeveUsername = createSelector(
  getPurchaserSendingWallet,
  (state) => state.veveUsername!
);

export const getCreatorCurrencyNetworkSymbolList = createSelector(
  getCreatorItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map((details) => details.symbol)
);

export const getPurchasorCurrencyNetworkSymbolList = createSelector(
  getPurchasorItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map((details) => details.symbol)
);

export const getCreatorSendingCurrencyMinimumUnits = createSelector(
  getCreatorItems,
  (state) => NETWORK_FEES_PC[state.sendingCurrency!].find((details) => details.symbol)?.minimum
);

export const getPurchasorCurrencyNetworkMinimums = createSelector(
  getPurchasorItemsCurrency,
  (state) => NETWORK_FEES_PC[state].map((details) => details.symbol)
);


