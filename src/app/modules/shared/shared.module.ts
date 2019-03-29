import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/primeng';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
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
  ],
})
export class SharedModule { }
