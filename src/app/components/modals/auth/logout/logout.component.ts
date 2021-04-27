import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppModalStates } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../../state/app.actions';
import { getEmailConsent, getRegistrationError } from '../../../../state/index';

@Component({
  selector: 'ec-logout-modal',
  templateUrl: './logout.component.html',
})
export class LogOutModalComponent {

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(AppActions.logoutUser());
  }

  closeModal() {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
