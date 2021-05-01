import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';
import { AppDropdownState, AppTransactionCurrencies } from '../../state/app.enums';
import { getDropdownState, getActiveDropdownOptions } from '../../state/index';
import { IAmount } from '../../state/app.model';

@Component({
  selector: 'ec-text-dropdown-suffix',
  templateUrl: './text-dropdown-suffix.component.html',
})
export class TextDropdownSuffixComponent implements OnInit {
  @Input() label!: string;
  @Input() options?: string[];
  @Input() showList!: boolean | null;
  @Input() dropdown!: AppDropdownState;
  @Input() topClass = '';
  @Input() textField = 0;
  @Input() inputType = 'text';
  toggleDropdown$!: Observable<string>;
  activeDropdownOptions$!: Observable<string>;

  @Output() fieldValue = new EventEmitter<IAmount>();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.toggleDropdown$ = this.store.select(getDropdownState);
  }

  toggleDropdown(): void {
    this.store.dispatch(
      AppActions.toggleDropdown({
        dropdownState: this.dropdown,
      })
    );
  }

  valueChange(value: number, option?: string | undefined): void {
      this.fieldValue.emit({units: value, currency: option});
  }
}
