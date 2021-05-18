import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates, AppTransactionCurrencies } from '../../../../state/app.enums';
import { IFees } from '../../../../state/app.model';
import {
  getPurchasorCurrencyNetworkSymbolList, getPurchasorItemsCurrency, getPurchasorItemsFees, getPurchasorReceivingVeveUsername,
  getPurchasorReceivingWalletAddress,
  getPurchasorReceivingWalletNetwork, getPurchasorReceivingWalletNetworkSymbol
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
  fees$!: Observable<IFees>;
  currency$!: Observable<AppTransactionCurrencies>

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.networkSymbolList$ = this.store.select(
      getPurchasorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getPurchasorReceivingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getPurchasorReceivingWalletNetwork);
    this.walletAddress$ = this.store.select(getPurchasorReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getPurchasorReceivingVeveUsername);
    this.fees$ = this.store.select(getPurchasorItemsFees);
    this.currency$ = this.store.select(getPurchasorItemsCurrency);
  }

  setNetworkSymbol(symbol: NetworkSymbols): void {
    this.store.dispatch(AppActions.setPurchasorReceivingNetworkSymbol({ symbol }));
  }

  setWalletAddress(walletAddress: string): void {
    this.store.dispatch(AppActions.setPurchasorReceivingNetworkWalletAddress({ walletAddress }));
  }

  setVeveUsername(veveUsername: string): void {
    this.store.dispatch(AppActions.setPurchasorReceivingNetworkVeveUsername({ veveUsername }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseSummary })
    );
  }
}
