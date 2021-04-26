import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import { IUser } from '../state/app.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore, public router: Router) {}

  setUser(user: IUser): Promise<void> {
    // const documentId = this.afs.createId();
    const usersRef: AngularFirestoreDocument = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
    return usersRef.set(userData, {
      merge: true,
    });
  }

  getUserById(id: string | undefined): Observable<IUser> {
    return this.afs
      .collection('users')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          const uid = action.payload.id;
          return { uid, ...(<IUser>data) };
        })
      );
  }
}
