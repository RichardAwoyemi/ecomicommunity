import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NetworkSymbols, Networks } from 'functions/src/utils/enums.utils';
import { IAmount, IWallet } from 'functions/src/utils/interfaces.utils';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import {
  getCreatorItems,
  getPurchaserSendingWallet,
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorSendingVeveUsername,
  getPurchasorSendingWalletAddress,
  getPurchasorSendingWalletNetwork,
  getPurchasorSendingWalletNetworkSymbol,
  getTransactionModalError,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-payment-modal',
  templateUrl: './purchase-payment-modal.component.html',
})
export class PurchasePaymentModalComponent {
  NETWORK_SYMBOLS = NetworkSymbols;
  networkSymbol$!: Observable<NetworkSymbols>;
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  network$!: Observable<Networks>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;
  errorMessage$!: Observable<string>;
  creatorItems$!: Observable<IAmount>;
  PURCHASER_RECEIVING_MODAL = AppModalStates.PurchaseReceiving;
  wallet$!: Observable<IWallet>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.networkSymbolList$ = this.store.select(
      getPurchasorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getPurchasorSendingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getPurchasorSendingWalletNetwork);
    this.walletAddress$ = this.store.select(getPurchasorSendingWalletAddress);
    this.veveUsername$ = this.store.select(getPurchasorSendingVeveUsername);
    this.errorMessage$ = this.store.select(getTransactionModalError);
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.wallet$ = this.store.select(getPurchaserSendingWallet);
    this.store.dispatch(AppActions.setPurchasorUserDetails());
  }

  setNetworkSymbol(symbol: NetworkSymbols): void {
    this.store.dispatch(
      AppActions.setPurchasorSendingNetworkSymbol({ symbol })
    );
  }

  setWalletAddress(walletAddress: string): void {
    this.store.dispatch(
      AppActions.setPurchasorSendingNetworkWalletAddress({ walletAddress })
    );
  }

  setVeveUsername(veveUsername: string): void {
    this.store.dispatch(
      AppActions.setPurchasorSendingNetworkVeveUsername({ veveUsername })
    );
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseReceiving })
    );
  }
}
