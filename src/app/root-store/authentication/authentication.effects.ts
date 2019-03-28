import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { User } from './../../modules/core/models/user/user.class';
import { AuthenticationService } from './../../modules/core/services/authentication.service';

import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import {
  AuthenticationActions, AuthenticationActionTypes, BootstrapCheckAuthStatus,
  LoginFailure, LoginPageRequest, LoginSuccess, LogoutSuccess, UpdateAuthStatus,
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  // Triggered when a login attempt is made
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginPageRequest),
    concatMap((action: LoginPageRequest) => {
      return this.authService.login(action.payload.usename, action.payload.password).pipe(
        map((user: User) => {
          return new LoginSuccess(user);
        }),
        catchError((error: string) => {
          return of(new LoginFailure([error]));
        }),
      );
    }),
  );

  // Triggered when the application is bootstraped to check if user is already logged in (through Cookies)
  @Effect()
  checkAuthStatus$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.BootstrapCheckAuthStatus),
    mergeMap((action: BootstrapCheckAuthStatus) => {
      return this.authService.checkAuthStatus();
    }),
    map((user: User) => {
      return new UpdateAuthStatus({
        errors: [],
        status: true,
        userInfo: user,
      });
    }),
    catchError((error: string) => {
      return of(new UpdateAuthStatus({
        errors: [],
        status: false,
        userInfo: null,
      }));
    }),
  );

  // Triggered when the user requests a logout
  @Effect()
  logoutRequest$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LogoutRequest),
    mergeMap(() => {
      return this.authService.logout();
    }),
    map(() => {
      return new LogoutSuccess();
    }),
  );

  // Triggered when the logout is successful
  @Effect()
  logoutSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LogoutSuccess),
    map(() =>
      new UpdateAuthStatus({
        userInfo: null,
        status: false,
        errors: [],
      }),
    ),
  );

  // Triggered when a login attempt is successful
  @Effect()
  updateStatusSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginSuccess),
    map((action: LoginSuccess) => {
      return new UpdateAuthStatus({
        userInfo: action.payload,
        status: true,
        errors: [],
      });
    }),
  );

  // Triggered when a login attempt has failed
  @Effect()
  updateStatusFailure$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginFailure),
    map((action: LoginFailure) => {
      return new UpdateAuthStatus({
        userInfo: null,
        status: false,
        errors: [...action.errors],
      });
    }),
  );

  constructor(private actions$: Actions<AuthenticationActions>, private authService: AuthenticationService) { }

}
