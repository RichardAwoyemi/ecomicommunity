import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRegistrationError } from 'src/app/auth/state';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AuthActions from '../../../../auth/state/auth.actions';
import * as AppActions from '../../../../state/app.actions';

@Component({
  selector: 'ec-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.resetSignupError());
    this.errorMessage$ = this.store.select(getRegistrationError);
  }

  signup() {
    this.store.dispatch(
      AuthActions.credentialsRegistration({
        email: this.email,
        password: this.password,
      })
    );
  }

  closeModal() {
    this.store.dispatch(AppActions.HideAuthModal());
  }
}
