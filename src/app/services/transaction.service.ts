import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HEADERS } from 'functions/src/utils/constants.utils';
import { AppTransactionStates } from 'functions/src/utils/enums.utils';
import { ITransaction, IUser } from 'functions/src/utils/interfaces.utils';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TransactionService {
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    public router: Router
  ) { }

  addTransaction(tx: ITransaction): Promise<void> {
    const documentId = this.afs.createId();
    const transactionsRef: AngularFirestoreDocument = this.afs.doc(
      `transactions/${documentId}`
    );
    const transactionData: ITransaction = {
      id: documentId,
      creator: tx.creator,
      purchasor: tx.purchasor,
      status: AppTransactionStates.Available,
      datePosted: Date.now().toString(),
    };
    return transactionsRef.set(transactionData, {
      merge: true,
    });
  }

  matchTransaction(
    purchasorUser: IUser,
    transaction: ITransaction,
  ): Promise<string> {

    const creatorUid = this.setString(transaction.creator.useruid);
    const purchasorUid = this.setString(transaction.purchasor.useruid);
    const transactionId = this.setString(transaction.id);
    const purchasorEmail = this.setString(purchasorUser.email);
    const purchasorUsername = this.setString(purchasorUser.username);
    const purchasorReceivingWalletAddress = this.setString(transaction.purchasor?.receivingWallet?.walletAddress);
    const purchasorReceivingVeveUsername = this.setString(transaction.purchasor?.receivingWallet?.veveUsername);
    const purchasorSendingWalletAddress = this.setString(transaction.purchasor?.sendingWallet?.walletAddress);
    const purchasorSendingVeveUsername = this.setString(transaction.purchasor?.sendingWallet?.veveUsername);

    console.table({creatorUid, purchasorUid, transactionId, purchasorEmail, purchasorUsername, purchasorReceivingWalletAddress, purchasorReceivingVeveUsername, purchasorSendingWalletAddress, purchasorSendingVeveUsername})

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + purchasorUser.secret,
    })
      .set(HEADERS.X_CREATOR_UID, creatorUid)
      .set(HEADERS.X_PURCHASOR_UID, purchasorUid)
      .set(HEADERS.X_TRANSACTION_ID, transactionId)
      .set(HEADERS.X_PURCHASOR_EMAIL, purchasorEmail)
      .set(HEADERS.X_PURCHASOR_USERNAME, purchasorUsername)
      .set(HEADERS.X_PURCHASOR_RECEIVING_WALLET_ADDRESS, purchasorReceivingWalletAddress)
      .set(HEADERS.X_PURCHASOR_RECEIVING_VEVE_USERNAME, purchasorReceivingVeveUsername)
      .set(HEADERS.X_PURCHASOR_SENDING_WALLET_ADDRESS, purchasorSendingWalletAddress)
      .set(HEADERS.X_PURCHASOR_SENDING_VEVE_USERNAME, purchasorSendingVeveUsername);

    const options = { headers, responseType: 'json' as const };

    return this.http
      .get(environment.firebaseApiUrl + '/matchTransaction', options)
      .toPromise()
      .then((transactionSummary) => {
        console.log(transactionSummary);
        return 'success';
      })
      .then(() => {
        return "success";
      })
      .catch((error) => {
        throw "error";
      });
  }

  private setString(string: string | undefined | null) {
    return string ? string : '';
  }

  deleteTransaction(id: string): Promise<void> {
    return this.afs.doc(`transactions/${id}`).delete();
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.afs.collection<ITransaction>('transactions').valueChanges();
  }
}
