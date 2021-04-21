import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/state/app.state';
import * as AppActions from '../../state/app.actions';
import { Observable } from 'rxjs';
import { getNavbarVisibility } from 'src/app/state';

@Component({
  selector: 'ec-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isNavbarVisible$!: Observable<boolean>;

  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit(): void {
    this.isNavbarVisible$ = this.store.select(getNavbarVisibility);
  }

  showLoginModal(): void {
    this.store.dispatch(AppActions.ShowLoginModal());
  }

  showRegistrationModal(): void {
    this.store.dispatch(AppActions.ShowRegstrationModal());
  }

  toggleNavbar(): void {
    this.store.dispatch(AppActions.ToggleNavbar());
  }
}
