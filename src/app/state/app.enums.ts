export enum AppModalStates {
  Closed = '',
  Login = 'login',
  LogOut = 'log-out',
  Registration = 'registration',
  EmailVerification = 'email-verification',
  NewTransaction = 'new-transaction',
  NewTransactionSummary = 'new-transaction-summary',
  SaleItem = 'sale-item',
  PriceItem = 'price-item',
}

export enum AppAuthMessages {
  EmailUnverified = 'Please Verify Your Email Address To Continue.'
}

export enum AppTransactionStates {
  Available = 'Available',
  InProgress = 'In Progress',
  Complete = 'Complete',
}

export enum AppDropdownState {
  Hidden = '',
  AddNewTransactionItemType = 'Add New Transaction Item Type',
  SellTransactionCurrency = 'Sell Transaction Currency',
  PriceTransactionCurrency = 'Price Transaction Cuurrency'
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
