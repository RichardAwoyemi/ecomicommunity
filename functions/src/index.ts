/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {HEADERS, IFees, ITransactionSummary} from "./utils/function.utils";
import {CustomError, ERROR_MESSAGES} from "./utils/error.utils";
import * as SendGrid from "@sendgrid/mail";
import cors = require("cors");

admin.initializeApp(functions.config().firebase);
const corsHandler = cors({origin: true});
SendGrid.setApiKey(functions.config().mail.test.key);

function isAuthorised(
    request: functions.https.Request,
    userPrivateDoc: admin.firestore.DocumentSnapshot
): boolean {
  const userSecret = userPrivateDoc.get("secret");
  const authorization = request.get("Authorization");
  const split = authorization ? authorization.split("Bearer ") : [];
  const bearerKey = split && split.length >= 2 ? split[1] : undefined;
  return userSecret == bearerKey && bearerKey != undefined;
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

function sendBuyerDetails(transactionSummary: ITransactionSummary) {
  return sendNewTransactionEmail(
      transactionSummary.buying.userEmail,
      transactionSummary.buying.username,
      transactionSummary.buying.units,
      transactionSummary.buying.currency,
      transactionSummary.buying.fees,
      transactionSummary.buying.networkSymbol,
      transactionSummary.buying.walletAddress,
      transactionSummary.buying.veveUsername || "",
      "purchase");
}

function sendSellerDetails(transactionSummary: ITransactionSummary) {
  return sendNewTransactionEmail(
      transactionSummary.selling.userEmail,
      transactionSummary.selling.username,
      transactionSummary.selling.units,
      transactionSummary.selling.currency,
      transactionSummary.selling.fees,
      transactionSummary.selling.networkSymbol,
      transactionSummary.selling.walletAddress,
      transactionSummary.selling.veveUsername || "",
      "sell");
}

function sendNewTransactionEmail(
    to: string,
    username: string,
    units: number,
    currency: string,
    fees: IFees,
    networkSymbol: string,
    walletAddress: string,
    veveUsername: string,
    context: string) {
  const msg = {
    to: to,
    from: "mofe.salami@gmail.com",
    subject: "Your transaction has been matched",
    html: "Hi " + username + "," +
          "<br>" +
          "<br> Your transaction to " + context + " " + units + " " + currency + " has been confirmed." +
          "<br>" +
          "<br> Please send " + units + " " + currency + " to the address: {{Ecomi Wallet Address}}" +
          "<br>" +
          "<br> You will be charged the following fees:" +
          "<ul><li>Network fees: " + fees.networkFees + " " + networkSymbol + "</li></ul>" +
          "<ul><li>Platform fees: " + fees.platformFees + " " + networkSymbol + "</li></ul>"+
          "<br>" +
          "<br> You will send:",
  };
  return SendGrid.send(msg);
}

exports.matchTransaction = functions.region("europe-west2").https.onRequest(
    (request: functions.https.Request, response: functions.Response) => {
      response.set("Access-Control-Allow-Origin", "*");

      corsHandler(request, response, () => {
        const transactionId = request.get(HEADERS.X_TRANSACTION_ID);
        const sellerUid = request.get(HEADERS.X_SELLER_UID);
        const buyerUid = request.get(HEADERS.X_BUYER_UID);
        const buyerWalletAddress = request.get(HEADERS.X_BUYER_WALLET_ADDRESS);
        const buyerVeveUsername = request.get(HEADERS.X_BUYER_VEVE_USERNAME);

        // console.log(`Buyer Uid: ${buyerUid}, Seller Uid, ${sellerUid}, Transaction Id: ${transactionId}`);

        if (transactionId !== undefined &&
          sellerUid !== undefined &&
          buyerUid !== undefined &&
          buyerWalletAddress!= undefined) {
          // console.log(`Preparing documents for user: ${userUid}`);
          const buyerDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users")
              .doc(buyerUid);

          const transactionDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("transactions")
              .doc(transactionId);

          const sellerDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users")
              .doc(sellerUid);


          return admin
              .firestore()
              .runTransaction(async (transaction: admin.firestore.Transaction) => {
                const buyerDoc: admin.firestore.DocumentSnapshot = await transaction.get(buyerDocRef);

                // Check that the buyer creating the request is authorised
                if (isAuthorised(request, buyerDoc)) {
                  const transactionDoc: admin.firestore.DocumentSnapshot = await transaction.get(transactionDocRef);
                  const sellerDoc: admin.firestore.DocumentSnapshot = await transaction.get(sellerDocRef);

                  // Check that the transaction is Available before updating it
                  if (transactionDoc.get("status") == "Available") {
                    // console.log("Validated transaction status");
                    // Update the status and the buyerUid if it's a valid and available transaction
                    transaction.set(transactionDocRef, {
                      status: "In Progress",
                      buying: {
                        username: buyerDoc.get("username"),
                        walletAddress: buyerWalletAddress,
                        veveUsername: buyerVeveUsername,
                      },
                    }, {merge: true});

                    // console.log("Updated transaction doc");

                    const transactionData: FirebaseFirestore.DocumentData | undefined = transactionDoc.data();
                    if (transactionDoc.exists) {
                      const transactionSummary: ITransactionSummary = {
                        id: transactionData?.id,
                        buying: {
                          currency: transactionData?.buying?.currency,
                          units: transactionData?.buying?.units,
                          userEmail: buyerDoc.get("email"),
                          username: buyerDoc.get("username"),
                          networkSymbol: transactionData?.buying?.networkSymbol,
                          walletAddress: transactionData?.buying?.walletAddress,
                          veveUsername: transactionData?.buying?.veveUsername,
                          fees: transactionData?.buying?.fees,
                        },
                        selling: {
                          currency: transactionData?.selling?.currency,
                          units: transactionData?.selling?.units,
                          userEmail: sellerDoc.get("email"),
                          username: sellerDoc.get("username"),
                          networkSymbol: transactionData?.selling?.networkSymbol,
                          walletAddress: transactionData?.selling?.walletAddress,
                          veveUsername: transactionData?.selling?.veveUsername,
                          fees: transactionData?.selling?.fees,
                        },
                      };
                      console.log(transactionSummary);
                      return transactionSummary;
                    } else {
                      throw new functions.https.HttpsError(
                          "not-found",
                          ERROR_MESSAGES.NOT_FOUND_DATA
                      );
                    }
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
                return sendEmails(transactionSummary);
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

async function sendEmails(transactionSummary: ITransactionSummary) {
  await sendBuyerDetails(transactionSummary);
  await sendSellerDetails(transactionSummary);
}
