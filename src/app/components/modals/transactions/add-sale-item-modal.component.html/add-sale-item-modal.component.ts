import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoginError, getRememberMe, getSaleItemsCurrency, getSaleItemsUnits } from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import {
  AppDropdownState, AppModalStates, AppTransactionCurrencies, AppTransactionItemTypes
} from '../../../../state/app.enums';
import { IAmount } from '../../../../state/app.model';
import { getActiveDropdownTransactionType } from '../../../../state/index';
@Component({
  selector: 'ec-add-sale-item-modal',
  templateUrl: './add-sale-item-modal.component.html',
})
export class AddSaleItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  SELL_TRANSACTION_CURRENCY= AppDropdownState.SellTransactionCurrency;
  username = '';
  sellingWallet = '';
  recievingWallet = '';
  errorMessage$!: Observable<string>;
  rememberMe$!: Observable<boolean>;
  activeSaleItemType$!: Observable<string | undefined>;
  activeSaleItemCurrency$?: Observable<string | undefined>;
  activeSaleItemUnits$?: Observable<number | undefined>;
  rememberMe? = false;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.keys(AppTransactionCurrencies);
  quantity = 0;
  currency = AppTransactionCurrencies.GEMS;
  units = 100;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getLoginError);
    this.rememberMe$ = this.store.select(getRememberMe);
    this.activeSaleItemType$ = this.store
      .select(getActiveDropdownTransactionType);
    this.activeSaleItemCurrency$ = this.store.select(getSaleItemsCurrency);
    this.activeSaleItemUnits$ = this.store.select(getSaleItemsUnits);
  }

  toggleRememberMe(toggle: boolean) {
    this.rememberMe = toggle;
    this.store.dispatch(AppActions.toggleRememberMe());
  }

  setSaleItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setSaleItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(AppActions.showModal({ modalState: AppModalStates.PriceItem }));
  }
}
