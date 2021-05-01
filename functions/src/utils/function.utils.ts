export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_BUYER_UID: "x-buyer-uid",
};

export interface ITransactionSummary {
  id: string,
  price: {
    currency: string,
    units: number,
  },
  selling: {
    currency: string,
    units: number,
  },
  sellerEmail: string,
  buyerEmail: string,
}
