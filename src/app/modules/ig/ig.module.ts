import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IgListEffects } from 'src/app/root-store/ig-list/ig-list.effects';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { IgListContainerComponent } from './components/ig-list-container/ig-list-container.component';
import { IgListItemCardComponent } from './components/ig-list-item-card/ig-list-item-card.component';
import { IgRoutingModule } from './ig-routing.module';
import { IgListService } from './services/ig-list.service';
import { IgService } from './services/ig.service';

@NgModule({
  declarations: [IgListContainerComponent, IgListItemCardComponent],
  imports: [
    IgRoutingModule,
    EffectsModule.forFeature([IgListEffects]),
    CoreModule,
    SharedModule,
  ],
  providers: [
    IgListService,
    IgService,
  ],
  exports: [IgListContainerComponent, IgListItemCardComponent],
})
export class IgModule { }
