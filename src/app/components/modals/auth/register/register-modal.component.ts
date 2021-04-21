import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRegistrationError } from 'src/app/auth/state';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AuthActions from '../../../../auth/state/auth.actions';
import * as AppActions from '../../../../state/app.actions';
import { getEmailConsent } from '../../../../state/index';

@Component({
  selector: 'ec-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;
  emailConsent$!: Observable<boolean>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.resetSignupError());
    this.errorMessage$ = this.store.select(getRegistrationError);
    this.emailConsent$ = this.store.select(getEmailConsent);
  }

  signup() {
    this.store.dispatch(
      AuthActions.credentialsRegistration({
        email: this.email,
        password: this.password,
      })
    );
  }

  toggleEmailConsent(toggle: boolean | null) {
    this.store.dispatch(AppActions.ToggleEmailConsent());
  }

  closeModal() {
    this.store.dispatch(AppActions.HideAuthModal());
  }
}
