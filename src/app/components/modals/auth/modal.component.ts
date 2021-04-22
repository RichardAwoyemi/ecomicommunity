import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppmodalStates } from '../../../state/app.enums';

@Component({
  selector: 'ec-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() state!: string | null;

  LOGOUT_MODAL = AppmodalStates.LogOut;
  LOGIN_MODAL = AppmodalStates.Login;
  REGISTRATION_MODAL = AppmodalStates.Registration;
  EMAIL_VERIFICATION_MODAL = AppmodalStates.EmailVerification;

  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(AppActions.hideModal());
  }
}
