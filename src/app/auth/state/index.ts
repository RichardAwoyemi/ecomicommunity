import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
  getAuthFeatureState,
  state => state.user
);

export const getLoginError = createSelector(
  getAuthFeatureState,
  state => state.loginErrorMessage
)

export const getRegistrationError = createSelector(
  getAuthFeatureState,
  state => state.registrationErrorMessage
)


