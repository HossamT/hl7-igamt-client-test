import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/components/login/login.component';
import {RegisterComponent} from './modules/core/components/register/register.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
    path: 'register',
    component: RegisterComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
