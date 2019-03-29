import { Action } from '@ngrx/store';
import {Message} from '../../modules/core/models/message/message.class';

export enum PageMessagesActionTypes {
  AddMessages = '[PageMessages] Add Messages',
  DeleteMessage = '[PageMessages] Delete Messages',
  ClearAll = '[PageMessages] Clear All',

}

export class AddMessages implements Action {
  readonly type = PageMessagesActionTypes.AddMessages;
  constructor(readonly payload: Message[]) {}

}
export class DeleteMessages implements Action {
  readonly type = PageMessagesActionTypes.DeleteMessage;
  constructor(readonly payload: number) {}

}
export class ClearAll implements Action {
  readonly type = PageMessagesActionTypes.ClearAll;

}

export type PageMessagesActions = AddMessages | DeleteMessages |ClearAll ;
