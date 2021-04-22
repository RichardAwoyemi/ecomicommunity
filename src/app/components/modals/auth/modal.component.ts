import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppModalStates } from '../../../state/app.enums';

@Component({
  selector: 'ec-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() state!: string | null;

  LOGOUT_MODAL = AppModalStates.LogOut;
  LOGIN_MODAL = AppModalStates.Login;
  REGISTRATION_MODAL = AppModalStates.Registration;
  EMAIL_VERIFICATION_MODAL = AppModalStates.EmailVerification;

  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(AppActions.hideModal());
  }
}
