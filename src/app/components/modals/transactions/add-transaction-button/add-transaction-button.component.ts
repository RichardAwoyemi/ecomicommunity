import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { IAmount } from '../../../../state/app.model';

@Component({
  selector: 'ec-add-transaction-button',
  templateUrl: './add-transaction-button.component.html',
})
export class AddTransactionButtonComponent {
  @Input() saleItem!: IAmount;
  @Input() priceItem!: IAmount;
  @Input() uid!: string;
  @Input() username!: string;

  constructor(private store: Store<State>) {}

  confirmTransaction(): void {
    this.store.dispatch(
      AppActions.addTransaction({
        txn: {
          selling: this.saleItem,
          price: this.priceItem,
          userid: this.uid || '',
          username: this.username || ''
        },
      }
    ))
  }
}
