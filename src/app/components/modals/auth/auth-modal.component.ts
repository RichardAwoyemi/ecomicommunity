import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppAuthModalStates } from '../../../state/app.enums';

@Component({
  selector: 'ec-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @Input() state!: string | null;

  LOGOUT_MODAL = AppAuthModalStates.LogOut;
  LOGIN_MODAL = AppAuthModalStates.Login;
  REGISTRATION_MODAL = AppAuthModalStates.Registration;
  EMAIL_VERIFICATION_MODAL = AppAuthModalStates.EmailVerification;

  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(AppActions.hideAuthModal());
  }
}
