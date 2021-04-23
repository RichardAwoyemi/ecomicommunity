import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'ec-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() label?: string;
  @Input() options?: string[];
  @Input() showList!: boolean | null;
  showDropdown$!: Observable<string>;

  @Output() chosenOption = new EventEmitter<string | null>();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.showDropdown$ = this.store.select();
  }

  toggleButton(option: string): void {
    this.chosenOption.emit(option);
  }
}
