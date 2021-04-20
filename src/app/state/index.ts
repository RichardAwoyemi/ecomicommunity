import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getAuthModalState = createSelector(
  getAppFeatureState,
  state => state.authModalState
);

export const getUser = createSelector(
  getAppFeatureState,
  state => state.user
);

export const getLoginError = createSelector(
  getAppFeatureState,
  state => state.loginErrorMessage
)

export const getRegistrationError = createSelector(
  getAppFeatureState,
  state => state.registrationErrorMessage
)


