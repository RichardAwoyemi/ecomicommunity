import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAmount } from 'functions/src/utils/interfaces.utils';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import { IWallet } from '../../../../../../functions/src/utils/interfaces.utils';
import * as AppActions from '../../../../state/app.actions';

@Component({
  selector: 'ec-transaction-next-modal-button',
  templateUrl: './transaction-next-modal-button.component.html',
})
export class TransactionNextModalButtonComponent {
  @Input() amount!: IAmount;
  @Input() modal!: AppModalStates;
  @Input() wallet!: IWallet;
  @Input() isDisabled = false;
  @Input() isPurchaser = false;

  constructor(private store: Store<State>) {}

  nextModal(): void {
    this.store.dispatch(
      AppActions.checkTransaction({
        amount: this.amount,
        modal: this.modal,
        wallet: this.wallet,
        isPurchaser: this.isPurchaser
      })
    );
  }
}
