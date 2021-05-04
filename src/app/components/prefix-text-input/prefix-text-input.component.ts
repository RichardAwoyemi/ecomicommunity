import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ec-prefix-text-input',
  templateUrl: './prefix-text-input.component.html',
})
export class PrefixTextInputComponent {
  @Input() label?: string;
  @Input() text?: string;

  @Output() newText = new EventEmitter<string>();

  setText(newText: string): void {
    this.newText.emit(newText);
  }
}
