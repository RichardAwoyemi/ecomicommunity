export enum AppModalStates {
  Closed = '',
  Login = 'login',
  LogOut = 'log-out',
  Registration = 'registration',
  EmailVerification = 'email-verification',
  NewTransaction = 'new-transaction',
  NewTransactionSummary = 'new-transaction-summary',
  PurchasePayment = 'purchase-payment',
  PurchaseReceiving = 'purchase-receiving',
  PurchaseSummary = 'purchase-summary',
  CreatorItem = 'creator-item',
  PurchasorItem = 'purchasor-item',
  HowItWorks = 'how-it-works',
  MatchTransactionSpinner = 'match-transaction-spinner',
  MatchTransactionConfirmation = 'match-transaction-confirm',
  MatchTransactionError = 'match-transaction-error',
}

export enum AppAuthMessages {
  EmailUnverified = 'Please Verify Your Email Address To Continue.'
}

export enum AppDropdownState {
  Hidden = '',
  AddNewTransactionItemType = 'Add New Transaction Item Type',
  SellTransactionCurrency = 'Sell Transaction Currency',
  BuyingTransactionCurrency = 'Buying Transaction Cuurrency'
}
