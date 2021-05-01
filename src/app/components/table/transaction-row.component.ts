import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { AppModalStates, AppTransactionStates } from '../../state/app.enums';
import { ITransaction, IUser } from '../../state/app.model';
import * as AppActions from '../../state/app.actions';

@Component({
  selector: 'ec-transaction-row',
  templateUrl: './transaction-row.component.html',
})
export class TransactionRowComponent {
  @Input() transaction?: ITransaction;
  @Input() user?: IUser;

  AVAILABLE = AppTransactionStates.Available;
  IN_PROGRESS = AppTransactionStates.InProgress;
  COMPLETE = AppTransactionStates.Complete;

  ngUnsubscribe = new Subject<void>();

  constructor(private store: Store<State>) {}

  setActiveTransaction() {
    this.store.dispatch(
      AppActions.setActiveTransaction({ txn: this.transaction })
    );
  }

  openPurchaseSummaryModal() {
    this.store.dispatch(
      AppActions.showModal({
        modalState: this.user
          ? AppModalStates.PurchaseSummary
          : AppModalStates.Registration,
      })
    );
  }

  cancelActiveTransaction() {
    this.store.dispatch(
      AppActions.deleteTransaction({ id: this.transaction?.id || '' })
    );
  }
}
