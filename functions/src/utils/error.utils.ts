/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export const ERROR_MESSAGES = {
  BAD_REQUEST: "The data supplied is insufficient to fulfil this request",
  NOT_AUTHORISED: "You are not authorised to make this request",
  CONFLICT_TRANSACTION_PURCHASED: "The tranasaction has already been purchased by anpther user",
};

export class CustomError extends Error {
  type?: string;
  httpErrorCode?: {
    status?: number;
  };
  statusCode?: number;
}
