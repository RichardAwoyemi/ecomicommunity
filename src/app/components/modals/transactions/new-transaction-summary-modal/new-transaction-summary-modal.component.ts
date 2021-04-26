import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { last, map, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { AppModalStates } from '../../../../state/app.enums';
import { IAmount, ITransaction } from '../../../../state/app.model';
import { getSaleItems, getPriceItems, getUID } from '../../../../state/index';
@Component({
  selector: 'ec-new-transaction-summary-modal',
  templateUrl: './new-transaction-summary-modal.component.html',
})
export class NewTransactionSummaryModalComponent {
  saleItems$!: Observable<IAmount>;
  priceItems$!: Observable<IAmount>;
  uid$!: Observable<string | undefined>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.saleItems$ = this.store.select(getSaleItems);
    this.priceItems$ = this.store.select(getPriceItems);
    this.uid$ = this.store.select(getUID);
  }

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
