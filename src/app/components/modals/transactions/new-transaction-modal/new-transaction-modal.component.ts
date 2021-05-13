import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoginError, getRememberMe } from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
@Component({
  selector: 'ec-new-transaction-modal',
  templateUrl: './new-transaction-modal.component.html',
})
export class NewTransactionModalComponent {
  sellingWallet = '';
  receivingWallet = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;
  rememberMe? = false;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getLoginError);
    this.rememberMe$ = this.store.select(getRememberMe);
    this.store.dispatch(AppActions.resetNewTransaction());
  }

  toggleRememberMe(toggle: boolean) {
    this.rememberMe = toggle;
    this.store.dispatch(AppActions.toggleRememberMe());
  }

  showAddCreatorItemModal(): void {
    this.store.dispatch(AppActions.showModal({ modalState: AppModalStates.CreatorItem }));
  }

  hideModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
