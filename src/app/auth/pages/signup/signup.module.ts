import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { SignupConfirmationComponent } from './signup-confirmation.component';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [SignupComponent, SignupConfirmationComponent],
  imports: [SignupRoutingModule, CommonModule, FormsModule],
  providers: [AuthService],
})
export class SignupModule {}
