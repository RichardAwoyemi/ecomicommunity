import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DEFAULT_NETWORKS, Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import {
  getActiveDropdownTransactionType,
  getCreatorItemsFees,
} from 'src/app/state';
import { IAmount, IFees } from 'src/app/state/app.model';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getPurchasorReceivingWalletNetworkSymbol, getPurchasorReceivingWalletNetwork, getPurchasorReceivingWalletAddress, getPurchasorReceivingVeveUsername } from '../../../../state/index';
import {
  AppDropdownState,
  AppModalStates,
  AppTransactionCurrencies,
  AppTransactionItemTypes
} from '../../../../state/app.enums';
import {
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorItemsCurrency,
  getPurchasorItemsUnits,
} from '../../../../state/index';
@Component({
  selector: 'ec-add-purchasor-item-modal',
  templateUrl: './add-purchasor-item-modal.component.html',
})
export class AddPurchasorItemModalComponent {
  NEW_TRANSACTION_ITEM_TYPE = AppDropdownState.AddNewTransactionItemType;
  BUYING_TRANSACTION_CURRENCY = AppDropdownState.BuyingTransactionCurrency;
  NETWORK_SYMBOLS = NetworkSymbols;
  activePurchaseItemType$!: Observable<string | undefined>;
  activePurchaseItemCurrency$?: Observable<AppTransactionCurrencies>;
  activePurchaseItemUnits$?: Observable<number | undefined>;
  currency = AppTransactionCurrencies.USDT;
  COLLECTIBLE_TYPE = AppTransactionItemTypes.Collectible;
  CURRENCY_TYPE = AppTransactionItemTypes.Currency;
  TRANSACTION_TYPES = Object.keys(AppTransactionItemTypes);
  TRANSACTION_CURRENCIES = Object.values(AppTransactionCurrencies);
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  networkSymbol$!: Observable<NetworkSymbols>;
  network$!: Observable<Networks>;
  creatorItemsFees$!: Observable<IFees>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;
  selectedPurchasorNetworkSymbol = NetworkSymbols.BTC;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.activePurchaseItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activePurchaseItemCurrency$ = this.store.select(getPurchasorItemsCurrency);
    this.activePurchaseItemUnits$ = this.store.select(getPurchasorItemsUnits);
    this.networkSymbolList$ = this.store.select(
      getPurchasorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(getPurchasorReceivingWalletNetworkSymbol);
    this.network$ = this.store.select(getPurchasorReceivingWalletNetwork);
    this.creatorItemsFees$ = this.store.select(getCreatorItemsFees);
    this.walletAddress$ = this.store.select(getPurchasorReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getPurchasorReceivingVeveUsername);
  }

  setPurchasorSendingUnits(units: number): void {
    this.store.dispatch(AppActions.setPurchasorSendingAmountUnits({ units: units }));
    this.store.dispatch(AppActions.setCreatorReceivingFees());
  }

  setPurchasorSendingCurrency(currency: AppTransactionCurrencies): void {
    this.selectedPurchasorNetworkSymbol = DEFAULT_NETWORKS[currency || AppTransactionCurrencies.BTC];
    this.store.dispatch(AppActions.setPurchasorSendingAmountCurrency({ currency: currency }));
    this.store.dispatch(AppActions.setPurchasorSendingNetworkSymbol({ symbol: this.selectedPurchasorNetworkSymbol }));
    this.store.dispatch(AppActions.setCreatorReceivingNetworkSymbol({ symbol: this.selectedPurchasorNetworkSymbol }));
    this.store.dispatch(AppActions.setCreatorReceivingFees());
  }

  setPurchasorSendingNetworkSymbol(symbol: NetworkSymbols): void {
    this.selectedPurchasorNetworkSymbol = symbol;
    console.log(this.selectedPurchasorNetworkSymbol);
    this.store.dispatch(AppActions.setPurchasorSendingNetworkSymbol({ symbol: symbol }));
    this.store.dispatch(AppActions.setCreatorReceivingNetworkSymbol({ symbol: symbol }));
  }

  setCreatorReceivingNetworkWalletAddress(walletAddress: string): void {
    this.store.dispatch(AppActions.setCreatorReceivingNetworkWalletAddress({ walletAddress: walletAddress }));
  }

  setCreatorReceivingNetworkVeveUsername(veveUsername: string): void {
    this.store.dispatch(AppActions.setCreatorReceivingNetworkVeveUsername({ veveUsername: veveUsername}));
  }

  previousModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.CreatorItem })
    );
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.NewTransactionSummary })
    );
  }
}
