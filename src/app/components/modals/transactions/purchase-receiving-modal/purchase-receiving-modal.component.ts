import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Networks, NetworkSymbols } from 'src/app/data/currency-settings';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates, AppTransactionCurrencies } from '../../../../state/app.enums';
import { IAmount, IFees, ITransaction, IUser } from '../../../../state/app.model';
import { getCreatorReceivingWalletNetworkSymbol, getCreatorItemsFees, getCreatorItemsCurrency } from '../../../../state/index';
import {
  getActiveTransaction,
  getPurchasorItems,
  getCreatorCurrencyNetworkSymbolList,
  getCreatorItems,
  getCreatorReceivingVeveUsername,
  getCreatorReceivingWalletAddress,
  getCreatorReceivingWalletNetwork,
  getUser,
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-receiving-modal',
  templateUrl: './purchase-receiving-modal.component.html',
})
export class PurchaseReceivingModalComponent {
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
  fees$!: Observable<IFees>;
  currency$!: Observable<AppTransactionCurrencies>

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchaseItems$ = this.store.select(getPurchasorItems);
    this.user$ = this.store.select(getUser);
    this.activeTransaction$ = this.store.select(getActiveTransaction);
    this.networkSymbolList$ = this.store.select(
      getCreatorCurrencyNetworkSymbolList
    );
    this.networkSymbol$ = this.store.select(
      getCreatorReceivingWalletNetworkSymbol
    );
    this.network$ = this.store.select(getCreatorReceivingWalletNetwork);
    this.walletAddress$ = this.store.select(getCreatorReceivingWalletAddress);
    this.veveUsername$ = this.store.select(getCreatorReceivingVeveUsername);
    this.fees$ = this.store.select(getCreatorItemsFees);
    this.currency$ = this.store.select(getCreatorItemsCurrency);
  }

  setCreatorItems(amount: IAmount): void {
    this.store.dispatch(AppActions.setCreatorItems({ amount }));
  }

  nextModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchaseSummary })
    );
  }
}
