import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/components/login/login.component';
import { NotAuthenticatedGuard } from './modules/core/services/auth-guard.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [NotAuthenticatedGuard],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
