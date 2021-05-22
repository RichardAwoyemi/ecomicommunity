import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppActions from './state/app.actions';
import { AppModalStates } from './state/app.enums';
import { State } from './state/app.state';
import { getmodalState, getTransactions, getUser } from './state/index';
import { TransactionService } from './services/transaction.service';
import { ITransaction, IUser } from 'functions/src/utils/interfaces.utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  LOGIN_AUTH_MODAL = AppModalStates.Login;
  modalState$!: Observable<string>;
  transactions$!: Observable<ITransaction[]>;
  user$!: Observable<IUser | undefined>;

  constructor(
    private store: Store<State>,
    public transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.isLoggedIn());
    this.store.dispatch(AppActions.getTransactions());
    this.modalState$ = this.store.select(getmodalState);
    this.transactions$ = this.store.select(getTransactions);
    this.user$ = this.store.select(getUser);
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

  showHowItWorksModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.HowItWorks })
    );
  }
}
