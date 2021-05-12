import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import {
  getActiveDropdownTransactionType,
  getBuyItemsFees,
} from 'src/app/state';
import { IAmount, IFees } from 'src/app/state/app.model';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getBuyReceivingWalletNetworkSymbol, getBuyReceivingWalletNetwork, getBuyReceivingWalletAddress, getBuyReceivingVeveUsername } from '../../../../state/index';
import {
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
  AppTransactionItemTypes
} from '../../../../state/app.enums';
import {
  getBuyCurrencyNetworkSymbolList,
  getBuyItemsCurrency,
  getBuyItemsUnits,
} from '../../../../state/index';
@Component({
  selector: 'ec-add-buy-item-modal',
  templateUrl: './add-buy-item-modal.component.html',
})
export class AddBuyItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  BUYING_TRANSACTION_CURRENCY = AppDropdownState.BuyingTransactionCurrency;
  NETWORK_SYMBOLS = NetworkSymbols;
  activeBuyItemType$!: Observable<string | undefined>;
  activeBuyItemCurrency$?: Observable<AppTransactionCurrencies>;
  activeBuyItemUnits$?: Observable<number | undefined>;
  currency = AppTransactionCurrencies.USDT;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.values(AppTransactionCurrencies);
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  networkSymbol$!: Observable<NetworkSymbols>;
  network$!: Observable<Networks>;
  buyItemsFees$!: Observable<IFees>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.activeBuyItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activeBuyItemCurrency$ = this.store.select(getBuyItemsCurrency);
    this.activeBuyItemUnits$ = this.store.select(getBuyItemsUnits);
    this.networkSymbolList$ = this.store.select(
      getBuyCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(getBuyReceivingWalletNetworkSymbol);
    this.network$ = this.store.select(getBuyReceivingWalletNetwork);
    this.buyItemsFees$ = this.store.select(getBuyItemsFees);
    this.walletAddress$ = this.store.select(getBuyReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getBuyReceivingVeveUsername);
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

  setBuyItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setBuyItems({ amount }));
  }
}
