import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from 'src/app/state/app.actions';

@Component({
  selector: 'ec-match-transaction-confirmation-modal',
  templateUrl: './match-transaction-confirmation.component.html',
})
export class MatchTransactionConfirmationComponent {

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
