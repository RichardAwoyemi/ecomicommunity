import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HEADERS, ITransactionSummary } from 'functions/src/utils/function.utils';
import { environment } from 'src/environments/environment';
import { ExistingUser, ITransaction } from '../state/app.model';
import { Observable } from 'rxjs';
import { AppTransactionStates } from '../state/app.enums';

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
      userid: tx.userid,
      username: tx.username,
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
}
