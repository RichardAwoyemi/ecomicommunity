import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { FormToggleAndTextComponent } from './components/form-toggle-and-text/form-toggle-and-text.component';
import { AuthModalComponent } from './components/modals/auth/auth-modal.component';
import { RegisterModalComponent } from './components/modals/auth/register/register-modal.component';
import { RouterEffects } from './router/router.effects';
import { AppEffects } from './state/app.effects';
import { appReducer } from './state/app.reducer';
import { LoginModalComponent } from './components/modals/auth/login/login-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionRowComponent } from './components/table/transaction-row.component';

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    RegisterModalComponent,
    AuthModalComponent,
    FormToggleAndTextComponent,
    LoginModalComponent,
    NavbarComponent,
    TransactionRowComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
        app: appReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      name: 'Ecomi Community',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([RouterEffects, AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
