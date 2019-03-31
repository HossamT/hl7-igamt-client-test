import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from './../../modules/core/models/user/user.class';
import { AuthenticationActions, AuthenticationActionTypes } from './authentication.actions';
import { IState } from './authentication.reducer';

export interface IState {
  isLoggedIn: boolean;
  userInfo: User;
  errors: string[];
}

export const initialState: IState = {
  isLoggedIn: false,
  userInfo: null,
  errors: [],
};

export function reducer(state = initialState, action: AuthenticationActions): IState {
  // tslint:disable-next-line: no-small-switch
  switch (action.type) {

    case AuthenticationActionTypes.UpdateAuthStatus:
      return {
        errors: action.payload.errors,
        isLoggedIn: action.payload.status,
        userInfo: action.payload.userInfo,
      };

    default:
      return state;
  }
}

export const selectAuth = createFeatureSelector<IState>('auth');
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: IState) => state.isLoggedIn,
);
export const selectUserInfo = createSelector(
  selectAuth,
  (state: IState) => {
    if (state.isLoggedIn) {
      return state.userInfo;
    } else {
      return undefined;
    }
  },
);
export const selectUsername = createSelector(
  selectUserInfo,
  (user: User) => {
    if (user) {
      return user.username;
    } else {
      return undefined;
    }
  },
);
export const selectAuthorities = createSelector(
  selectUserInfo,
  (user: User) => {
    if (user) {
      return user.authorities;
    } else {
      return [];
    }
  },
);
export const selectAuthErrorList = createSelector(
  selectAuth,
  (state: IState) => {
    if (state.isLoggedIn) {
      return [];
    } else {
      return state.errors;
    }
  },
);
