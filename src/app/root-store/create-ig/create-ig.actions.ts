import { Action } from '@ngrx/store';
import {IDocumentCreationWrapper} from '../../modules/ig/models/ig/document-creation.interface';
import {MessageEventTreeNode} from '../../modules/ig/models/message-event/message-event.class';

export enum CreateIgActionTypes {
  LoadMessageEvents = '[Create IG Page] Load Message Events',
  LoadMessageEventsSuccess = '[Create IG Page] Load Message Events Success',
  LoadMessageEventsFailure = '[Create IG Page] Load Message Events Failure',
  CreateIg= '[Create IG Page] Create IG',
  CreateIgSuccess= '[Create IG Page] Create IG Success',
  CreateIgFailure= '[Create IG Page] Create IG Failure',
}

export class LoadMessageEvents implements Action {
  readonly type = CreateIgActionTypes.LoadMessageEvents;
  constructor(readonly payload: string) {
  }
}

export class LoadMessageEventsSuccess implements Action {
  readonly type = CreateIgActionTypes.LoadMessageEventsSuccess;
  constructor(readonly payload: MessageEventTreeNode[]) {
  }
}

export class LoadMessageEventsFailure implements Action {
  readonly type = CreateIgActionTypes.LoadMessageEventsFailure;
  constructor(readonly payload: string) {
  }
}
export class CreateIg implements Action {
  readonly type = CreateIgActionTypes.CreateIg;
  constructor(readonly payload: IDocumentCreationWrapper) {
  }
}
export class CreateIgFailure implements Action {
  readonly type = CreateIgActionTypes.CreateIgFailure;
  constructor(readonly payload: string) {
  }
}
export class CreateIgSuccess implements Action {
  readonly type = CreateIgActionTypes.CreateIgSuccess;
  constructor(readonly payload: string) {
  }
}

export type CreateIgActions = LoadMessageEvents| LoadMessageEventsSuccess |
  LoadMessageEventsFailure| CreateIgSuccess|
  CreateIgFailure| CreateIg;
