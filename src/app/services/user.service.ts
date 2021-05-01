import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../state/app.model';
import DocumentData = firebase.firestore.DocumentData;

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore, public router: Router) {}

  setUser(user: IUser): Promise<void> {
    const usersRef: AngularFirestoreDocument = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      username: user.username,
      email: user.email,
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
