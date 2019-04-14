import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './../core/services/auth-guard.guard';
import {CreateIGComponent} from './components/create-ig/create-ig.component';
import { IgListContainerComponent } from './components/ig-list-container/ig-list-container.component';

const routes: Routes = [
  {
    path: 'list',
    component: IgListContainerComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'create',
    component: CreateIGComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class IgRoutingModule { }
