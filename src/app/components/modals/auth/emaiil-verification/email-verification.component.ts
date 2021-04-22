import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getEmailConsent, getRegistrationError } from '../../../../state/index';

@Component({
  selector: 'ec-email-verification',
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent {
  email = '';
  password = '';
  errorMessage$!: Observable<string>;
  emailConsent$!: Observable<boolean>;
  consent? = false;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.resetSignupError());
    this.emailConsent$ = this.store.select(getEmailConsent);
  }

  toggleEmailConsent(toggle: boolean | null) {
    this.store.dispatch(AppActions.toggleEmailConsent());
  }

  closeModal() {
    this.store.dispatch(AppActions.hideAuthModal());
  }
}
