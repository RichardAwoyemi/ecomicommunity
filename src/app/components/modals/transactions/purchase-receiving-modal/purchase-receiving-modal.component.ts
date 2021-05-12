import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates, AppTransactionCurrencies } from '../../../../state/app.enums';
import { IAmount, IFees, ITransaction, IUser } from '../../../../state/app.model';
import { getSaleReceivingWalletNetworkSymbol, getSaleItemsFees, getSaleItemsCurrency } from '../../../../state/index';
import {
  getActiveTransaction,
  getBuyItems,
  getSaleCurrencyNetworkSymbolList,
  getSaleItems,
  getSaleReceivingVeveUsername,
  getSaleReceivingWalletAddress,
  getSaleReceivingWalletNetwork,
  getUser,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-receiving-modal',
  templateUrl: './purchase-receiving-modal.component.html',
})
export class PurchaseReceivingModalComponent {
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
  fees$!: Observable<IFees>;
  currency$!: Observable<AppTransactionCurrencies>

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.saleItems$ = this.store.select(getSaleItems);
    this.buyItems$ = this.store.select(getBuyItems);
    this.user$ = this.store.select(getUser);
    this.activeTransaction$ = this.store.select(getActiveTransaction);
    this.networkSymbolList$ = this.store.select(
      getSaleCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getSaleReceivingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getSaleReceivingWalletNetwork);
    this.walletAddress$ = this.store.select(getSaleReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getSaleReceivingVeveUsername);
    this.fees$ = this.store.select(getSaleItemsFees);
    this.currency$ = this.store.select(getSaleItemsCurrency);
  }

  setSaleItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setSaleItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseSummary })
    );
  }
}
