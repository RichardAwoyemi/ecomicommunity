export enum AppModalStates {
  Closed = '',
  Login = 'login',
  LogOut = 'log-out',
  Registration = 'registration',
  EmailVerification = 'email-verification',
  NewTransaction = 'new-transaction',
  SaleItem = 'sale-item'
}

export enum AppAuthMessages {
  EmailUnverified = 'Please Veriify Your Email Address To Conitinue.'
}

export enum AppTransactionStates {
  Available = 'Available',
  InProgress = 'In Progress',
  Complete = 'Complete'
}

export enum AppDropdownState {
  Hidden = '',
  AddNewTransactionItemType = 'Add New Transaction Item Type',
}
