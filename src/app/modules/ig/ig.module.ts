import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {RadioButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/steps';
import {TableModule} from 'primeng/table';
import { IgListEffects } from 'src/app/root-store/ig-list/ig-list.effects';
import {CreateIgEffects} from '../../root-store/create-ig/create-ig.effects';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { CreateIGComponent } from './components/create-ig/create-ig.component';
import { IgListContainerComponent } from './components/ig-list-container/ig-list-container.component';
import { IgListItemCardComponent } from './components/ig-list-item-card/ig-list-item-card.component';
import { IgRoutingModule } from './ig-routing.module';
import { IgListService } from './services/ig-list.service';
import { IgService } from './services/ig.service';

@NgModule({
  declarations: [IgListContainerComponent, IgListItemCardComponent, CreateIGComponent],
  imports: [
    IgRoutingModule,
    EffectsModule.forFeature([IgListEffects, CreateIgEffects]),
    CoreModule,
    SharedModule,
    StepsModule,
    RadioButtonModule,
    TableModule,
  ],
  providers: [
    IgListService,
    IgService,
  ],
  exports: [IgListContainerComponent, IgListItemCardComponent],
})
export class IgModule { }
