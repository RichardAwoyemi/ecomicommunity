import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../../state/app.actions';
import { AppModalStates } from '../../../state/app.enums';
@Component({
  selector: 'ec-coming-soon-modal',
  templateUrl: './coming-soon-modal.component.html',
})
export class ComingSoonModalComponent {
  constructor(private store: Store<State>) {}

  closeModal() {
    this.store.dispatch(
      AppActions.showModal({ modalState: AppModalStates.Closed })
    );
  }
}
