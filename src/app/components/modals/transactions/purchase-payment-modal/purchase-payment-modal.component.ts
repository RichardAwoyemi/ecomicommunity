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
  getPurchasorCurrencyNetworkSymbolList,
  getPurchasorSendingWalletAddress,
  getPurchasorItems,
  getPurchasorSendingVeveUsername,
  getPurchasorSendingWalletNetwork,
  getPurchasorSendingWalletNetworkSymbol,
  getCreatorItems,
  getUser,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-payment-modal',
  templateUrl: './purchase-payment-modal.component.html',
})
export class PurchasePaymentModalComponent {
  creatorItems$!: Observable<IAmount>;
  purchaseItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  activeTransaction$!: Observable<ITransaction | undefined>;
  NETWORK_SYMBOLS = NetworkSymbols;
  networkSymbol$!: Observable<NetworkSymbols>;
  networkSymbolList$!: Observable<NetworkSymbols[]>;
  network$!: Observable<Networks>;
  walletAddress$!: Observable<string>;
  veveUsername$!: Observable<string>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchaseItems$ = this.store.select(getPurchasorItems);
    this.user$ = this.store.select(getUser);
    this.activeTransaction$ = this.store.select(getActiveTransaction);
    this.networkSymbolList$ = this.store.select(getPurchasorCurrencyNetworkSymbolList);
    this.networkSymbol$ = this.store.select(getPurchasorSendingWalletNetworkSymbol);
    this.network$ = this.store.select(getPurchasorSendingWalletNetwork);
    this.walletAddress$ = this.store.select(getPurchasorSendingWalletAddress);
    this.veveUsername$ = this.store.select(getPurchasorSendingVeveUsername);
  }

  setPurchaseItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setPurchasorItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseReceiving })
    );
  }
}
