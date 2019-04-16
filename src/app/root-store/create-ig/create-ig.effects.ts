import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, flatMap, mergeMap} from 'rxjs/operators';
import {Message, MessageType} from '../../modules/core/models/message/message.class';
import {MessageService} from '../../modules/core/services/message.service';
import {MessageEventTreeNode} from '../../modules/ig/models/message-event/message-event.class';
import {IgService} from '../../modules/ig/services/ig.service';
import {TurnOffLoader, TurnOnLoader} from '../loader/loader.actions';
import {ClearAll} from '../page-messages/page-messages.actions';
import {
  CreateIg,
  CreateIgActions,
  CreateIgActionTypes, CreateIgFailure,
  LoadMessageEvents,
  LoadMessageEventsFailure,
  LoadMessageEventsSuccess,
} from './create-ig.actions';

@Injectable()
export class CreateIgEffects {

  @Effect()
  loadMessagesEvents$ = this.actions$.pipe(
    ofType(CreateIgActionTypes.LoadMessageEvents),
    mergeMap((action: LoadMessageEvents) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: false,
      }));
      return this.igService.getMessagesByVersion(action.payload).pipe(
        flatMap((resp: MessageEventTreeNode[]) => {
          return [new LoadMessageEventsSuccess(resp),
            new ClearAll(),
            new TurnOffLoader(),
            ];
        })
        , catchError(
          (err: string) => {
            return of(new LoadMessageEventsFailure(err));
          })
        ,
      );
    }),
  );
  @Effect()
  createIg$ = this.actions$.pipe(
    ofType(CreateIgActionTypes.CreateIg),
    mergeMap((action: CreateIg) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: false,
      }));
      return this.igService.createIntegrationProfile(action.payload).pipe(
        flatMap((resp: Message<string>) => {
          return [this.message.messageToAction(new Message(MessageType.SUCCESS, resp.text, resp.text)),
            new ClearAll(),
            new TurnOffLoader(),
          ];
        })
        , catchError(
          (err: string) => {
            return of(new CreateIgFailure(err));
          })
        ,
      );
    }),
  );
  @Effect()
  createIgFailure = this.actions$.pipe(
    ofType(CreateIgActionTypes.LoadMessageEventsFailure),
    flatMap((action: LoadMessageEventsFailure) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.FAILED, action.payload, action.payload)),
      ];
    }),
  );

  constructor(private actions$: Actions<CreateIgActions>, private igService: IgService,
              private store: Store<any>, private message: MessageService) {
  }
}
