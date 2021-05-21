/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {HEADERS, IAmount, IFees, ITransactionSummary} from "./utils/function.utils";
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
        const creatorUid = request.get(HEADERS.X_CREATOR_UID);
        const purchasorUid = request.get(HEADERS.X_PURCHASOR_UID);
        const creatorReceivingWalletAddress = request.get(HEADERS.X_CREATOR_RECEIVING_WALLET_ADDRESS);
        const creatorReceivingVeveUsername = request.get(HEADERS.X_CREATOR_RECEIVING_VEVE_USERNAME);
        const purchasorSendingWalletAddress = request.get(HEADERS.X_PURCHASOR_SENDING_WALLET_ADDRESS);
        const purchasorSendingVeveUsername = request.get(HEADERS.X_PURCHASOR_SENDING_VEVE_USERNAME);
        const ecomiReceivingCreatorWalletAddress = request.get(HEADERS.X_ECOMI_RECEIVING_CREATOR_WALLET_ADDRESS);
        const ecomiReceivingCreatorVeveUsername = request.get(HEADERS.X_ECOMI_RECEIVING_CREATOR_VEVE_USERNAME);
        const ecomiReceivingPurchasorWalletAddress = request.get(HEADERS.X_ECOMI_RECEIVING_PURCHASOR_WALLET_ADDRESS);
        const ecomiReceivingPurchasorVeveUsername = request.get(HEADERS.X_ECOMI_RECEIVING_PURCHASOR_VEVE_USERNAME);

        // functions.logger.log(`Buyer Uid: ${creatorUid}, Seller Uid, ${purchasorUid}, Transaction Id: ${transactionId}`);

        if (transactionId !== undefined &&
        purchasorUid !== undefined &&
        creatorUid !== undefined &&
        creatorReceivingWalletAddress != undefined &&
        purchasorSendingWalletAddress != undefined &&
        ecomiReceivingCreatorWalletAddress != undefined &&
        ecomiReceivingPurchasorWalletAddress != undefined) {
        // functions.logger.log(`Preparing documents for user: ${userUid}`);
          const creatorDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users")
              .doc(creatorUid);

          const transactionDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("transactions")
              .doc(transactionId);

          const purchasorDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users")
              .doc(purchasorUid);

          return admin
              .firestore()
              .runTransaction(async (transaction: admin.firestore.Transaction) => {
                const purchasorDoc: admin.firestore.DocumentSnapshot = await transaction.get(purchasorDocRef);

                // Check that the creator creating the request is authorised
                if (isAuthorised(request, purchasorDoc)) {
                  const transactionDoc: admin.firestore.DocumentSnapshot = await transaction.get(transactionDocRef);
                  const creatorDoc: admin.firestore.DocumentSnapshot = await transaction.get(creatorDocRef);

                  // Check that the transaction is Available before updating it
                  if (transactionDoc.get("status") == "Available") {
                  // functions.logger.log("Validated transaction status");
                  // Update the status and the creatorUid if it's a valid and available transaction
                    transaction.set(transactionDocRef, {
                      status: "In Progress",
                      creator: {
                        useruid: creatorUid,
                        username: creatorDoc.get("username"),
                        receivingWallet: {
                          walletAddress: creatorReceivingWalletAddress,
                          veveUsername: creatorReceivingVeveUsername,
                        },
                        ecomiReceivingWallet: {
                          walletAddress: ecomiReceivingCreatorWalletAddress,
                          veveUsername: ecomiReceivingCreatorVeveUsername,
                        },
                      },
                      purchasor: {
                        useruid: purchasorUid,
                        username: purchasorDoc.get("username"),
                        ecomiReceivingWallet: {
                          walletAddress: ecomiReceivingPurchasorWalletAddress,
                          veveUsername: ecomiReceivingPurchasorVeveUsername,
                        },
                        sendingWallet: {
                          walletAddress: purchasorSendingWalletAddress,
                          veveUsername: purchasorSendingVeveUsername,
                        },
                      },
                    }, {merge: true});

                    // functions.logger.log("Updated transaction doc");

                    const transactionData: FirebaseFirestore.DocumentData | undefined = transactionDoc.data();
                    if (transactionDoc.exists) {
                      const transactionSummary = setTransactionSummary(transactionData, creatorDoc, purchasorDoc);
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
                response.status(200).send({message: "transactions added and first email sent to creator and purchasor"});
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
  // functions.logger.log("status before: '" + beforeStatus + "', status after: '", afterStatus + "'");

  if (beforeStatus == "In Progress" && afterStatus == "Completed") {
    const purchasorDocRef: admin.firestore.DocumentReference = admin
        .firestore()
        .collection("users")
        .doc(transactionData.purchasor.useruid);
    const creatorDocRef: admin.firestore.DocumentReference = admin
        .firestore()
        .collection("users")
        .doc(transactionData.creator.useruid);

    return admin
        .firestore()
        .runTransaction(async (transaction: admin.firestore.Transaction) => {
          const creatorDoc: admin.firestore.DocumentSnapshot = await transaction.get(creatorDocRef);
          const purchasorDoc: admin.firestore.DocumentSnapshot = await transaction.get(purchasorDocRef);
          const transactionSummary = setTransactionSummary(transactionData, creatorDoc, purchasorDoc);

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
    transactionId: string,
    username: string,
    receivingUnits: number,
    receivingCurrency: string,
    receivingWallet: string | undefined,
    receivingNetwork: string,
    sendingUnits: number,
    sendingCurrency: string,
    sendingWallet: string | undefined,
    sendingNetwork: string,
    ecomiReceivingWallet: string | undefined,
    fees: IFees,
): string {
  return "Hi " + username + "," +
  "<br>" +
  "<br>Your transaction #" + transactionId + " has been confirmed!" +
  "<br>" +
  "<br>Please send " + sendingUnits + " " + sendingCurrency + " on the " + sendingNetwork + " network:" +
  "<ul>" +
  "  <li>Send from your wallet: " + sendingWallet + "</li>" +
  "  <li>Send to the wallet: " + ecomiReceivingWallet + "</li>" +
  "</ul>"+
  "<br>" +
  "<br>Once we have received both amounts from both parties, we will send another email to notify you of your purchase." +
  "<br>When this happens, you will receive " + receivingUnits + " " + receivingCurrency + " on the " + receivingNetwork + " network:" +
  "<ul>" +
  "  <li>Sent to your wallet: " + receivingWallet + " " + receivingNetwork + "</li>" +
  "</ul>" +
  "<br>" +
  "<br>You will be charged the following fees:" +
  "<ul>"+
  "  <li>Network fees: " + fees.networkFees + " " + receivingCurrency + "</li>" +
  "  <li>Platform fees (5%): " + fees.platformFees + " " + receivingCurrency + "</li>" +
  "  <li>Amount after fees: " + fees.totalPostFees + " " + receivingCurrency + "</li>" +
  "</ul>"+
  "<br>" +
  "<br> Please be sure to reach out if any of the details above in incorrect!";
}


function createEmailContentForTransactionCompleted(
    transactionId: string,
    username: string,
    receivingUnits: number,
    receivingCurrency: string,
    receivingWallet: string | undefined,
    receivingNetwork: string,
    fees: IFees,
): string {
  return "Hi " + username + "," +
  "<br>" +
  "<br>Good news! Your transaction #" + transactionId + " has been completed!" +
  "<br>" +
  "<br>We have received both parties funds and have now completed your transaction!" +
  "<br>Please give 24hrs, to receive " + receivingUnits + " " + receivingCurrency + " on the " + receivingNetwork + " network:" +
  "<ul>" +
  "  <li>Sent to your wallet: " + receivingWallet + " " + receivingNetwork + "</li>" +
  "</ul>" +
  "<br>" +
  "<br>You will be charged the following fees:" +
  "<ul>"+
  "  <li>Network fees: " + fees.networkFees + " " + receivingCurrency + "</li>" +
  "  <li>Platform fees (5%): " + fees.platformFees + " " + receivingCurrency + "</li>" +
  "  <li>Amount after fees: " + fees.totalPostFees + " " + receivingCurrency + "</li>" +
  "</ul>"+
  "<br>" +
  "<br>If you encounter any issues please reach out!";
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
  const subject = "Transaction #" + transactionSummary.id + ": Your transaction has been matched!";
  await sendEmailToPerson(
      transactionSummary.creator.userEmail,
      subject,
      createEmailContentForTransactionMatch(
          transactionSummary.id,
          transactionSummary.creator.username,
          transactionSummary.purchasor.units,
          transactionSummary.purchasor.currency,
          transactionSummary.creator.receivingWallet?.walletAddress,
          transactionSummary.creator.networkSymbol,
          transactionSummary.purchasor.units,
          transactionSummary.purchasor.currency,
          transactionSummary.purchasor.receivingWallet?.walletAddress,
          transactionSummary.purchasor.networkSymbol,
          transactionSummary.creator.ecomiReceivingWallet?.walletAddress,
          transactionSummary.creator.fees
      )
  );
  await sendEmailToPerson(
      transactionSummary.purchasor.userEmail,
      subject,
      createEmailContentForTransactionMatch(
          transactionSummary.id,
          transactionSummary.purchasor.username,
          transactionSummary.creator.units,
          transactionSummary.creator.currency,
          transactionSummary.purchasor.receivingWallet?.walletAddress,
          transactionSummary.purchasor.networkSymbol,
          transactionSummary.creator.units,
          transactionSummary.creator.currency,
          transactionSummary.creator.receivingWallet?.walletAddress,
          transactionSummary.creator.networkSymbol,
          transactionSummary.purchasor.ecomiReceivingWallet?.walletAddress,
          transactionSummary.purchasor.fees
      )
  );
}

async function sendCompletedEmails(transactionSummary: ITransactionSummary) {
  const subject = "Transaction #" + transactionSummary.id + ": Your transaction has been completed!";
  await sendEmailToPerson(
      transactionSummary.creator.userEmail,
      subject,
      createEmailContentForTransactionCompleted(
          transactionSummary.id,
          transactionSummary.creator.username,
          transactionSummary.purchasor.units,
          transactionSummary.purchasor.currency,
          transactionSummary.creator.receivingWallet?.walletAddress,
          transactionSummary.creator.networkSymbol,
          transactionSummary.creator.fees)
  );
  await sendEmailToPerson(
      transactionSummary.purchasor.userEmail,
      subject,
      createEmailContentForTransactionCompleted(
          transactionSummary.id,
          transactionSummary.purchasor.username,
          transactionSummary.creator.units,
          transactionSummary.creator.currency,
          transactionSummary.purchasor.receivingWallet?.walletAddress,
          transactionSummary.purchasor.networkSymbol,
          transactionSummary.purchasor.fees)
  );
}

function setTransactionSummary(
    transactionData: FirebaseFirestore.DocumentData | undefined,
    creatorDoc: admin.firestore.DocumentSnapshot,
    purchasorDoc: admin.firestore.DocumentSnapshot
): ITransactionSummary {
  const transactionSummary: ITransactionSummary = {
    id: transactionData?.id,
    creator: {
      currency: transactionData?.creator?.currency,
      units: transactionData?.creator?.units,
      userEmail: creatorDoc.get("email"),
      username: transactionData?.creator?.username || creatorDoc.get("username"),
      networkSymbol: transactionData?.creator?.networkSymbol,
      receivingWallet: transactionData?.creator?.receivingWallet,
      sendingWallet: transactionData?.creator?.sendingWallet,
      ecomiReceivingWallet: transactionData?.creator?.ecomiReceivingWallet,
      fees: transactionData?.creator?.fees,
    },
    purchasor: {
      currency: transactionData?.purchasor?.currency,
      units: transactionData?.purchasor?.units,
      userEmail: purchasorDoc.get("email"),
      username: transactionData?.purchasor?.username || purchasorDoc.get("username"),
      networkSymbol: transactionData?.purchasor?.networkSymbol,
      receivingWallet: transactionData?.purchasor?.receivingWallet,
      sendingWallet: transactionData?.purchasor?.sendingWallet,
      ecomiReceivingWallet: transactionData?.purchasor?.ecomiReceivingWallet,
      fees: transactionData?.purchasor?.fees,
    },
  };
  return transactionSummary;
}
