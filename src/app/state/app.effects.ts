import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as RouterActions from '../../app/router/router.actions';
import * as AppActions from '../state/app.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  credentialsRegistation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.credentialsRegistration),
      exhaustMap((action) =>
        from(this.authService.signup(action.email, action.password)).pipe(
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
        from(this.authService.sendRegistrationVerificationEmail()).pipe(
          map(() =>
            AppActions.ShowEmailVerificationModal()
          )
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
              },
            }),
          ]),
          tap((user) =>
            this.authService.storeUser(user.user, !!action.remember)
          ),
          catchError((error) =>
            of(AppActions.credentialsLoginFailure({ error }))
          )
        )
      )
    );
  });
  // credentialsLoginSuccees$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AppActions.credentialsLoginSuccess),
  //     map(() => RouterActions.Go({ payload: { path: ['dashboard/home'] } }))
  //   )
  // );
}
