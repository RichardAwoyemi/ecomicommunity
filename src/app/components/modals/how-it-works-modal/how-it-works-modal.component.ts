import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppModalStates } from '../../../state/app.enums';
@Component({
  selector: 'ec-how-it-works-modal',
  templateUrl: './how-it-works-modal.component.html',
})
export class HowItWorksModalComponent {
  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
