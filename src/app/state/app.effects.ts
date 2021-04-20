import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as RouterActions from '../../app/router/router.actions';
import * as AppActions from '../state/app.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AuthService) {}

  credentialsRegistation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsRegistration),
      exhaustMap((action) =>
        from(this.appService.signup(action.email, action.password)).pipe(
          map((user) => AppActions.credentialsRegistrationSuccess()),
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
        from(this.appService.sendRegistrationVerificationEmail()).pipe(
          map(() =>
            RouterActions.Go({
              payload: { path: ['app/signup/confirmation'] },
            })
          )
        )
      )
    )
  );

  credentialsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsLogin),
      exhaustMap((action) =>
        from(this.appService.login(action.email, action.password)).pipe(
          switchMap((user) => [
            AppActions.credentialsLoginSuccess({
              user: {
                uid: user.user?.uid,
                email: user.user?.email,
                emailVerified: user.user?.emailVerified,
                photoURL: user.user?.photoURL,
              },
            }),
          ]),
          tap((user) =>
            this.appService.storeUser(user.user, !!action.remember)
          ),
          catchError((error) =>
            of(AppActions.credentialsLoginFailure({ error }))
          )
        )
      )
    );
  });
  credentialsLoginSuccees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.credentialsLoginSuccess),
      map(() => RouterActions.Go({ payload: { path: ['dashboard/home'] } }))
    )
  );
}
