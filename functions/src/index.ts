/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {HEADERS} from "./utils/constants.utils";
import {CustomError, ERROR_MESSAGES} from "./utils/error.utils";
import * as SendGrid from "@sendgrid/mail";
import cors = require("cors");
import {ITransaction, IFees} from "./utils/interfaces.utils";

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
        const purchasorEmail = request.get(HEADERS.X_PURCHASOR_EMAIL);
        const purchasorUsername = request.get(HEADERS.X_PURCHASOR_USERNAME);
        const purchasorReceivingWalletAddress = request.get(HEADERS.X_PURCHASOR_RECEIVING_WALLET_ADDRESS);
        const purchasorReceivingVeveUsername = request.get(HEADERS.X_PURCHASOR_RECEIVING_VEVE_USERNAME);
        const purchasorSendingWalletAddress = request.get(HEADERS.X_PURCHASOR_SENDING_WALLET_ADDRESS);
        const purchasorSendingVeveUsername = request.get(HEADERS.X_PURCHASOR_SENDING_VEVE_USERNAME);

        // functions.logger.log(`Buyer Uid: ${creatorUid}, Seller Uid, ${purchasorUid}, Transaction Id: ${transactionId}`);

        if (transactionId !== undefined && transactionId !== "" &&
        purchasorUid !== undefined && purchasorUid !== "" &&
        purchasorEmail !== undefined && purchasorEmail !== "" &&
        purchasorUsername !== undefined && purchasorUsername !== "" &&
        creatorUid !== undefined && creatorUid !== "" &&
        purchasorReceivingWalletAddress != undefined && purchasorReceivingWalletAddress !== "" &&
        purchasorSendingWalletAddress != undefined && purchasorSendingWalletAddress !== "") {
        // functions.logger.log(`Preparing documents for user: ${userUid}`);
          const transactionDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("transactions")
              .doc(transactionId);

          const purchasorPrivateDocRef: admin.firestore.DocumentReference = admin
              .firestore()
              .collection("users-private")
              .doc(purchasorUid);

          return admin
              .firestore()
              .runTransaction(async (transaction: admin.firestore.Transaction) => {
                const purchasorPrivateDoc: admin.firestore.DocumentSnapshot = await transaction.get(purchasorPrivateDocRef);

                // Check that the creator creating the request is authorised
                if (isAuthorised(request, purchasorPrivateDoc)) {
                  const transactionDoc: admin.firestore.DocumentSnapshot = await transaction.get(transactionDocRef);

                  // Check that the transaction is Available before updating it
                  if (transactionDoc.get("status") == "Available") {
                    // functions.logger.log("Validated transaction status");
                    // Update the status and the creatorUid if it's a valid and available transaction
                    transaction.set(transactionDocRef, {
                      status: "In Progress",
                      purchasor: {
                        useruid: purchasorUid,
                        username: purchasorUsername,
                        sendingWallet: {
                          walletAddress: purchasorSendingWalletAddress,
                          veveUsername: purchasorSendingVeveUsername,
                        },
                        receivingWallet: {
                          walletAddress: purchasorReceivingWalletAddress,
                          veveUsername: purchasorReceivingVeveUsername,
                        },
                      },
                    }, {merge: true});

                    // functions.logger.log("Updated transaction doc");

                    const transactionData: FirebaseFirestore.DocumentData | undefined = transactionDoc.data();
                    if (transactionDoc.exists) {
                      const transactionSummary = setTransactionSummary(transactionData, purchasorEmail, purchasorUsername);
                      // functions.logger.log(transactionSummary);
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
              .then((transactionSummary: ITransaction) => {
                return sendMatchedEmails(transactionSummary);
              })
              .then(() => {
                response.status(200).send({message: "transactions added and first email sent to creator and purchasor"});
              })
              .catch((error: CustomError) => {
                functions.logger.error(error);
                errorHandler(error, response);
              });
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

    return admin
        .firestore()
        .runTransaction(async (transaction: admin.firestore.Transaction) => {
          const purchasorDoc: admin.firestore.DocumentSnapshot = await transaction.get(purchasorDocRef);
          const transactionSummary = setTransactionSummary(transactionData, purchasorDoc.get("email"), purchasorDoc.get("username"));

          return transactionSummary;
        })
        .then((transactionSummary: ITransaction) => {
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
    receivingWallet: string,
    receivingNetwork: string,
    sendingUnits: number,
    sendingCurrency: string,
    sendingWallet: string,
    sendingNetwork: string,
    platformReceivingWallet: string,
    fees: IFees,
): string {
  return "Hi " + username + "," +
    "<br>" +
    "<br>Your transaction #" + transactionId + " has been confirmed!" +
    "<br>" +
    "<br>Please send " + sendingUnits + " " + sendingCurrency + " on the " + sendingNetwork + " network:" +
    "<ul>" +
    "  <li>Send from your wallet: " + sendingWallet + "</li>" +
    "  <li>Send to the wallet: " + platformReceivingWallet + "</li>" +
    "</ul>" +
    "<br>" +
    "<br>Once we have received both amounts from both parties, we will send another email to notify you of your purchase." +
    "<br>When this happens, you will receive " + receivingUnits + " " + receivingCurrency + " on the " + receivingNetwork + " network:" +
    "<ul>" +
    "  <li>Sent to your wallet: " + receivingWallet + " " + receivingNetwork + "</li>" +
    "</ul>" +
    "<br>" +
    "<br>You will be charged the following fees:" +
    "<ul>" +
    "  <li>Network fees: " + fees.networkFees + " " + receivingCurrency + "</li>" +
    "  <li>Platform fees (5%): " + fees.platformFees + " " + receivingCurrency + "</li>" +
    "  <li>Amount after fees: " + fees.totalPostFees + " " + receivingCurrency + "</li>" +
    "</ul>" +
    "<br>" +
    "<br> Please be sure to reach out if any of the details above in incorrect!";
}


function createEmailContentForTransactionCompleted(
    transactionId: string,
    username: string,
    receivingUnits: number,
    receivingCurrency: string,
    receivingWallet: string,
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
    "<ul>" +
    "  <li>Network fees: " + fees.networkFees + " " + receivingCurrency + "</li>" +
    "  <li>Platform fees (5%): " + fees.platformFees + " " + receivingCurrency + "</li>" +
    "  <li>Amount after fees: " + fees.totalPostFees + " " + receivingCurrency + "</li>" +
    "</ul>" +
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

async function sendMatchedEmails(transactionSummary: ITransaction) {
  const subject = "Transaction #" + transactionSummary.id + ": Your transaction has been matched!";
  await sendEmailToPerson(
      getString(transactionSummary.creator.email),
      subject,
      createEmailContentForTransactionMatch(
          getString(transactionSummary.id),
          getString(transactionSummary.creator.username),
          getNumber(transactionSummary.purchasor.units),
          getString(transactionSummary.purchasor.currency),
          getString(transactionSummary.creator.receivingWallet?.walletAddress),
          getString(transactionSummary.creator.receivingWallet?.networkSymbol),
          getNumber(transactionSummary.purchasor.units),
          getString(transactionSummary.purchasor.currency),
          getString(transactionSummary.creator.sendingWallet?.walletAddress),
          getString(transactionSummary.creator.sendingWallet?.network),
          getString(transactionSummary.creator.platformReceivingWallet?.walletAddress),
          getFees(transactionSummary.creator.fees)
      )
  );
  await sendEmailToPerson(
      getString(transactionSummary.purchasor.email),
      subject,
      createEmailContentForTransactionMatch(
          getString(transactionSummary.id),
          getString(transactionSummary.purchasor.username),
          getNumber(transactionSummary.creator.units),
          getString(transactionSummary.creator.currency),
          getString(transactionSummary.purchasor.receivingWallet?.walletAddress),
          getString(transactionSummary.purchasor.receivingWallet?.networkSymbol),
          getNumber(transactionSummary.creator.units),
          getString(transactionSummary.creator.currency),
          getString(transactionSummary.purchasor.sendingWallet?.walletAddress),
          getString(transactionSummary.purchasor.sendingWallet?.network),
          getString(transactionSummary.purchasor.platformReceivingWallet?.walletAddress),
          getFees(transactionSummary.purchasor.fees)
      )
  );
}

async function sendCompletedEmails(transaction: ITransaction) {
  const subject = "Transaction #" + transaction.id + ": Your transaction has been completed!";
  await sendEmailToPerson(
      getString(transaction.creator.email),
      subject,
      createEmailContentForTransactionCompleted(
          getString(transaction.id),
          getString(transaction.creator.username),
          getNumber(transaction.purchasor.units),
          getString(transaction.purchasor.currency),
          getString(transaction.creator.receivingWallet?.walletAddress),
          getString(transaction.creator.receivingWallet?.network),
          getFees(transaction.creator.fees))
  );
  await sendEmailToPerson(
      getString(transaction.purchasor.email),
      subject,
      createEmailContentForTransactionCompleted(
          getString(transaction.id),
          getString(transaction.purchasor.username),
          getNumber(transaction.creator.units),
          getString(transaction.creator.currency),
          getString(transaction.purchasor.receivingWallet?.walletAddress),
          getString(transaction.purchasor.receivingWallet?.network),
          getFees(transaction.purchasor.fees))
  );
}

function setTransactionSummary(
    transactionData: FirebaseFirestore.DocumentData | undefined,
    purchasorEmail: string,
    purchasorUsername: string,
): ITransaction {
  const transactionSummary: ITransaction = {
    id: transactionData?.id,
    creator: {
      currency: transactionData?.creator?.currency,
      units: transactionData?.creator?.units,
      email: transactionData?.creator?.email,
      username: transactionData?.creator?.username,
      receivingWallet: transactionData?.creator?.receivingWallet,
      sendingWallet: transactionData?.creator?.sendingWallet,
      platformReceivingWallet: transactionData?.creator?.platformReceivingWallet,
      fees: transactionData?.creator?.fees,
    },
    purchasor: {
      currency: transactionData?.purchasor?.currency,
      units: transactionData?.purchasor?.units,
      email: purchasorEmail,
      username: purchasorUsername,
      receivingWallet: transactionData?.purchasor?.receivingWallet,
      sendingWallet: transactionData?.purchasor?.sendingWallet,
      platformReceivingWallet: transactionData?.purchasor?.platformReceivingWallet,
      fees: transactionData?.purchasor?.fees,
    },
  };
  return transactionSummary;
}

function getString(string: string | undefined): string {
  return string ? string : "";
}

function getNumber(number: number | undefined): number {
  return number ? number : 0;
}

function getFees(fees: IFees | undefined): IFees {
  return fees ? fees : {
    totalPostFees: 0,
    networkFees: 0,
    platformFees: 0,
  };
}
