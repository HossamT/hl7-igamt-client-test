import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './authentication/authentication.reducer';
import * as fromPageMessages from './page-messages/page-messages.reducer';

export interface IRouteState {
  auth: fromAuth.IState;
  pageMessages: fromPageMessages.IState;
}

export const reducers: ActionReducerMap<IRouteState> = {
  auth: fromAuth.reducer,
  pageMessages: fromPageMessages.reducer,
};
