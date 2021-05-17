import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { IAmount, ITransaction, IUser } from '../../../../state/app.model';

@Component({
  selector: 'ec-confirm-purchase-button',
  templateUrl: './confirm-purchase-button.component.html',
})
export class ConfirmPurchaseButtonComponent {
  @Input() creatorItem!: IAmount;
  @Input() purchaseItem!: IAmount;
  @Input() user?: IUser;
  @Input() activeTransactionId!: string;

  constructor(private store: Store<State>) {}

  confirmPurchase(): void {
    this.store.dispatch(
      AppActions.confirmPurchase({
        user: this.user!,
        txn: { id: this.activeTransactionId, creator: this.creatorItem!, purchasor: this.purchaseItem! },
      })
    );
  }
}
