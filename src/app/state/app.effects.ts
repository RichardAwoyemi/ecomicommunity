import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { TransactionService } from 'src/app/services/transaction.service';
import { AppModalStates } from 'src/app/state/app.enums';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as AppActions from '../state/app.actions';

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
          map(() =>
            AppActions.showModal({
              modalState: AppModalStates.EmailVerification,
            })
          )
        )
      )
    )
  );
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getUser),
      exhaustMap((props) =>
        from(this.userService.getUserById(props.key)).pipe(
          map((user) =>
            AppActions.credentialsLoginSuccess({
              user: {
                uid: user.uid,
                email: user.email,
                photoURL: user?.photoURL,
                username: user?.username,
              },
            })
          )
        )
      )
    )
  );
  persistUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.persistUser),
      exhaustMap((props) =>
        from(this.userService.setUser(props.user)).pipe(
          map(() => AppActions.credentialsRegistrationSuccess())
        )
      )
    )
  );
  credentialsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsLogin),
      exhaustMap((action) =>
        from(this.authService.login(action.email, action.password)).pipe(
          map((user) =>
            user.user?.emailVerified
              ? AppActions.getUser({ key: user.user.uid })
              : AppActions.emailVerificationFailure()
          ),
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
      map(
        () => AppActions.setEmailVerificationFailMessage(),
        AppActions.logoutUser()
      )
    );
  });
  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logoutUser),
      map(() => AppActions.clearUser()),
      tap(() => this.authService.logout())
      )
  });
  getTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getTransactions),
      exhaustMap(() =>
        from(this.transactionService.getTransactions()).pipe(
          map((payload) => AppActions.setTransactions({ txs: payload }))
        )
      )
    );
  });
  addTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.addTransaction),
      exhaustMap((props) =>
        from(this.transactionService.addTransaction(props.txn)).pipe(
          map(() => AppActions.showModal({ modalState: AppModalStates.Closed }))
        )
      )
    );
  });
  deleteTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.deleteTransaction),
      exhaustMap((props) =>
        from(this.transactionService.deleteTransaction(props.id)).pipe(
          map(() => AppActions.showModal({ modalState: AppModalStates.Closed }))
        )
      )
    );
  });
}
