import { AppTransactionStates } from "../state/app.enums";

export const DUMMY_TRANSACTION_DATA = [
  {
    user: 'Jane Cooper',
    userImg:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=mRBhOy9GJv&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    selling: { currency: 'GEMS', units: 100 },
    price: { currency: 'USDC', units: 80 },
    status: AppTransactionStates.Available,
    txid: '1n21on21o3ni213nio',
  },
  {
    user: 'David Smith',
    userImg:
      'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    selling: { currency: 'BTC', units: 0.1 },
    price: { currency: 'GEMS', units: 8000 },
    status: AppTransactionStates.InProgress,
    txid: 'asdnlsaknf213n21ln',
  },
  {
    user: 'David Smith',
    userImg:
      'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    selling: { currency: 'ETH', units: 0.15 },
    price: { currency: 'GEMS', units: 375 },
    status: AppTransactionStates.Complete,
    txid: 'asdnlsaknf213n21ln',
  },
];
