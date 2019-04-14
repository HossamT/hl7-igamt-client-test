import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {EMPTY, of, throwError} from 'rxjs';
import {_throw} from 'rxjs-compat/observable/throw';
import { catchError, concatMap, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Message, MessageType } from 'src/app/modules/core/models/message/message.class';
import { MessageService } from 'src/app/modules/core/services/message.service';
import {LoadConfig} from '../config/config.actions';
import { TurnOffLoader, TurnOnLoader } from '../loader/loader.actions';
import { User } from './../../modules/core/models/user/user.class';
import { AuthenticationService } from './../../modules/core/services/authentication.service';
import { ClearAll } from './../page-messages/page-messages.actions';
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
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  // Triggered when a login attempt is made
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginPageRequest),
    concatMap((action: LoginPageRequest) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: false,
      }));
      return this.authService.login(action.payload.username, action.payload.password).pipe(
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
    flatMap((user: User) => {
      return [new UpdateAuthStatus({
        errors: [],
        status: true,
        userInfo: user,
      })];
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
    flatMap((action: LoginSuccess) => {
      return [
        new UpdateAuthStatus({
          userInfo: action.payload,
          status: true,
          errors: [],
        }),
        new ClearAll(),
        new TurnOffLoader(),
      ];
    }),
  );

  // Triggered when a login attempt has failed
  @Effect()
  updateStatusFailure$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginFailure),
    flatMap((action: LoginFailure) => {
      return [
        new UpdateAuthStatus({
          userInfo: null,
          status: false,
          errors: [...action.errors],
        }),
        new ClearAll(),
        new TurnOffLoader(),
        ...action.errors
          .map((error) => this.message.messageToAction(new Message(MessageType.FAILED, error, null))),
      ];
    }),
  );
  @Effect()
  resetPasswordRequest$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.ResetPasswordRequest),
    concatMap((action: ResetPasswordRequest) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: true,
      }));
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
    flatMap((action: ResetPasswordRequestFailure) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.FAILED, action.payload, action.payload)),
      ];
    }),
  );
  @Effect()
  resetPasswordRequestSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.ResetPasswordRequestSuccess),
    flatMap((action: ResetPasswordRequestSuccess) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.SUCCESS, action.payload, action.payload)),
      ];
    }),
  );

  @Effect()
  updatePassword$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UpdatePasswordRequest),
    concatMap((action: UpdatePasswordRequest) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: true,
      }));
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
    flatMap((action: UpdatePasswordRequestFailure) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.FAILED, action.payload, action.payload)),
      ];
    }),
  );
  @Effect()
  updatePasswordRequestSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UpdatePasswordRequestSuccess),
    flatMap((action: UpdatePasswordRequestSuccess) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.SUCCESS, action.payload, action.payload)),
      ];
    }),
  );

  constructor(
    private actions$: Actions<AuthenticationActions>,
    private store: Store<any>,
    private authService: AuthenticationService,
    private message: MessageService,
  ) { }

}
