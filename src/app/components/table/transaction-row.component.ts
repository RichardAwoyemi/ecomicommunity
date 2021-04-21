import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ec-transaction-row',
  templateUrl: './transaction-row.component.html',
})
export class TransactionRowComponent implements OnInit {

  @Input() transaction: any;

  constructor() {}

  ngOnInit(): void {
    
  }
}
