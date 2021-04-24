import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FormToggleAndTextComponent } from './components/form-toggle-and-text/form-toggle-and-text.component';
import { EmailVerificationComponent } from './components/modals/auth/email-verification/email-verification.component';
import { LoginModalComponent } from './components/modals/auth/login/login-modal.component';
import { LogOutModalComponent } from './components/modals/auth/logout/logout.component';
import { RegisterModalComponent } from './components/modals/auth/register/register-modal.component';
import { CloseModalComponent } from './components/modals/close-modal/close-modal.component';
import { ModalComponent } from './components/modals/modal.component';
import { AddPriceItemModalComponent } from './components/modals/transactions/add-price-item-modal.component.html/add-price-item-modal.component';
import { AddSaleItemModalComponent } from './components/modals/transactions/add-sale-item-modal.component.html/add-sale-item-modal.component';
import { NewTransactionModalComponent } from './components/modals/transactions/new-transaction-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionRowComponent } from './components/table/transaction-row.component';
import { TextDropdownSuffixComponent } from './components/text-dropdown-suffix/text-dropdown-suffix.component';
import { RouterEffects } from './router/router.effects';
import { AppEffects } from './state/app.effects';
import { appReducer } from './state/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    RegisterModalComponent,
    ModalComponent,
    FormToggleAndTextComponent,
    LoginModalComponent,
    LogOutModalComponent,
    EmailVerificationComponent,
    NavbarComponent,
    TransactionRowComponent,
    NewTransactionModalComponent,
    AddSaleItemModalComponent,
    AddPriceItemModalComponent,
    DropdownComponent,
    CloseModalComponent,
    TextDropdownSuffixComponent,
  ],
  imports: [
    FormsModule,
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
