import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getLoginError, getRememberMe } from '../../../../state/index';

@Component({
  selector: 'ec-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;
  rememberMe? = false;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.resetLoginError());
    this.errorMessage$ = this.store.select(getLoginError);
    this.rememberMe$ = this.store.select(getRememberMe);
  }

  signIn(): void {
    this.store.dispatch(
      AppActions.credentialsLogin({
        email: this.email,
        password: this.password,
        remember: this.rememberMe,
      })
    );
  }

  toggleRememberMe(toggle: boolean) {
    this.rememberMe = toggle;
    this.store.dispatch(AppActions.toggleRememberMe());
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Registration}));
  }
}
