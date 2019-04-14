import { Action } from '@ngrx/store';
import {EventTreeData, MessageEventTreeNode} from '../../modules/ig/models/messageEvent/message-event.class';
import {IgCreationWrapper} from '../../modules/ig/models/ig/IgCreation.class';

export enum CreateIgActionTypes {
  LoadMessageEvents = '[Create IG Page] Load Message Events',
  LoadMessageEventsSuccess = '[Create IG Page] Load Message Events Success',
  LoadMessageEventsFailure = '[Create IG Page] Load Message Events Failure',
  CreateIg= '[Create IG Page] Create IG',
  CreateIgSuccess= '[Create IG Page] Create IG Success',
  CreateIgFailure= '[Create IG Page] Create IG Failure',
  SelectMessage= '[Create IG Page] select Message',
  UnselectMessage= '[Create IG Page] unselect Message',

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
  constructor(readonly payload: IgCreationWrapper) {
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
