export const HEADERS = {
  X_TRANSACTION_ID: "x-transaction-id",
  X_BUYER_UID: "x-buyer-uid",
  X_SELLER_UID: "x-seller-uid",
};

export interface ITransactionSummary {
  id: string,
  buying: {
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
