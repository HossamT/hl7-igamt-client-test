import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './authentication/authentication.reducer';

export interface IRouteState {
  auth: fromAuth.IState;
}

export const reducers: ActionReducerMap<IRouteState> = {
  auth: fromAuth.reducer,
};
