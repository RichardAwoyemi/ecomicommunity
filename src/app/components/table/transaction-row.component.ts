import { Component, Input, OnInit } from '@angular/core';
import { AppTransactionStates } from '../../state/app.enums';

@Component({
  selector: 'ec-transaction-row',
  templateUrl: './transaction-row.component.html',
})
export class TransactionRowComponent implements OnInit {

  @Input() transaction: any;

  AVAILABLE = AppTransactionStates.Available;
  IN_PROGRESS = AppTransactionStates.InProgress;
  COMPLETE = AppTransactionStates.Complete;

  constructor() {}

  ngOnInit(): void {

  }
}
