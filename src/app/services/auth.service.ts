import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
  ) {
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

  logout(): void {
    sessionStorage.removeItem('ec-user');
    localStorage.removeItem('ec-user');
    this.firebaseAuth.signOut().then(() => {
      window.location.reload();
    });
  }
}
