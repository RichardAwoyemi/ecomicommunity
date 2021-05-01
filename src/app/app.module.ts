import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
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
import { AddTransactionButtonComponent } from './components/modals/transactions/add-transaction-button/add-transaction-button.component';
import { ConfirmPurchaseButtonComponent } from './components/modals/transactions/confirm-purchase-button/confirm-purchase-button.component';
import { NewTransactionButtonComponent } from './components/modals/transactions/new-transaction-button/new-transaction-button.component';
import { NewTransactionModalComponent } from './components/modals/transactions/new-transaction-modal/new-transaction-modal.component';
import { NewTransactionSummaryModalComponent } from './components/modals/transactions/new-transaction-summary-modal/new-transaction-summary-modal.component';
import { PurchaseSummaryModalComponent } from './components/modals/transactions/purchase-summary-modal/purchase-summary-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionRowComponent } from './components/table/transaction-row.component';
import { TextDropdownSuffixComponent } from './components/text-dropdown-suffix/text-dropdown-suffix.component';
import { TransactionService } from './services/transaction.service';
import { UserService } from './services/user.service';
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
    NewTransactionSummaryModalComponent,
    AddSaleItemModalComponent,
    AddPriceItemModalComponent,
    DropdownComponent,
    CloseModalComponent,
    TextDropdownSuffixComponent,
    AddTransactionButtonComponent,
    PurchaseSummaryModalComponent,
    ConfirmPurchaseButtonComponent,
    NewTransactionButtonComponent
  ],
  imports: [
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: appReducer }, {}),
    StoreDevtoolsModule.instrument({
      name: 'Ecomi Community',
      maxAge: 100,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [TransactionService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
