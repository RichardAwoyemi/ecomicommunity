import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppModalStates } from '../../../state/app.enums';

@Component({
  selector: 'ec-close-modal',
  templateUrl: './close-modal.component.html',
})
export class CloseModalComponent {

  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Closed}));
  }
}
