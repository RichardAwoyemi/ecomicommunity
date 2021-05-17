import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, IUser } from '../../../../state/app.model';
import {
  getActiveTransaction,
  getCreatorItems, getPurchasorItems, getUser
} from '../../../../state/index';
@Component({
  selector: 'ec-purchase-summary-modal',
  templateUrl: './purchase-summary-modal.component.html',
})
export class PurchaseSummaryModalComponent {
  creatorItems$!: Observable<IAmount>;
  purchasorItems$!: Observable<IAmount>;
  user$!: Observable<IUser | undefined>;
  activeTransactionId$!: Observable<string>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchasorItems$ = this.store.select(getPurchasorItems);
    this.activeTransactionId$ = this.store.select(getActiveTransaction);
    this.user$ = this.store.select(getUser);
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
