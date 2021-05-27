import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppTransactionCurrencies,
  Networks,
  NetworkSymbols,
} from 'functions/src/utils/enums.utils';
import { IAmount, IFees, IWallet } from 'functions/src/utils/interfaces.utils';
import { Observable } from 'rxjs';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import {
  getCreatorCurrencyNetworkSymbolList,
  getCreatorItemsCurrency,
  getPurchaserReceivingWallet,
  getPurchasorItems,
  getPurchasorItemsFees,
  getPurchasorReceivingVeveUsername,
  getPurchasorReceivingWalletAddress,
  getPurchasorReceivingWalletNetwork,
  getPurchasorReceivingWalletNetworkSymbol,
  getTransactionModalError,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-receiving-modal',
  templateUrl: './purchase-receiving-modal.component.html',
})
export class PurchaseReceivingModalComponent {
  NETWORK_SYMBOLS = NetworkSymbols;
  networkSymbol$!: Observable<NetworkSymbols>;
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  network$!: Observable<Networks>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;
  receivingFees$!: Observable<IFees>;
  currency$!: Observable<AppTransactionCurrencies>;
  errorMessage$!: Observable<string>;
  purchaserItems$!: Observable<IAmount>;
  PURCHASE_SUMMARY_MODAL = AppModalStates.PurchaseSummary;
  wallet$!: Observable<IWallet>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.networkSymbolList$ = this.store.select(
      getCreatorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getPurchasorReceivingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getPurchasorReceivingWalletNetwork);
    this.walletAddress$ = this.store.select(getPurchasorReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getPurchasorReceivingVeveUsername);
    this.receivingFees$ = this.store.select(getPurchasorItemsFees);
    this.currency$ = this.store.select(getCreatorItemsCurrency);
    this.errorMessage$ = this.store.select(getTransactionModalError);
    this.purchaserItems$ = this.store.select(getPurchasorItems);
    this.wallet$ = this.store.select(getPurchaserReceivingWallet);
  }

  setNetworkSymbol(symbol: NetworkSymbols): void {
    this.store.dispatch(
      AppActions.setPurchasorReceivingNetworkSymbol({ symbol })
    );
  }

  setWalletAddress(walletAddress: string): void {
    this.store.dispatch(
      AppActions.setPurchasorReceivingNetworkWalletAddress({ walletAddress })
    );
  }

  setVeveUsername(veveUsername: string): void {
    this.store.dispatch(
      AppActions.setPurchasorReceivingNetworkVeveUsername({ veveUsername })
    );
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseSummary })
    );
  }
}
