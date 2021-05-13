import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, IFees, IUser } from '../../../../state/app.model';
import {
  getPurchasorItems, getPurchasorItemsFees, getCreatorItems, getUser,
} from '../../../../state/index';
@Component({
  selector: 'ec-new-transaction-summary-modal',
  templateUrl: './new-transaction-summary-modal.component.html',
})
export class NewTransactionSummaryModalComponent {
  creatorItems$!: Observable<IAmount>;
  purchaseItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  purchaseItemFees$!: Observable<IFees>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchaseItems$ = this.store.select(getPurchasorItems);
    this.user$ = this.store.select(getUser);
    this.purchaseItemFees$ = this.store.select(getPurchasorItemsFees);
  }

  previousModal(): void {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.PurchasorItem })
    );
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
