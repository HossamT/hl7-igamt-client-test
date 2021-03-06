import { AuthenticatedGuard, NotAuthenticatedGuard } from './services/auth-guard.guard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationEffects } from './../../root-store/authentication/authentication.effects';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserManagementHeaderComponent } from './components/user-management-header/user-management-header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementHeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    StoreModule,
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [
    AuthenticationEffects,
    AuthenticatedGuard,
    NotAuthenticatedGuard,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SharedModule,
    HomeComponent,
  ],
})
export class CoreModule { }
