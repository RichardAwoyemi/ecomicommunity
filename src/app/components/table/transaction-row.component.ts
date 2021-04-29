import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionService } from 'src/app/services/transaction.service';
import { AppTransactionStates } from '../../state/app.enums';
import { ITransaction } from '../../state/app.model';

@Component({
  selector: 'ec-transaction-row',
  templateUrl: './transaction-row.component.html',
})
export class TransactionRowComponent implements OnInit {

  @Input() transaction?: ITransaction;

  AVAILABLE = AppTransactionStates.Available;
  IN_PROGRESS = AppTransactionStates.InProgress;
  COMPLETE = AppTransactionStates.Complete;

  ngUnsubscribe = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
