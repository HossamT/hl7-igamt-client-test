import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Message, MessageType } from 'src/app/modules/core/models/message/message.class';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { TurnOffLoader, TurnOnLoader } from '../loader/loader.actions';
import { User } from './../../modules/core/models/user/user.class';
import { AuthenticationService } from './../../modules/core/services/authentication.service';
import { ClearAll } from './../page-messages/page-messages.actions';
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

  constructor(
    private actions$: Actions<AuthenticationActions>,
    private store: Store<any>,
    private authService: AuthenticationService,
    private message: MessageService,
  ) { }

}
