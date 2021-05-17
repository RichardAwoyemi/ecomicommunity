import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, ITransaction, IUser } from '../../../../state/app.model';
import {
  getActiveTransaction,
  getCreatorItems,
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorItems,
  getPurchasorSendingVeveUsername,
  getPurchasorSendingWalletAddress,
  getPurchasorSendingWalletNetwork,
  getPurchasorSendingWalletNetworkSymbol,
  getUser,
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
