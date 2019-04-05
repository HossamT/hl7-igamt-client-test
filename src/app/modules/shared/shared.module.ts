import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/primeng';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordFromComponent } from './components/new-password-from/new-password-from.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ResetPasswordRequestFormComponent } from './components/reset-password-request-form/reset-password-request-form.component';
import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, NewPasswordFromComponent
    , ResetPasswordRequestFormComponent, FormInputComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    LoginFormComponent,
    RegisterFormComponent,
    NgbModule,
    CheckboxModule,
    ReactiveFormsModule,
    ResetPasswordRequestFormComponent,
    NewPasswordFromComponent,
  ],
})
export class SharedModule { }
