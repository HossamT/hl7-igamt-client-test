import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface IRouteState {
  layout?: any;
}

export const reducers: ActionReducerMap<IRouteState> = {

};
