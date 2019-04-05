import { Action } from '@ngrx/store';
import {Message} from '../../modules/core/models/message/message.class';
import {PageMessagesActions, PageMessagesActionTypes} from './page-messages.actions';

export interface IState {
  messages: Message[];
}

export const initialState: IState = {
  messages: [],
};

export function reducer(state = initialState, action: PageMessagesActions): IState {
  switch (action.type) {
    case PageMessagesActionTypes.DeleteMessage:
      return { ...state , messages: removeMessage(state.messages, action.payload)};
    case PageMessagesActionTypes.ClearAll:
      return {
      ... state, messages: [],
      };
    case PageMessagesActionTypes.AddMessages:
      console.log("Updating state");
      return {
      ...state, messages: [...state.messages, action.payload],
    };

    default:
      return state;
  }
}

function removeMessage(messages: Message[], payload: number): Message[] {
  if (payload < messages.length && payload >= 0) {
    messages.splice(payload, 1);
  }
  return messages;
}
