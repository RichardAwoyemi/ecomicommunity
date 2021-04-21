import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRegistrationError } from 'src/app/auth/state';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AuthActions from '../../../../auth/state/auth.actions';
import * as AppActions from '../../../../state/app.actions';
import { getRememberMe } from '../../../../state/index';

@Component({
  selector: 'ec-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.resetSignupError());
    this.errorMessage$ = this.store.select(getRegistrationError);
    this.rememberMe$ = this.store.select(getRememberMe);
  }

  signIn() {
    this.store.dispatch(
      AuthActions.credentialsLogin({
        email: this.email,
        password: this.password,
      })
    );
  }

  toggleRememberMe(toggle: boolean | null) {
    this.store.dispatch(AppActions.ToggleRememberMe());
  }

  closeModal() {
    this.store.dispatch(AppActions.HideAuthModal());
  }
}
