import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { FormToggleAndTextComponent } from './components/form-toggle-and-text/form-toggle-and-text.component';
import { RegisterModalComponent } from './components/modals/register/register-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    RegisterModalComponent,
    FormToggleAndTextComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
