import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  DEFAULT_NETWORKS,
  INTERNAL_NETWORK_ADDRESSES,
} from 'functions/src/utils/constants.utils';
import {
  NetworkSymbols,
  AppTransactionCurrencies,
  AppTransactionItemTypes,
  Networks,
  WalletTypes,
} from 'functions/src/utils/enums.utils';
import { Observable, Observer } from 'rxjs';
import {
  getCreatorItems,
  getCreatorItemsCurrency,
  getCreatorItemsUnits,
  getCreatorSendingCurrencyMinimumUnits,
} from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import {
  getTransactionModalError,
  getCreatorSendingWallet,
} from '../../../../state/index';
import { AppDropdownState, AppModalStates } from '../../../../state/app.enums';
import {
  IAmount,
  IWallet,
} from '../../../../../../functions/src/utils/interfaces.utils';
import {
  getActiveDropdownTransactionType,
  getCreatorCurrencyNetworkSymbolList,
  getCreatorSendingVeveUsername,
  getCreatorSendingWalletAddress,
  getCreatorSendingWalletNetwork,
  getCreatorSendingWalletNetworkSymbol,
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
  minimumUnits$?: Observable<number | undefined>;
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
  errorMessage$!: Observable<string>;
  creatorItems$!: Observable<IAmount>;
  PURCHASER_ITEM_MODAL = AppModalStates.PurchasorItem;
  wallet$!: Observable<IWallet>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getTransactionModalError);
    this.activeCreatorItemType$ = this.store.select(
      getActiveDropdownTransactionType
    );
    this.activeCreatorItemCurrency$ = this.store.select(
      getCreatorItemsCurrency
    );
    this.activeCreatorItemUnits$ = this.store.select(getCreatorItemsUnits);
    this.minimumUnits$ = this.store.select(
      getCreatorSendingCurrencyMinimumUnits
    );
    this.networkSymbolList$ = this.store.select(
      getCreatorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getCreatorSendingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getCreatorSendingWalletNetwork);
    this.walletAddress$ = this.store.select(getCreatorSendingWalletAddress);
    this.veveUsername$ = this.store.select(getCreatorSendingVeveUsername);
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.wallet$ = this.store.select(getCreatorSendingWallet);
    this.store.dispatch(AppActions.setCreatorUserDetails());
  }

  setCreatorSendingUnits(units: number): void {
    this.store.dispatch(
      AppActions.setCreatorSendingAmountUnits({ sendingUnits: units })
    );
    this.store.dispatch(AppActions.setPurchasorReceivingFees());
  }

  setCreatorSendingCurrency(currency: AppTransactionCurrencies): void {
    this.selectedCreatorNetworkSymbol =
      DEFAULT_NETWORKS[currency || AppTransactionCurrencies.GEMS];
    this.store.dispatch(
      AppActions.setCreatorSendingAmountCurrency({ sendingCurrency: currency })
    );
    this.store.dispatch(
      AppActions.setCreatorSendingNetworkSymbol({
        symbol: this.selectedCreatorNetworkSymbol,
      })
    );
    this.store.dispatch(
      AppActions.setPlatformReceivingCreatorWalletAddress({
        walletAddress:
          INTERNAL_NETWORK_ADDRESSES[this.selectedCreatorNetworkSymbol],
      })
    );
    this.store.dispatch(
      AppActions.setPurchasorReceivingNetworkSymbol({
        symbol: this.selectedCreatorNetworkSymbol,
      })
    );
    this.store.dispatch(AppActions.setPurchasorReceivingFees());
  }

  setCreatorSendingNetworkSymbol(symbol: NetworkSymbols): void {
    this.selectedCreatorNetworkSymbol = symbol;
    this.store.dispatch(
      AppActions.setCreatorSendingNetworkSymbol({ symbol: symbol })
    );
    this.store.dispatch(
      AppActions.setPurchasorReceivingNetworkSymbol({ symbol: symbol })
    );
    this.store.dispatch(
      AppActions.setPlatformReceivingCreatorWalletAddress({
        walletAddress: INTERNAL_NETWORK_ADDRESSES[symbol],
      })
    );
  }

  setCreatorSendingNetworkWalletAddress(walletAddress: string): void {
    this.store.dispatch(
      AppActions.setCreatorSendingNetworkWalletAddress({
        walletAddress: walletAddress,
      })
    );
  }

  setCreatorSendingNetworkVeveUsername(veveUsername: string): void {
    this.store.dispatch(
      AppActions.setCreatorSendingNetworkVeveUsername({
        veveUsername: veveUsername,
      })
    );
  }
}
