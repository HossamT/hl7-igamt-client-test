import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromAuth from './authentication/authentication.reducer';
import * as fromLoader from './loader/loader.reducer';
import * as fromPageMessages from './page-messages/page-messages.reducer';

export interface IRouteState {
  auth: fromAuth.IState;
  loader: fromLoader.IState;
  pageMessages: fromPageMessages.IState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<IRouteState> = {
  auth: fromAuth.reducer,
  loader: fromLoader.reducer,
  pageMessages: fromPageMessages.reducer,
  router: routerReducer,
};

// ROUTER SELECTORS
export const selectRouterURL = (state: IRouteState) => {
  if (state.router) {
    return state.router.state.url;
  } else {
    return '';
  }
};
