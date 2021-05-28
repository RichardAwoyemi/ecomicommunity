import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { HowItWorksModalComponent } from './components/modals/how-it-works-modal/how-it-works-modal.component';
import { ModalComponent } from './components/modals/modal.component';
import { AddPurchasorItemModalComponent } from './components/modals/transactions/add-purchasor-item-modal/add-purchasor-item-modal.component';
import { AddCreatorItemModalComponent } from './components/modals/transactions/add-creator-item-modal/add-creator-item-modal.component';
import { AddTransactionButtonComponent } from './components/modals/transactions/add-transaction-button/add-transaction-button.component';
import { ConfirmPurchaseButtonComponent } from './components/modals/transactions/confirm-purchase-button/confirm-purchase-button.component';
import { NewTransactionButtonComponent } from './components/modals/transactions/new-transaction-button/new-transaction-button.component';
import { NewTransactionModalComponent } from './components/modals/transactions/new-transaction-modal/new-transaction-modal.component';
import { NewTransactionSummaryModalComponent } from './components/modals/transactions/new-transaction-summary-modal/new-transaction-summary-modal.component';
import { PurchasePaymentModalComponent } from './components/modals/transactions/purchase-payment-modal/purchase-payment-modal.component';
import { PurchaseSummaryModalComponent } from './components/modals/transactions/purchase-summary-modal/purchase-summary-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrefixTextInputComponent } from './components/prefix-text-input/prefix-text-input.component';
import { TransactionRowComponent } from './components/table/transaction-row.component';
import { TextDropdownSuffixComponent } from './components/text-dropdown-suffix/text-dropdown-suffix.component';
import { TransactionService } from './services/transaction.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';
import { AppEffects } from './state/app.effects';
import { appReducer } from './state/app.reducer';
import { PurchaseReceivingModalComponent } from './components/modals/transactions/purchase-receiving-modal/purchase-receiving-modal.component';
import { MatchTransactionConfirmationComponent } from './components/modals/transactions/match-transaction-confirmation-modal /match-transaction-confirmation.component';
import { MatchTransactionErrorComponent } from './components/modals/transactions/match-transaction-error-modal/match-transaction-error.component';
import { MatchTransactionSpinnerComponent } from './components/modals/transactions/match-transaction-spinner-modal/match-transaction-spinner.component';
import { DotCarouselComponent } from './components/animations/dot-carousel/dot-carousel.component';
import { TransactionNextModalButtonComponent } from './components/modals/transactions/transaction-next-modal-button/transaction-next-modal-button.component';
import { extModules } from 'src/app/build-specifics';
import { ComingSoonModalComponent } from './components/modals/coming-soon-modal/coming-soon-modal.component';

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
    AddPurchasorItemModalComponent,
    AddCreatorItemModalComponent,
    DropdownComponent,
    CloseModalComponent,
    TextDropdownSuffixComponent,
    AddTransactionButtonComponent,
    ConfirmPurchaseButtonComponent,
    NewTransactionButtonComponent,
    PrefixTextInputComponent,
    PurchaseSummaryModalComponent,
    PurchasePaymentModalComponent,
    HowItWorksModalComponent,
    PurchaseReceivingModalComponent,
    MatchTransactionConfirmationComponent,
    MatchTransactionErrorComponent,
    MatchTransactionSpinnerComponent,
    DotCarouselComponent,
    TransactionNextModalButtonComponent,
    ComingSoonModalComponent
  ],
  imports: [
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }, {}),
    EffectsModule.forRoot([AppEffects]),
    extModules
  ],
  providers: [TransactionService, UserService, UtilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
