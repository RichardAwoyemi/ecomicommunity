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
  getBuyCurrencyNetworkSymbolList,
  getBuyingSendingWalletAddress,
  getBuyItems,
  getBuySendingVeveUsername,
  getBuySendingWalletNetwork,
  getBuySendingWalletNetworkSymbol,
  getSaleItems,
  getUser,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-payment-modal',
  templateUrl: './purchase-payment-modal.component.html',
})
export class PurchasePaymentModalComponent {
  saleItems$!: Observable<IAmount>;
  buyItems$!: Observable<IAmount>;
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
    this.saleItems$ = this.store.select(getSaleItems);
    this.buyItems$ = this.store.select(getBuyItems);
    this.user$ = this.store.select(getUser);
    this.activeTransaction$ = this.store.select(getActiveTransaction);
    this.networkSymbolList$ = this.store.select(getBuyCurrencyNetworkSymbolList);
    this.networkSymbol$ = this.store.select(getBuySendingWalletNetworkSymbol);
    this.network$ = this.store.select(getBuySendingWalletNetwork);
    this.walletAddress$ = this.store.select(getBuyingSendingWalletAddress);
    this.veveUsername$ = this.store.select(getBuySendingVeveUsername);
  }

  setBuyItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setBuyItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseReceiving })
    );
  }
}
