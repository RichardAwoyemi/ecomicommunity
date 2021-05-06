import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, IFees, IUser } from '../../../../state/app.model';
import {
  getBuyItems, getBuyItemsFees, getSaleItems,

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
  buyItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  buyItemFees$!: Observable<IFees>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.saleItems$ = this.store.select(getSaleItems);
    this.buyItems$ = this.store.select(getBuyItems);
    this.user$ = this.store.select(getUser);
    this.buyItemFees$ = this.store.select(getBuyItemsFees);
  }

  previousModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.BuyItem })
    );
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
