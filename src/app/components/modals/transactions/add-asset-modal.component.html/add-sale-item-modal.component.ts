import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoginError, getRememberMe } from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
@Component({
  selector: 'ec-add-sale-item-modal',
  templateUrl: './add-sale-item-modal.component.html',
})
export class AddSaleItemModalComponent {
  username = '';
  sellingWallet = '';
  recievingWallet = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;
  rememberMe? = false;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getLoginError);
    this.rememberMe$ = this.store.select(getRememberMe);
  }

  toggleRememberMe(toggle: boolean) {
    this.rememberMe = toggle;
    this.store.dispatch(AppActions.toggleRememberMe());
  }

  hideModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
