import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { IAmount, ITransaction, IUser } from '../../../../state/app.model';

@Component({
  selector: 'ec-new-transaction-button',
  templateUrl: './new-transaction-button.component.html',
})
export class NewTransactionButtonComponent {
  @Input() user!: IUser | null | undefined;

  constructor(private store: Store<State>) {}

  showNewTransactionModal(): void {
    this.store.dispatch(
      AppActions.showModal({
        modalState: this.user
          ? AppModalStates.NewTransaction
          : AppModalStates.Registration,
      })
    );
  }
}