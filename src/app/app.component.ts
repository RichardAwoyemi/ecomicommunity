import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DUMMY_TRANSACTION_DATA } from './data/transactions';
import { AuthService } from './services/auth.service';
import * as AppActions from './state/app.actions';
import { AppModalStates } from './state/app.enums';
import { State } from './state/app.state';
import { getmodalState, getTransactions } from './state/index';
import { TransactionService } from './services/transaction.service';
import { ITransaction } from './state/app.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  LOGIN_AUTH_MODAL = AppModalStates.Login;
  title = 'ecomi-community';
  modalState$!: Observable<string>;
  transactions$!: Observable<ITransaction[]>;
  testData = DUMMY_TRANSACTION_DATA;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
    this.store.dispatch(AppActions.isLoggedIn());
    this.store.dispatch(AppActions.getTransactions());
    this.modalState$ = this.store.select(getmodalState);
    this.transactions$ = this.store.select(getTransactions);
  }

  showLoginModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Login })
    );
  }

  showRegistrationModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Registration })
    );
  }

  showNewTransactionModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.NewTransaction })
    );
  }
}
