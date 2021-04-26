import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AppActions from '../state/app.actions';
import { AppModalStates } from 'src/app/state/app.enums';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  credentialsRegistation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsRegistration),
      exhaustMap((props) =>
        from(this.authService.signup(props.email, props.password)).pipe(
          map((user) =>
            AppActions.persistUser({
              user: {
                uid: user.user?.uid,
                email: user.user?.email,
                emailVerified: user.user?.emailVerified,
                photoURL: user.user?.photoURL,
                username: props.username
            }})),
          catchError((error) =>
            of(AppActions.credentialsRegistrationFailure({ error }))
          )
        )
      )
    );
  });
  credentialsRegistationSuccees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.credentialsRegistrationSuccess),
      exhaustMap(() =>
        from(this.authService.sendRegistrationVerificationEmail()).pipe(
          switchMap(() => [
            AppActions.showModal({
              modalState: AppModalStates.EmailVerification,
            }),
          ])
        )
      )
    )
  );
  persistUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AppActions.persistUser),
    exhaustMap((props) =>
      from(this.userService.setUser(props.user)).pipe(
        switchMap(() => [
          AppActions.credentialsRegistrationSuccess(),
        ])
      )
    )
  )
);
  credentialsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsLogin),
      exhaustMap((action) =>
        from(this.authService.login(action.email, action.password)).pipe(
          switchMap((user) => [
            AppActions.credentialsLoginSuccess({
              user: {
                uid: user.user?.uid,
                email: user.user?.email,
                emailVerified: user.user?.emailVerified,
                photoURL: user.user?.photoURL,
                username: user.user?.displayName
              },
            }),
          ]),
          catchError((error) =>
            of(AppActions.credentialsLoginFailure({ error }))
          )
        )
      )
    );
  });
  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logoutUser),
      exhaustMap(() =>
        from(this.authService.logout()).pipe(
          switchMap(() => [
            AppActions.showModal({ modalState: AppModalStates.Closed }),
          ])
        )
      )
    );
  });
  getTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getTransactions),
      exhaustMap(() =>
        from(this.transactionService.getTransactions()).pipe(
          switchMap((payload) => [AppActions.setTransactions({ txs: payload })])
        )
      )
    );
  });
}
