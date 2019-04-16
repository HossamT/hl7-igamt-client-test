import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, concatMap, flatMap, mergeMap} from 'rxjs/operators';
import {Message, MessageType} from '../../modules/core/models/message/message.class';
import {MessageService} from '../../modules/core/services/message.service';
import {Hl7Config} from '../../modules/shared/models/config.class';
import {ConfigService} from '../../modules/shared/services/config.service';
import {TurnOffLoader, TurnOnLoader} from '../loader/loader.actions';
import {ClearAll} from '../page-messages/page-messages.actions';
import {ConfigActions, ConfigActionTypes, LoadConfig, LoadConfigFailure, LoadConfigSuccess} from './config.actions';

@Injectable()
export class ConfigEffects {
  @Effect()
  loadConfig$ = this.actions$.pipe(
    ofType(ConfigActionTypes.LoadConfig),
    concatMap((action: LoadConfig) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: false,
      }));
      return this.configService.getConfig().pipe(
        flatMap((resp: Hl7Config) => {
          return [new LoadConfigSuccess(resp),
            new ClearAll(),
            new TurnOffLoader(),
          ];
        })
        , catchError(
          (err: string) => {
            return of(new LoadConfigFailure(err));
          })
        ,
      );
    }),
  );

  @Effect()
  loadConfigFailure$ = this.actions$.pipe(
    ofType(ConfigActionTypes.LoadConfigFailure),
    flatMap((action: LoadConfigFailure) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.FAILED, action.payload, action.payload)),
      ];
    }),
  );

  constructor(private actions$: Actions<ConfigActions>, private store: Store<any>, private configService: ConfigService,
              private message: MessageService) {}

}
