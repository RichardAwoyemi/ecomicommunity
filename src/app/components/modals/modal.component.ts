import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';
import { AppModalStates } from '../../state/app.enums';

@Component({
  selector: 'ec-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() state!: string | null;

  LOGOUT_MODAL = AppModalStates.LogOut;
  LOGIN_MODAL = AppModalStates.Login;
  REGISTRATION_MODAL = AppModalStates.Registration;
  EMAIL_VERIFICATION_MODAL = AppModalStates.EmailVerification;
  NEW_TRANSACTION_MODAL = AppModalStates.NewTransaction;
  NEW_TRANSACTION_SUMMARY_MODAL = AppModalStates.NewTransactionSummary;
  ADD_CREATOR_ITEM_MODAL = AppModalStates.CreatorItem;
  ADD_PURCHASOR_ITEM_MODAL = AppModalStates.PurchasorItem;
  PURCHASE_SUMMARY_MODAL = AppModalStates.PurchaseSummary;
  PURCHASE_PAYMENT_MODAL = AppModalStates.PurchasePayment;
  PURCHASE_RECEIVING_MODAL = AppModalStates.PurchaseReceiving;
  HOW_IT_WORKS_MODAL = AppModalStates.HowItWorks;

  email = '';
  password = '';
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
