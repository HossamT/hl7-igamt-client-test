import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardModule} from 'primeng/card';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports: [NgbModule, RegisterFormComponent, CardModule ],
})
export class SharedModule { }
