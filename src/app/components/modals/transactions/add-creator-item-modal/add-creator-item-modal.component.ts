import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DEFAULT_NETWORKS, Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import {
  getCreatorItemsCurrency,
  getCreatorItemsUnits,
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
import { getCreatorSendingVeveUsername } from '../../../../state/index';
import {
  getCreatorSendingWalletNetworkSymbol,
  getCreatorSendingWalletNetwork,
  getCreatorSendingWalletAddress,
} from '../../../../state/index';
import {
  getActiveDropdownTransactionType,
  getCreatorCurrencyNetworkSymbolList,
} from '../../../../state/index';
@Component({
  selector: 'ec-add-creator-item-modal',
  templateUrl: './add-creator-item-modal.component.html',
})
export class AddCreatorItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  SELL_TRANSACTION_CURRENCY = AppDropdownState.SellTransactionCurrency;
  NETWORK_SYMBOLS = NetworkSymbols;
  activeCreatorItemType$!: Observable<string | undefined>;
  activeCreatorItemCurrency$!: Observable<AppTransactionCurrencies>;
  activeCreatorItemUnits$?: Observable<number | undefined>;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.values(AppTransactionCurrencies);
  quantity = 0;
  selectedCreatorNetworkSymbol = NetworkSymbols.VEVE;
  currency = AppTransactionCurrencies.GEMS;
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  networkSymbol$!: Observable<NetworkSymbols>;
  network$!: Observable<Networks>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.activeCreatorItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activeCreatorItemCurrency$ = this.store.select(getCreatorItemsCurrency);
    this.activeCreatorItemUnits$ = this.store.select(getCreatorItemsUnits);
    this.networkSymbolList$ = this.store.select(getCreatorCurrencyNetworkSymbolList);
    this.networkSymbol$ = this.store.select(getCreatorSendingWalletNetworkSymbol);
    this.network$ = this.store.select(getCreatorSendingWalletNetwork);
    this.walletAddress$ = this.store.select(getCreatorSendingWalletAddress);
    this.veveUsername$ = this.store.select(getCreatorSendingVeveUsername);
    this.store.dispatch(AppActions.setCreatorUserDetails());
  }

  setCreatorSendingUnitsAndCurrency(amount: IAmount): void {
    const currency = amount.currency;
    this.selectedCreatorNetworkSymbol = DEFAULT_NETWORKS[currency || AppTransactionCurrencies.GEMS];
    this.store.dispatch(AppActions.setCreatorSendingAmount({ amount: { currency: amount.currency, units: amount.units }}));
    this.store.dispatch(AppActions.setCreatorSendingNetworkSymbol({ symbol: this.selectedCreatorNetworkSymbol }));
    this.store.dispatch(AppActions.setPurchasorReceivingNetworkSymbol({ symbol: this.selectedCreatorNetworkSymbol }));
    this.store.dispatch(AppActions.setPurchasorReceivingFees());
  }

  setCreatorSendingNetworkSymbol(symbol: NetworkSymbols): void {
    this.selectedCreatorNetworkSymbol = symbol;
    this.store.dispatch(AppActions.setCreatorSendingNetworkSymbol({ symbol: symbol }));
    this.store.dispatch(AppActions.setPurchasorReceivingNetworkSymbol({ symbol: symbol }));
  }

  setCreatorSendingNetworkWalletAddress(walletAddress: string): void {
    this.store.dispatch(AppActions.setCreatorSendingNetworkWalletAddress({ walletAddress: walletAddress }));
  }

  setCreatorSendingNetworkVeveUsername(veveUsername: string): void {
    this.store.dispatch(AppActions.setCreatorSendingNetworkVeveUsername({ veveUsername: veveUsername}));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchasorItem })
    );
  }
}
