import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/components/login/login.component';
import {NewPasswordComponent} from './modules/core/components/new-password/new-password.component';
import {RegisterComponent} from './modules/core/components/register/register.component';
import {ResetPasswordRequestComponent} from './modules/core/components/reset-password-request/reset-password-request.component';
import {NewPasswordResolver} from './modules/core/resolvers/new-password.resolver';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
    path: 'register',
    component: RegisterComponent,
  },
  {path: 'reset-password-confirm/:token', component: NewPasswordComponent, resolve: {valid : NewPasswordResolver}},

  {path: 'reset-password', component: ResetPasswordRequestComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
