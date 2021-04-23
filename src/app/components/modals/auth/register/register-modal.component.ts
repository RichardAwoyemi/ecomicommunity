import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getEmailConsent, getRegistrationError } from '../../../../state/index';

@Component({
  selector: 'ec-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;
  emailConsent$!: Observable<boolean>;
  consent? = false;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.resetSignupError());
    this.errorMessage$ = this.store.select(getRegistrationError);
    this.emailConsent$ = this.store.select(getEmailConsent);
  }

  signup() {
    this.store.dispatch(
      AppActions.credentialsRegistration({
        email: this.email,
        password: this.password,
      })
    );
  }

  toggleEmailConsent(toggle: boolean | null) {
    this.store.dispatch(AppActions.toggleEmailConsent());
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Login}));
  }
}
