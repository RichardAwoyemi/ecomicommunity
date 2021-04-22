import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';
import { Observable } from 'rxjs';
import { getNavbarVisibility, getUser } from 'src/app/state';
import { IUser } from 'src/app/state/app.model';

@Component({
  selector: 'ec-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isNavbarVisible$!: Observable<boolean>;
  isLoggedIn$!: Observable<IUser | undefined>

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.isNavbarVisible$ = this.store.select(getNavbarVisibility);
    this.isLoggedIn$ = this.store.select(getUser);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.showLoginModal());
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.showRegstrationModal());
  }

  showLogOutModal(): void {
    this.store.dispatch(AppActions.showLogOutModal());
  }

  toggleNavbar(): void {
    this.store.dispatch(AppActions.toggleNavbar());
  }
}
