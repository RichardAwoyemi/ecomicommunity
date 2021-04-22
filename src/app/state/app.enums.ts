export enum AppModalStates {
  Closed = '',
  Login = 'login',
  LogOut = 'log-out',
  Registration = 'registration',
  EmailVerification = 'email-verification',
  NewTransaction = 'new-transaction'
}

export enum AppAuthMessages {
  EmailUnverified = 'Please Veriify Your Email Address To Conitinue.'
}

export enum AppTransactionStates {
  Available = 'Available',
  InProgress = 'In Progress',
  Complete = 'Complete'
}
