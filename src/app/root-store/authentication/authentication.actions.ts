import { Action } from '@ngrx/store';
import { User } from './../../modules/core/models/user/user.class';

export enum AuthenticationActionTypes {
  BootstrapCheckAuthStatus = '[Bootstrap Authentication] Check Authentication Status',
  LoginPageRequest = '[Login Page Authentication] Login Request',
  LoginSuccess = '[Authentication] Login Success',
  LoginFailure = '[Authentication] Login Failure',
  UnauthorizedRequest = '[Interceptor Authentication] Unauthorized Request',
  LogoutRequest = '[Logout Button Authentication] Logout Request',
  LogoutSuccess = '[Authentication] Logout Success',
  UpdateAuthStatus = '[Authentication] Update Authentication Status',
}

// [Bootstrap Authentication] Check Authentication Status, dispatched when bootstrapping the app to check the user's authentication status
export class BootstrapCheckAuthStatus implements Action {
  readonly type = AuthenticationActionTypes.BootstrapCheckAuthStatus;
}

export class LoginRequest {
  username: string;
  password: string;
}

// [Login Page Authentication] Login Request, dispatched when a User tries to login from the login page
export class LoginPageRequest implements Action {
  readonly type = AuthenticationActionTypes.LoginPageRequest;
  constructor(readonly payload: LoginRequest) { }
}

// [Authentication] Login Success, dispatched when Login was successful
export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LoginSuccess;
  constructor(readonly payload: User) { }
}

// [Authentication] Login Failure, dispatched when login attempt has failed
export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LoginFailure;
  constructor(readonly errors: string[]) { }
}

// [Interceptor Authentication] Unauthorized Request, dispatched when a request was unauthorized which means cookie token has expired'
export class UnauthorizedRequest implements Action {
  readonly type = AuthenticationActionTypes.UnauthorizedRequest;
  constructor(readonly errors: string[]) { }
}

// [Logout Button Authentication] Logout Request, dispatched when the user click the Logout button
export class LogoutRequest implements Action {
  readonly type = AuthenticationActionTypes.LogoutRequest;
}

// [Authentication] dispatched when logout was successful
export class LogoutSuccess implements Action {
  readonly type = AuthenticationActionTypes.LogoutSuccess;
}

// [Authentication] Update Authentication Status, dispatched to update the User's authentication state
export class UpdateAuthStatus implements Action {
  readonly type = AuthenticationActionTypes.UpdateAuthStatus;
  constructor(readonly payload: {
    userInfo: User,
    status: boolean,
    errors: string[],
  }) { }
}

export type AuthenticationActions = BootstrapCheckAuthStatus | LoginPageRequest |
  LoginSuccess | LoginFailure | UnauthorizedRequest |
  LogoutRequest | LogoutSuccess | UpdateAuthStatus;
