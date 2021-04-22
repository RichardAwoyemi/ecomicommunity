import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { State } from './state/app.state';
import * as AppActions from './state/app.actions';
import { getAuthModalState } from './state/index';
import { AppAuthModalStates } from './state/app.enums';
import { DUMMY_TRANSACTION_DATA } from './data/transactions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  LOGIN_AUTH_MODAL = AppAuthModalStates.Login;
  title = 'ecomi-community';
  authModalState$!: Observable<string>;
  testData = DUMMY_TRANSACTION_DATA;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.hideAuthModal());
    this.store.dispatch(AppActions.isLoggedIn());
    this.authModalState$ = this.store.select(getAuthModalState);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.showLoginModal());
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.showRegstrationModal());
  }
}
