import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as RouterActions from '../../../app/router/router.actions';
import * as AuthActions from '../state/auth.actions';
import { AuthService } from '../../services/auth.service';

export type Action = AuthActions.AuthActionTypes;

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  credentialsRegistation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.credentialsRegistration),
      exhaustMap((action) =>
        from(this.authService.signup(action.email, action.password)).pipe(
          map((user) => AuthActions.credentialsRegistrationSuccess()),
          catchError((error) =>
            of(AuthActions.credentialsRegistrationFailure({ error }))
          )
        )
      )
    );
  });

  credentialsRegistationSuccees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.credentialsRegistrationSuccess),
      exhaustMap(() =>
        from(this.authService.sendRegistrationVerificationEmail()).pipe(
          map(() =>
            RouterActions.Go({
              payload: { path: ['auth/signup/confirmation'] },
            })
          )
        )
      )
    )
  );

  credentialsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.credentialsLogin),
      exhaustMap((action) =>
        from(this.authService.login(action.email, action.password)).pipe(
          switchMap((user) => [
            AuthActions.credentialsLoginSuccess({
              user: {
                uid: user.user?.uid,
                email: user.user?.email,
                emailVerified: user.user?.emailVerified,
                photoURL: user.user?.photoURL,
              },
            }),
          ]),
          tap((user) =>
            this.authService.storeUser(user.user, !!action.remember)
          ),
          catchError((error) =>
            of(AuthActions.credentialsLoginFailure({ error }))
          )
        )
      )
    );
  });
  credentialsLoginSuccees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.credentialsLoginSuccess),
      map(() => RouterActions.Go({ payload: { path: ['dashboard/home'] } }))
    )
  );
}
