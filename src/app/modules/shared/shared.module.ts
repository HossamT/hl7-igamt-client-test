import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardModule} from 'primeng/card';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    LoginFormComponent,
    RegisterFormComponent,
    NgbModule,
  ],
})
export class SharedModule { }
