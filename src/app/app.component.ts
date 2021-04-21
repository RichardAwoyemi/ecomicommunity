import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { State } from './state/app.state';
import * as AppActions from './state/app.actions';
import { getAuthModalState } from './state/index';
import { AppAuthModalStates } from './state/app.enums';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  LOGIN_AUTH_MODAL = AppAuthModalStates.Login;
  title = 'ecomi-community';
  authModalState$!: Observable<string>;
  testData = [
    {
      user: 'Jane Cooper',
      userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=mRBhOy9GJv&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      selling: { currency: 'GEMS', units: 100 },
      price: { currency: 'USDC', units: 80 },
      status: 'available',
      txid: '1n21on21o3ni213nio',
    },
    {
      user: 'David Smith',
      userImg: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      selling: { currency: 'BTC', units: 0.1 },
      price: { currency: 'GEMS', units: 8000 },
      status: 'in progress',
      txid: 'asdnlsaknf213n21ln',
    },
  ];

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.HideAuthModal());
    this.authModalState$ = this.store.select(getAuthModalState);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.ShowLoginModal());
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.ShowRegstrationModal());
  }
}
