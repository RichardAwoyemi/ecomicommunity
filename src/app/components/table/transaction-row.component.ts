import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppTransactionStates } from 'functions/src/utils/enums.utils';
import { ITransaction, IUser } from 'functions/src/utils/interfaces.utils';
import { Subject } from 'rxjs';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
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
  COMPLETED = AppTransactionStates.Completed;

  ngUnsubscribe = new Subject<void>();

  constructor(private store: Store<State>) {}

  setActiveTransaction() {
    this.store.dispatch(AppActions.resetTransaction());
    this.store.dispatch(
      AppActions.setActiveTransaction({ txn: this.transaction })
    );
  }

  openPurchaseSummaryModal() {
    if (this.user) {
      this.store.dispatch(
        AppActions.showModal({ modalState: AppModalStates.PurchasePayment })
      );
    } else {
      this.store.dispatch(
        AppActions.showModal({ modalState: AppModalStates.Registration })
      );
    }
  }

  cancelActiveTransaction() {
    this.store.dispatch(
      AppActions.deleteTransaction({ id: this.transaction?.id || '' })
    );
  }
}
