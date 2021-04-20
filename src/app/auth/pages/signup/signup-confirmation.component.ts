import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { AuthService } from '../../../shared/services/auth.service';
import * as AuthActions from '../../state/auth.actions';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'pt-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
})
export class SignupConfirmationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  signup() {
  }
}
