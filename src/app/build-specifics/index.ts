import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extModules = [
  StoreDevtoolsModule.instrument({
    name: 'Ecomi Community',
    maxAge: 100
  })
];