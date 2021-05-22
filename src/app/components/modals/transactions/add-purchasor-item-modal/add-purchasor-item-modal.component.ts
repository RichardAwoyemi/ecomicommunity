import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getActiveDropdownTransactionType,
  getCreatorItemsFees,
} from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getPurchasorSendingWalletNetworkSymbol, getPurchasorSendingWalletNetwork, getCreatorReceivingWalletAddress, getCreatorReceivingVeveUsername } from '../../../../state/index';
import {
  AppDropdownState, AppModalStates,
} from '../../../../state/app.enums';
import {
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorItemsCurrency,
  getPurchasorItemsUnits,
} from '../../../../state/index';
import { DEFAULT_NETWORKS, INTERNAL_NETWORK_ADDRESSES } from 'functions/src/utils/constants.utils';
import { NetworkSymbols, AppTransactionCurrencies, AppTransactionItemTypes, Networks } from 'functions/src/utils/enums.utils';
import { IFees } from 'functions/src/utils/interfaces.utils';
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
    this.networkSymbol$ = this.store.select(getPurchasorSendingWalletNetworkSymbol);
    this.network$ = this.store.select(getPurchasorSendingWalletNetwork);
    this.creatorItemsFees$ = this.store.select(getCreatorItemsFees);
    this.walletAddress$ = this.store.select(getCreatorReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getCreatorReceivingVeveUsername);
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
    this.store.dispatch(
      AppActions.setPlatformReceivingPurchasorWalletAddress({
        walletAddress: INTERNAL_NETWORK_ADDRESSES[this.selectedPurchasorNetworkSymbol]
      })
    )
    this.store.dispatch(AppActions.setCreatorReceivingFees());
  }

  setPurchasorSendingNetworkSymbol(symbol: NetworkSymbols): void {
    this.selectedPurchasorNetworkSymbol = symbol;
    this.store.dispatch(AppActions.setPurchasorSendingNetworkSymbol({ symbol: symbol }));
    this.store.dispatch(AppActions.setCreatorReceivingNetworkSymbol({ symbol: symbol }));
    this.store.dispatch(
      AppActions.setPlatformReceivingPurchasorWalletAddress({
        walletAddress: INTERNAL_NETWORK_ADDRESSES[symbol]
      })
    )
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
