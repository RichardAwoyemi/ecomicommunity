/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {HEADERS, ITransactionSummary} from "./utils/function.utils";
import {CustomError, ERROR_MESSAGES} from "./utils/error.utils";
import cors = require("cors");

admin.initializeApp(functions.config().firebase);
const corsHandler = cors({origin: true});

function isAuthorised(
    request: functions.https.Request,
    userPrivateDoc: admin.firestore.DocumentSnapshot
): boolean {
  const userSecret = userPrivateDoc.get("secret");
  const authorization = request.get("Authorization");
  const split = authorization ? authorization.split("Bearer") : [];
  const bearerKey = split && split.length >= 2 ? split[1] : undefined;
  return userSecret === bearerKey && bearerKey !== undefined;
}

function errorHandler(error: CustomError, response: functions.Response) {
  // console.log(error);
  let status = 500;
  if (error.httpErrorCode && error.httpErrorCode.status !== undefined) {
    status = error.httpErrorCode.status;
  } else if (error["statusCode"]) {
    status = error["statusCode"];
  }
  const type = error["type"] ? error["type"] : null;
  const message = error["message"] ? error["message"] : error;
  const result = type ? {type: type, error: message} : {error: message};
  response.status(status).send(result);
}

exports.matchTransaction = functions.region("europe-west2").https.onRequest(
    (request: functions.https.Request, response: functions.Response) => {
      response.set("Access-Control-Allow-Origin", "*");

      corsHandler(request, response, () => {
        const buyerUid = request.get(HEADERS.X_BUYER_UID);
        const transactionId = request.get(HEADERS.X_TRANSACTION_ID);

        console.log(`variables: ${buyerUid}, ${transactionId}`);

        if (buyerUid !== undefined && transactionId !== undefined) {
          // console.log(`Preparing documents for user: ${userUid}`);
          const buyerDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users")
              .doc(buyerUid);

          const transactionDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("transactions")
              .doc(transactionId);

          return admin
              .firestore()
              .runTransaction(async (transaction: admin.firestore.Transaction) => {
                const buyerDoc: admin.firestore.DocumentSnapshot = await transaction.get(buyerDocRef);

                // Check that the buyer creating the request is authorised
                if (isAuthorised(request, buyerDoc)) {
                  const transactionDoc: admin.firestore.DocumentSnapshot = await transaction.get(transactionDocRef);

                  // Check that the transaction is Available before updating it
                  if (transactionDoc.get("status") == "Available" && !transactionDoc.get("buyerUid")) {
                    // Update the status and the buyerUid if it's a valid and available transaction
                    transaction.set(transactionDocRef, {
                      status: "In Progress",
                      buyerUid: buyerUid,
                    }, {merge: true});

                    const sellerUid = transactionDoc.get("sellerUid");
                    const sellerDocRef: admin.firestore.DocumentReference = admin
                        .firestore()
                        .collection("users")
                        .doc(sellerUid);

                    const sellerDoc: admin.firestore.DocumentSnapshot = await transaction.get(sellerDocRef);

                    const transactionSummary: ITransactionSummary = {
                      id: transactionDoc.get("id"),
                      price: {
                        currency: transactionDoc.get("price").get("currency"),
                        units: transactionDoc.get("price").get("units"),
                      },
                      selling: {
                        currency: transactionDoc.get("selling").get("currency"),
                        units: transactionDoc.get("selling").get("units"),
                      },
                      sellerEmail: sellerDoc.get("email"),
                      buyerEmail: buyerDoc.get("email"),
                    };
                    return transactionSummary;
                  } else {
                    throw new functions.https.HttpsError(
                        "already-exists",
                        ERROR_MESSAGES.CONFLICT_TRANSACTION_PURCHASED
                    );
                  }
                } else {
                  throw new functions.https.HttpsError(
                      "permission-denied",
                      ERROR_MESSAGES.NOT_AUTHORISED
                  );
                }
              })
              .then((transactionSummary: ITransactionSummary) => {
                console.log(transactionSummary);
                // TODO: Send emails to these dons
              })
              .then(() => {
                response.status(200).send({message: "transactions added and first email sent to buyer and seller"});
              })
              .catch((error: CustomError) => errorHandler(error, response));
        } else {
          response.status(400).send({error: ERROR_MESSAGES.BAD_REQUEST});
          return;
        }
      });
    }
);
