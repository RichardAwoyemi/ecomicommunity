import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'ec-form-toggle-and-text',
  templateUrl: './form-toggle-and-text.component.html',
})
export class FormToggleAndTextComponent {
  @Input() label?: string;
  @Input() text?: string;
  @Input() toggle!: boolean | null;

  @Output() toggleButtonEvent = new EventEmitter<boolean | null>();

  ACTIVE_TOGGLE_BG = 'bg-indigo-600';
  INACTIVE_TOGGLE_BG = 'bg-gray-200';
  ACTIVE_TOGGLE_CIRCLE = 'translate-x-5';
  INACTIVE_TOGGLE_CIRCLE = 'translate-x-0';

  constructor() {}

  toggleButton(): void {
    this.toggleButtonEvent.emit(this.toggle);
  }
}
