import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionService } from 'src/app/services/transaction.service';
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

  ngUnsubscribe = new Subject<void>();

  constructor(public transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });

    this.transactionService.addTransaction({
      userid: '1',
      selling: {
        units: 100,
        currency: 'BTC'
      },
      price: {
        units: 120,
        currency: 'BTC'
      }
    })
  }
}
