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
  HowItWorks = 'how-it-works'
}

export enum AppAuthMessages {
  EmailUnverified = 'Please Verify Your Email Address To Continue.'
}

export enum AppTransactionStates {
  Available = 'Available',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum AppDropdownState {
  Hidden = '',
  AddNewTransactionItemType = 'Add New Transaction Item Type',
  SellTransactionCurrency = 'Sell Transaction Currency',
  BuyingTransactionCurrency = 'Buying Transaction Cuurrency'
}

export enum AppTransactionItemTypes {
  Collectible = 'Collectible',
  Currency = 'Currency',
}

export enum AppTransactionCurrencies {
  GEMS = 'GEMS',
  BTC = 'BTC',
  BNB = 'BNB',
  DAI = 'DAI',
  OMI = 'OMI',
  USDC = 'USDC',
  USDT = 'USDT',
}
