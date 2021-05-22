import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAmount, IFees } from 'functions/src/utils/interfaces.utils';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { getCreatorItems, getCreatorItemsFees, getPurchasorItems } from '../../../../state/index';
@Component({
  selector: 'ec-new-transaction-summary-modal',
  templateUrl: './new-transaction-summary-modal.component.html',
})
export class NewTransactionSummaryModalComponent {
  creatorItems$!: Observable<IAmount>;
  purchaseItems$!: Observable<IAmount>;
  creatorItemFees$!: Observable<IFees>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.creatorItems$ = this.store.select(getCreatorItems);
    this.purchaseItems$ = this.store.select(getPurchasorItems);
    this.creatorItemFees$ = this.store.select(getCreatorItemsFees);
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
