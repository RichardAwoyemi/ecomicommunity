import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ec-form-toggle-and-text',
  templateUrl: './form-toggle-and-text.component.html',
})

export class FormToggleAndTextComponent implements OnInit {

  @Input() label?: string;
  @Input() text?: string;

  constructor() { }

  ngOnInit(): void {
  }
}
