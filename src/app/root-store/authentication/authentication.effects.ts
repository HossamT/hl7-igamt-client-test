import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromMessages from '../../root-store/page-messages/page-messages.actions';
import { User } from './../../modules/core/models/user/user.class';
import { AuthenticationService } from './../../modules/core/services/authentication.service';

import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import {Message, MessageType} from '../../modules/core/models/message/message.class';
import {
  AuthenticationActions,
  AuthenticationActionTypes,
  BootstrapCheckAuthStatus,
  LoginFailure,
  LoginPageRequest,
  LoginSuccess,
  LogoutSuccess,
  ResetPasswordRequest,
  ResetPasswordRequestFailure,
  ResetPasswordRequestSuccess,
  UpdateAuthStatus,
  UpdatePasswordRequest, UpdatePasswordRequestFailure,
  UpdatePasswordRequestSuccess,
  ValidateToKen,
  ValidateToKenFailure,
  ValidateToKenSuccess,
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
  // | ResetPasswordRequest | ResetPasswordRequestSuccess | ResetPasswordRequestFailure
  // | ValidateToKen |ValidateToKenSuccess | ValidateToKenFailure;

  @Effect()
  resetPasswordRequest$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.ResetPasswordRequest),
    concatMap((action: ResetPasswordRequest) => {
      return this.authService.requestChangePassword(action.payload).pipe(
        map((message: string) => {
          return new ResetPasswordRequestSuccess(message);
        }),
        catchError((error: string) => {
          return of(new ResetPasswordRequestFailure(error));
        }),
      );
    }),
  );

  @Effect()
  resetPasswordRequestFailure$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.ResetPasswordRequestFailure),
    map((action: ResetPasswordRequestFailure) => {
      return new fromMessages.AddMessages(new Message(MessageType.FAILED, action.payload, action.payload));
    }),
  );
  @Effect()
  resetPasswordRequestSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.ResetPasswordRequestSuccess),
    map((action: ResetPasswordRequestSuccess) => {
      return new fromMessages.AddMessages(new Message(MessageType.SUCCESS, action.payload, action.payload));
    }),
  );

  @Effect()
  updatePassword$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UpdatePasswordRequest),
    concatMap((action: UpdatePasswordRequest) => {
      return this.authService.updatePassword(action.payload.token , action.payload.password).pipe(
        map((message: string) => {
          return new UpdatePasswordRequestSuccess(message);
        }),
        catchError((error: string) => {
          return of(new UpdatePasswordRequestFailure(error));
        }),
      );
    }),
  );

  @Effect()
  updatePasswordRequestFailure$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UpdatePasswordRequestFailure),
    map((action: UpdatePasswordRequestFailure) => {
      return new fromMessages.AddMessages(new Message(MessageType.FAILED, action.payload, action.payload));
    }),
  );
  @Effect()
  updatePasswordRequestSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UpdatePasswordRequestSuccess),
    map((action: UpdatePasswordRequestSuccess) => {
      return new fromMessages.AddMessages(new Message(MessageType.SUCCESS, action.payload, action.payload));
    }),
  );

  constructor(private actions$: Actions<AuthenticationActions>, private authService: AuthenticationService) { }

}
