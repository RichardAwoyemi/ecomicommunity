import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.user$ = firebaseAuth.authState;
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
