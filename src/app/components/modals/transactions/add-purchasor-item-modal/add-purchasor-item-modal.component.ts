import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getActiveDropdownTransactionType,
  getCreatorItemsFees,
  getCreatorReceivingWallet,
  getTransactionModalError,
} from 'src/app/state';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getPurchasorSendingWalletNetworkSymbol, getPurchasorSendingWalletNetwork, getCreatorReceivingWalletAddress, getCreatorReceivingVeveUsername, getPurchasorItems, getCreatorItems } from '../../../../state/index';
import {
  AppDropdownState, AppModalStates,
} from '../../../../state/app.enums';
import {
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorItemsCurrency,
  getPurchasorItemsUnits,
} from '../../../../state/index';
import { DEFAULT_NETWORKS, INTERNAL_NETWORK_ADDRESSES } from 'functions/src/utils/constants.utils';
import { NetworkSymbols, AppTransactionCurrencies, AppTransactionItemTypes, Networks, WalletTypes } from 'functions/src/utils/enums.utils';
import { IAmount, IFees } from 'functions/src/utils/interfaces.utils';
import { IWallet } from '../../../../../../functions/src/utils/interfaces.utils';
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
  NEW_TRANSACTION_SUMMARY_MODAL = AppModalStates.NewTransactionSummary;
  creatorItems$!: Observable<IAmount>;
  purchaserItems$!: Observable<IAmount>;
  wallet$!: Observable<IWallet>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getTransactionModalError);
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
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchaserItems$ = this.store.select(getPurchasorItems);
    this.wallet$ = this.store.select(getCreatorReceivingWallet);

  }

  setPurchasorSendingUnits(units: number): void {
    this.store.dispatch(AppActions.setPurchasorSendingAmountUnits({ sendingUnits: units }));
    this.store.dispatch(AppActions.setCreatorReceivingFees());
  }

  setPurchasorSendingCurrency(currency: AppTransactionCurrencies): void {
    this.selectedPurchasorNetworkSymbol = DEFAULT_NETWORKS[currency || AppTransactionCurrencies.BTC];
    this.store.dispatch(AppActions.setPurchasorSendingAmountCurrency({ sendingCurrency: currency }));
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
}
