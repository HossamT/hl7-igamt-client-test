import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastyModule } from 'ng2-toasty';
import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutTestComponent } from './layout-test/layout-test.component';
import { CoreModule } from './modules/core/core.module';
import { DefaultUserMessageOptions } from './modules/core/models/message/message.class';
import { reducers } from './root-store';

@NgModule({
  declarations: [
    AppComponent,
    LayoutTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
    ToastyModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [LayoutTestComponent],
})
export class AppModule { }
