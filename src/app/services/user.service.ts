import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser, IUserPrivate } from 'functions/src/utils/interfaces.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore, public router: Router) {}

  setUser(user: IUser): Promise<void> {
    const usersRef: AngularFirestoreDocument = this.afs.doc<IUser>(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      photoURL: user.photoURL
    };
    return usersRef.set(userData, {
      merge: true,
    });
  }

  setUserSecretById(userid: string): Promise<void> {
    var makeid = (length: number) => {
      var result = [];
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join('');
    };

    const secret = makeid(12);
    const usersPrivateRef: AngularFirestoreDocument = this.afs.doc(
      `users-private/${userid}`
    );
    const userPrivateData = {
      uid: userid,
      secret: secret
    };
    return usersPrivateRef.set(userPrivateData, {
      merge: true,
    });
  }

  getUserSecretById(id: string | undefined): Observable<IUserPrivate> {
    return this.afs
      .collection<IUserPrivate>('users-private')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          const uid = action.payload.id;
          return { uid, ...(<IUserPrivate>data) };
        })
      );
  }

  getUserById(id: string | undefined): Observable<IUser> {
    return this.afs
      .collection<IUser>('users')
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

  userWithUsernameExists(username: string | undefined): Observable<Boolean> {
    return this.afs
      .collection<IUser>('users', ref => ref.where('username', '==', username))
      .snapshotChanges()
      .pipe(
        map(users => {
          return users.length > 0;
        })
      );
  }
}
