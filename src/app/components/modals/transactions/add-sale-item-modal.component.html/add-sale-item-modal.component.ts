import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import {
  getLoginError,
  getRememberMe,
  getSaleItemsCurrency,
  getSaleItemsUnits,
} from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import {
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
  AppTransactionItemTypes,
} from '../../../../state/app.enums';
import { IAmount } from '../../../../state/app.model';
import {
  getActiveDropdownTransactionType,
  getSaleCurrencyNetworkSymbolList,
  getSaleItemsNetwork,
  getSaleItemsNetworkSymbol,
} from '../../../../state/index';
@Component({
  selector: 'ec-add-sale-item-modal',
  templateUrl: './add-sale-item-modal.component.html',
})
export class AddSaleItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  SELL_TRANSACTION_CURRENCY = AppDropdownState.SellTransactionCurrency;
  NETWORK_SYMBOLS = NetworkSymbols;
  activeSaleItemType$!: Observable<string | undefined>;
  activeSaleItemCurrency$!: Observable<AppTransactionCurrencies>;
  activeSaleItemUnits$?: Observable<number | undefined>;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.values(AppTransactionCurrencies);
  quantity = 0;
  currency = AppTransactionCurrencies.GEMS;
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  networkSymbol$!: Observable<NetworkSymbols>;
  network$!: Observable<Networks>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.activeSaleItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activeSaleItemCurrency$ = this.store.select(getSaleItemsCurrency);
    this.activeSaleItemUnits$ = this.store.select(getSaleItemsUnits);
    this.networkSymbolList$ = this.store.select(
      getSaleCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(getSaleItemsNetworkSymbol);
    this.network$ = this.store.select(getSaleItemsNetwork);
  }

  setSaleItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setSaleItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PriceItem })
    );
  }
}
