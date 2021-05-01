import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, ITransaction, IUser } from '../../../../state/app.model';
import {
  getActiveTransaction,
  getPriceItems, getSaleItems, getUser
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-summary-modal',
  templateUrl: './purchase-summary-modal.component.html',
})
export class PurchaseSummaryModalComponent {
  saleItems$!: Observable<IAmount>;
  priceItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  activeTransaction$!: Observable<ITransaction | undefined>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.saleItems$ = this.store.select(getSaleItems);
    this.priceItems$ = this.store.select(getPriceItems);
    this.user$ = this.store.select(getUser);
    this.activeTransaction$ = this.store.select(getActiveTransaction);
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
