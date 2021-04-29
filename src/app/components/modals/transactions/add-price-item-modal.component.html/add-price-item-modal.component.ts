import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getActiveDropdownTransactionType, getLoginError, getRememberMe } from 'src/app/state';
import { IAmount } from 'src/app/state/app.model';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getPriceItemsCurrency } from '../../../../state/index';
import {
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
  AppTransactionItemTypes
} from '../../../../state/app.enums';
@Component({
  selector: 'ec-add-price-item-modal',
  templateUrl: './add-price-item-modal.component.html',
})
export class AddPriceItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  PRICE_TRANSACTION_CURRENCY = AppDropdownState.PriceTransactionCurrency;
  username = '';
  sellingWallet = '';
  recievingWallet = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;
  activePriceItemType$!: Observable<string | undefined>;
  rememberMe? = false;
  activePriceItemCurrency$?: Observable<string | undefined>;
  currency = AppTransactionCurrencies.USDT;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.keys(AppTransactionCurrencies);
  units = 100;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getLoginError);
    this.rememberMe$ = this.store.select(getRememberMe);
    this.activePriceItemType$ = this.store.select(getActiveDropdownTransactionType);
    this.activePriceItemCurrency$ = this.store.select(getPriceItemsCurrency);
  }

  toggleRememberMe(toggle: boolean) {
    this.rememberMe = toggle;
    this.store.dispatch(AppActions.toggleRememberMe());
  }

  nextModal(): void {
    this.store.dispatch(AppActions.showModal({ modalState: AppModalStates.NewTransactionSummary }));
  }

  setPriceItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setPriceItems({ amount }));
  }
}
