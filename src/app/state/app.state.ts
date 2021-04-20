import { StoreRootState } from '../router/router.reducer';
import { AppState } from './app.reducer';

export interface State {
  app: AppState,
  router: StoreRootState;
}
