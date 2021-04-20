import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';

import { getLoginError } from '../../state';
import * as AuthActions from '../../state/auth.actions';

@Component({
  selector: 'pt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isChecked = false;
  errorMessage$!: Observable<string>;
  user$!: Observable<firebase.auth.UserCredential | null>;

  constructor(private store: Store<State>, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.resetLoginError());
    this.errorMessage$ = this.store.select(getLoginError);
  }

  login() {
    this.store.dispatch(
      AuthActions.credentialsLogin({
        email: this.email,
        password: this.password,
        remember: this.isChecked,
      })
    );
  }

  logout() {
    this.authService.logout();
  }
}
