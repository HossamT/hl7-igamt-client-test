import { User } from './../../modules/core/models/user/user.class';

import { AuthenticationActions, AuthenticationActionTypes } from './authentication.actions';

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
