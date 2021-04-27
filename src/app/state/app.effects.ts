import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AppActions from '../state/app.actions';
import { AppModalStates } from 'src/app/state/app.enums';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    public authService: AuthService,
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
                photoURL: user.user?.photoURL,
                username: props.username,
              },
            })
          ),
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
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getUser),
      exhaustMap((props) =>
        from(this.userService.getUserById(props.key)).pipe(
          switchMap((user) => [
            AppActions.credentialsLoginSuccess({
              user: {
                uid: user.uid,
                email: user.email,
                photoURL: user?.photoURL,
                username: user?.username,
              },
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
          switchMap(() => [AppActions.credentialsRegistrationSuccess()])
        )
      )
    )
  );
  credentialsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsLogin),
      exhaustMap((action) =>
        from(this.authService.login(action.email, action.password)).pipe(
          concatMap((user) => [
            user.user?.emailVerified
              ? AppActions.getUser({ key: user.user.uid })
              : AppActions.emailVerificationFailure(),
          ]),
          catchError((error) =>
            of(AppActions.credentialsLoginFailure({ error }))
          )
        )
      )
    );
  });
  emailVerificationFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.emailVerificationFailure),
      switchMap(() => [
        AppActions.setEmailVerificationFailMessage(),
        AppActions.logoutUser(),
      ])
    );
  });
  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logoutUser),
      exhaustMap(() =>
        from(this.authService.logout()).pipe(
          map(() => AppActions.clearUser()),
          catchError((error) =>
            tap(error => console.log(error))
          )
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
  addTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.addTransaction),
      exhaustMap((props) =>
        from(this.transactionService.addTransaction(props.txn)).pipe(
          switchMap(() => [
            AppActions.showModal({ modalState: AppModalStates.Closed }),
          ])
        )
      )
    );
  });
}
