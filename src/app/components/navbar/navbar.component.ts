import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';
import { Observable } from 'rxjs';
import { getNavbarVisibility, getUser } from 'src/app/state';
import { IUser } from 'src/app/state/app.model';
import { AppModalStates } from 'src/app/state/app.enums';

@Component({
  selector: 'ec-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isNavbarVisible$!: Observable<boolean>;
  user$!: Observable<IUser | undefined>

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.isNavbarVisible$ = this.store.select(getNavbarVisibility);
    this.user$ = this.store.select(getUser);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Login}));
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.Registration}));
  }

  showLogOutModal(): void {
    this.store.dispatch(AppActions.showModal({modalState: AppModalStates.LogOut}));
  }

  toggleNavbar(): void {
    this.store.dispatch(AppActions.toggleNavbar());
  }
}
