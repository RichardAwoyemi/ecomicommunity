/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {HEADERS, IAmount, ITransactionSummary} from "./utils/function.utils";
import {CustomError, ERROR_MESSAGES} from "./utils/error.utils";
import * as SendGrid from "@sendgrid/mail";
import cors = require("cors");

admin.initializeApp(functions.config().firebase);
const corsHandler = cors({origin: true});
SendGrid.setApiKey(functions.config().mail.test.key);

exports.matchTransaction = functions.region("europe-west2").https.onRequest(
    (request: functions.https.Request, response: functions.Response) => {
      response.set("Access-Control-Allow-Origin", "*");

      corsHandler(request, response, () => {
        const transactionId = request.get(HEADERS.X_TRANSACTION_ID);
        const sellerUid = request.get(HEADERS.X_SELLER_UID);
        const buyerUid = request.get(HEADERS.X_BUYER_UID);
        const buyerWalletAddress = request.get(HEADERS.X_BUYER_WALLET_ADDRESS);
        const buyerVeveUsername = request.get(HEADERS.X_BUYER_VEVE_USERNAME);

        // functions.logger.log(`Buyer Uid: ${buyerUid}, Seller Uid, ${sellerUid}, Transaction Id: ${transactionId}`);

        if (transactionId !== undefined &&
        sellerUid !== undefined &&
        buyerUid !== undefined &&
        buyerWalletAddress!= undefined) {
        // functions.logger.log(`Preparing documents for user: ${userUid}`);
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
                  // functions.logger.log("Validated transaction status");
                  // Update the status and the buyerUid if it's a valid and available transaction
                    transaction.set(transactionDocRef, {
                      status: "In Progress",
                      buying: {
                        useruid: buyerDoc.get("uid"),
                        username: buyerDoc.get("username"),
                        walletAddress: buyerWalletAddress,
                        veveUsername: buyerVeveUsername,
                      },
                    }, {merge: true});

                    // functions.logger.log("Updated transaction doc");

                    const transactionData: FirebaseFirestore.DocumentData | undefined = transactionDoc.data();
                    if (transactionDoc.exists) {
                      const transactionSummary = setTransactionSummary(transactionData, buyerDoc, sellerDoc);
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
                return sendMatchedEmails(transactionSummary);
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

exports.sendTransactionCompleteEmail = functions.region("europe-west2").firestore.document("/transactions/{transactionId}").onUpdate((change) => {
  const transactionData = change.after.data();
  const beforeStatus = change.before.data().status;
  const afterStatus = transactionData.status;
  functions.logger.log("status before: '" + beforeStatus + "', status after: '", afterStatus + "'");

  if (beforeStatus == "In Progress" && afterStatus == "Completed") {
    const sellerDocRef: admin.firestore.DocumentReference = admin
        .firestore()
        .collection("users")
        .doc(transactionData.selling.useruid);
    const buyerDocRef: admin.firestore.DocumentReference = admin
        .firestore()
        .collection("users")
        .doc(transactionData.buying.useruid);

    return admin
        .firestore()
        .runTransaction(async (transaction: admin.firestore.Transaction) => {
          const buyerDoc: admin.firestore.DocumentSnapshot = await transaction.get(buyerDocRef);
          const sellerDoc: admin.firestore.DocumentSnapshot = await transaction.get(sellerDocRef);
          const transactionSummary = setTransactionSummary(transactionData, buyerDoc, sellerDoc);

          return transactionSummary;
        })
        .then((transactionSummary: ITransactionSummary) => {
          functions.logger.log("Sending completed emails");
          return sendCompletedEmails(transactionSummary);
        })
        .then(() => {
          functions.logger.log("Sent completed emails");
          return;
        })
        .catch((error) => {
          functions.logger.error(error);
        });
  } else {
    return;
  }
});

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

function createEmailContentForTransactionMatch(
    person: IAmount
): string {
  return "Hi " + person.username + "," +
  "<br>" +
  "<br> Your transaction to buy " + person.units + " " + person.currency + " has been confirmed." +
  "<br>" +
  "<br> Please send " + person.units + " " + person.currency + " to the address: {{Ecomi Wallet Address}}" +
  "<br>" +
  "<br> You will be charged the following fees:" +
  "<ul><li>Network fees: " + person.fees.networkFees + " " + person.networkSymbol + "</li></ul>" +
  "<ul><li>Platform fees: " + person.fees.platformFees + " " + person.networkSymbol + "</li></ul>"+
  "<br>" +
  "<br> You will send:";
}


function createEmailContentForTransactionCompleted(
    person: IAmount
): string {
  return "Hi " + person.username + "," +
  "<br>" +
  "<br> Your transaction to buy " + person.units + " " + person.currency + " has been completed!" +
  "<br>" +
  "<br> Please wait up to 48hrs to recieve your funds in your wallet ";
}

function sendEmailToPerson(
    to: string,
    subject: string,
    html: string) {
  const msg = {
    to: to,
    from: "mofe.salami@gmail.com",
    subject: subject,
    html: html,
  };
  return SendGrid.send(msg);
}

async function sendMatchedEmails(transactionSummary: ITransactionSummary) {
  const subject = "Your transaction has been matched";
  await sendEmailToPerson(
      transactionSummary.buying.userEmail,
      subject,
      createEmailContentForTransactionMatch(transactionSummary.buying)
  );
  await sendEmailToPerson(
      transactionSummary.selling.userEmail,
      subject,
      createEmailContentForTransactionMatch(transactionSummary.selling)
  );
}

async function sendCompletedEmails(transactionSummary: ITransactionSummary) {
  const subject = "Your transaction has been completed";
  await sendEmailToPerson(
      transactionSummary.buying.userEmail,
      subject,
      createEmailContentForTransactionCompleted(transactionSummary.buying)
  );
  await sendEmailToPerson(
      transactionSummary.selling.userEmail,
      subject,
      createEmailContentForTransactionCompleted(transactionSummary.selling)
  );
}

function setTransactionSummary(
    transactionData: FirebaseFirestore.DocumentData | undefined,
    buyerDoc: admin.firestore.DocumentSnapshot,
    sellerDoc: admin.firestore.DocumentSnapshot
): ITransactionSummary {
  const transactionSummary: ITransactionSummary = {
    id: transactionData?.id,
    buying: {
      currency: transactionData?.buying?.currency,
      units: transactionData?.buying?.units,
      userEmail: buyerDoc.get("email"),
      username: transactionData?.buying?.username || buyerDoc.get("username"),
      networkSymbol: transactionData?.buying?.networkSymbol,
      walletAddress: transactionData?.buying?.walletAddress,
      veveUsername: transactionData?.buying?.veveUsername,
      fees: transactionData?.buying?.fees,
    },
    selling: {
      currency: transactionData?.selling?.currency,
      units: transactionData?.selling?.units,
      userEmail: sellerDoc.get("email"),
      username: transactionData?.selling?.username || sellerDoc.get("username"),
      networkSymbol: transactionData?.selling?.networkSymbol,
      walletAddress: transactionData?.selling?.walletAddress,
      veveUsername: transactionData?.selling?.veveUsername,
      fees: transactionData?.selling?.fees,
    },
  };
  return transactionSummary;
}
