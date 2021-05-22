import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAmount, IUser } from 'functions/src/utils/interfaces.utils';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';

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
      AppActions.matchTransaction({
        user: this.user!,
        txn: { id: this.activeTransactionId, creator: this.creatorItem!, purchasor: this.purchaseItem! },
      })
    );
  }
}
