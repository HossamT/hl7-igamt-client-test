import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import {RegistrationEffects} from '../../root-store/registration/registration.effects';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationEffects } from './../../root-store/authentication/authentication.effects';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { UserManagementHeaderComponent } from './components/user-management-header/user-management-header.component';
import {NewPasswordResolver} from './resolvers/new-password.resolver';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementHeaderComponent,
    ResetPasswordRequestComponent,
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    StoreModule,
    EffectsModule.forFeature([AuthenticationEffects, RegistrationEffects]),
  ],
  providers: [
    AuthenticationEffects, NewPasswordResolver,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SharedModule,
  ],
})
export class CoreModule { }
