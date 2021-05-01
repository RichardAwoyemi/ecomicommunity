import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import * as AppActions from './state/app.actions';
import { AppModalStates } from './state/app.enums';
import { State } from './state/app.state';
import { getmodalState, getTransactions, getUser } from './state/index';
import { TransactionService } from './services/transaction.service';
import { ITransaction, IUser } from './state/app.model';
import { UserService } from './services/user.service';
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
  user$!: Observable<IUser | undefined>;

  constructor(private store: Store<State>, public userService: UserService, public transactionService: TransactionService ) {}

  ngOnInit(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
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
}
