import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppTransactionStates } from '../state/app.enums';
import { ITransaction, IUser } from '../state/app.model';
import { Observable, from } from 'rxjs';
import { deleteTransaction } from '../state/app.actions';

@Injectable()
export class TransactionService {
  constructor(private afs: AngularFirestore, public router: Router) {}

  addTransaction(tx: ITransaction): Promise<void> {
    const documentId = this.afs.createId();
    const transactionsRef: AngularFirestoreDocument = this.afs.doc(
      `transactions/${documentId}`
    );
    const transactionData: ITransaction = {
      id: documentId,
      seller: tx.seller,
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
