import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HEADERS } from 'functions/src/utils/function.utils';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppTransactionStates } from '../state/app.enums';
import { ExistingUser, ITransaction, IUser } from '../state/app.model';

@Injectable()
export class TransactionService {
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    public router: Router
  ) {}

  addTransaction(tx: ITransaction): Promise<void> {
    const documentId = this.afs.createId();
    const transactionsRef: AngularFirestoreDocument = this.afs.doc(
      `transactions/${documentId}`
    );
    const transactionData: ITransaction = {
      id: documentId,
      sellerUid: tx.sellerUid,
      sellerUsername: tx.sellerUsername,
      selling: {
        currency: tx.selling.currency,
        units: tx.selling.units,
      },
      price: {
        currency: tx.price.currency,
        units: tx.price.units,
      },
      status: AppTransactionStates.Available,
      datePosted: Date.now().toString(),
    };
    return transactionsRef.set(transactionData, {
      merge: true,
    });
  }

  matchTransaction(transactionId: string, sellerUid: string, user: ExistingUser): Promise<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + user.secret,
    })
    .set(HEADERS.X_BUYER_UID, user.uid)
    .set(HEADERS.X_SELLER_UID, sellerUid)
    .set(HEADERS.X_TRANSACTION_ID, transactionId);

    const options = { headers, responseType: 'json' as const };

    return this.http
      .get(environment.firebaseApiUrl + '/matchTransaction', options)
      .toPromise()
      .then((transactionSummary) => {
        console.log(transactionSummary);
        return "success";
      })
      .catch((error) => {
        throw error
      });
  }

  deleteTransaction(id: string): Promise<void> {
    return this.afs.doc(`transactions/${id}`).delete();
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.afs.collection<ITransaction>('transactions').valueChanges();
  }

  confirmPurchase(txn: ITransaction, user: IUser): Promise<void> {
    return this.afs
      .doc(`transactions/${txn.id}`)
      .update({ status: AppTransactionStates.InProgress });
  }
}
