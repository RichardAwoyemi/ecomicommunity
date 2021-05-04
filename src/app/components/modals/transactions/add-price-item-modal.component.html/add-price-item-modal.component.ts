import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import {
  getActiveDropdownTransactionType,
  getPriceItemsFees,
  getPriceItemsNetworkSymbol,
  getPriceVeveUsername
} from 'src/app/state';
import { IAmount, IFees } from 'src/app/state/app.model';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import {
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
  AppTransactionItemTypes
} from '../../../../state/app.enums';
import {
  getPriceCurrencyNetworkSymbolList,
  getPriceItemsCurrency,
  getPriceItemsNetwork,
  getPriceItemsUnits, getPriceWalletAddress
} from '../../../../state/index';
@Component({
  selector: 'ec-add-price-item-modal',
  templateUrl: './add-price-item-modal.component.html',
})
export class AddPriceItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  PRICE_TRANSACTION_CURRENCY = AppDropdownState.PriceTransactionCurrency;
  NETWORK_SYMBOLS = NetworkSymbols;
  activePriceItemType$!: Observable<string | undefined>;
  activePriceItemCurrency$?: Observable<AppTransactionCurrencies>;
  activePriceItemUnits$?: Observable<number | undefined>;
  currency = AppTransactionCurrencies.USDT;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.values(AppTransactionCurrencies);
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  networkSymbol$!: Observable<NetworkSymbols>;
  network$!: Observable<Networks>;
  priceItemsFees$!: Observable<IFees>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.activePriceItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activePriceItemCurrency$ = this.store.select(getPriceItemsCurrency);
    this.activePriceItemUnits$ = this.store.select(getPriceItemsUnits);
    this.networkSymbolList$ = this.store.select(
      getPriceCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(getPriceItemsNetworkSymbol);
    this.network$ = this.store.select(getPriceItemsNetwork);
    this.priceItemsFees$ = this.store.select(getPriceItemsFees);
    this.walletAddress$ = this.store.select(getPriceWalletAddress);
    this.veveUsername$ = this.store.select(getPriceVeveUsername);
  }

  previousModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.SaleItem })
    );
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.NewTransactionSummary })
    );
  }

  setPriceItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setPriceItems({ amount }));
  }
}
