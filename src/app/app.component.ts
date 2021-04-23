import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { State } from './state/app.state';
import * as AppActions from './state/app.actions';
import { getmodalState } from './state/index';
import { AppModalStates } from './state/app.enums';
import { DUMMY_TRANSACTION_DATA } from './data/transactions';
import { showModal } from './state/app.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  LOGIN_AUTH_MODAL = AppModalStates.Login;
  title = 'ecomi-community';
  modalState$!: Observable<string>;
  testData = DUMMY_TRANSACTION_DATA;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
    this.store.dispatch(AppActions.isLoggedIn());
    this.modalState$ = this.store.select(getmodalState);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Login}));
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Registration}));
  }

  showNewTransactionModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.NewTransaction}));
  }
}
