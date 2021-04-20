import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppAuthModalStates } from '../../../state/app.enums';

@Component({
  selector: 'ec-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @Input() state!: string | null;

  LOGIN_MODAL = AppAuthModalStates.Login
  REGISTRATION_MODAL = AppAuthModalStates.Registration

  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  closeModal() {
    this.store.dispatch(AppActions.HideAuthModal());
  }
}
