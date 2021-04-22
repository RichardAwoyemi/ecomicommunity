import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { getRememberMe } from '../state/index';
import { IUser } from '../state/app.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
    private store: Store<State>
  ) {
    this.user$ = firebaseAuth.authState;
  }

  clearUser() {
    sessionStorage.removeItem('ec-user');
    localStorage.removeItem('ec-user');
  }

  signup(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async sendRegistrationVerificationEmail(): Promise<void> {
    return (await this.firebaseAuth.currentUser)?.sendEmailVerification();
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    sessionStorage.removeItem('ec-user');
    localStorage.removeItem('ec-user');
    return this.firebaseAuth.signOut();
  }
}
