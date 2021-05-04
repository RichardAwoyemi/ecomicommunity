import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, IFees, IUser } from '../../../../state/app.model';
import {
  getPriceItems, getPriceItemsFees, getSaleItems,

  getUID,
  getUser,
  getUsername
} from '../../../../state/index';
@Component({
  selector: 'ec-new-transaction-summary-modal',
  templateUrl: './new-transaction-summary-modal.component.html',
})
export class NewTransactionSummaryModalComponent {
  saleItems$!: Observable<IAmount>;
  priceItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  priceItemFees$!: Observable<IFees>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.saleItems$ = this.store.select(getSaleItems);
    this.priceItems$ = this.store.select(getPriceItems);
    this.user$ = this.store.select(getUser);
    this.priceItemFees$ = this.store.select(getPriceItemsFees);
  }

  previousModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PriceItem })
    );
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
