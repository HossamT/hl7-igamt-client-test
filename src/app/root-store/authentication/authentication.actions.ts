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

export class BootstrapCheckAuthStatus implements Action {
  readonly type = AuthenticationActionTypes.BootstrapCheckAuthStatus;
}

export class LoginRequest {
  username: string;
  password: string;
}

export class LoginPageRequest implements Action {
  readonly type = AuthenticationActionTypes.LoginPageRequest;
  constructor(readonly payload: LoginRequest) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LoginSuccess;
  constructor(readonly payload: User) { }
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LoginFailure;
  constructor(readonly errors: string[]) { }
}

export class UnauthorizedRequest implements Action {
  readonly type = AuthenticationActionTypes.UnauthorizedRequest;
  constructor(readonly errors: string[]) { }
}

export class LogoutRequest implements Action {
  readonly type = AuthenticationActionTypes.LogoutRequest;
}

export class LogoutSuccess implements Action {
  readonly type = AuthenticationActionTypes.LogoutSuccess;
}

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
