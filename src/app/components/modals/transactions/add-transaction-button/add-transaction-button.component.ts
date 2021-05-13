import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { IAmount, IUser } from '../../../../state/app.model';

@Component({
  selector: 'ec-add-transaction-button',
  templateUrl: './add-transaction-button.component.html',
})
export class AddTransactionButtonComponent {
  @Input() creatorItem!: IAmount;
  @Input() purchaseItem!: IAmount;
  @Input() user!: IUser | null | undefined;

  constructor(private store: Store<State>) {}

  confirmTransaction(): void {
    this.store.dispatch(
      AppActions.addTransaction({
        txn: {
          creator: this.creatorItem,
          purchasor: this.purchaseItem
        },
      }
    ))
  }
}
