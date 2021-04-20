import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AuthActions from '../../state/auth.actions';
import { getRegistrationError } from '../../state/index';

@Component({
  selector: 'pt-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
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
}
