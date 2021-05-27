import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppTransactionCurrencies } from 'functions/src/utils/enums.utils';
import { Observable } from 'rxjs';
import { getDropdownState } from 'src/app/state';
import { AppDropdownState } from 'src/app/state/app.enums';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';

@Component({
  selector: 'ec-text-dropdown-suffix',
  templateUrl: './text-dropdown-suffix.component.html',
})
export class TextDropdownSuffixComponent implements OnInit {
  @Input() label!: AppTransactionCurrencies;
  @Input() options!: AppTransactionCurrencies[];
  @Input() showList!: boolean | null;
  @Input() dropdown!: AppDropdownState;
  @Input() topClass = '';
  @Input() textField = 0;
  @Input() inputType = 'text';
  @Input() minimum?: number | null;
  toggleDropdown$!: Observable<string>;
  activeDropdownOptions$!: Observable<string>;

  @Output() inputValue = new EventEmitter<number>();
  @Output() dropDownValue = new EventEmitter<AppTransactionCurrencies>();

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

  inputValueChange(value: number): void {
    this.inputValue.emit(+value.toString().replace('/[^0-9.]/g',''));
  }

  dropDownValueChange(option: AppTransactionCurrencies = this.label): void {
    this.dropDownValue.emit(option);
  }
}
