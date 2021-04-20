import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back'
}

export const Go = createAction(RouterActionTypes.Go, props<{ payload: { path: any[]; query?: object; extras?: NavigationExtras } }>());

export const Back = createAction(RouterActionTypes.Back);
