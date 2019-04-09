import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, concatMap, flatMap, map} from 'rxjs/operators';
import {Message, MessageType} from '../../modules/core/models/message/message.class';
import {AuthenticationResponse, AuthenticationService} from '../../modules/core/services/authentication.service';
import {MessageService} from '../../modules/core/services/message.service';
import {RegistrationService} from '../../modules/core/services/registration.service';
import {ClearAll} from '../../root-store/page-messages/page-messages.actions';
import {TurnOffLoader, TurnOnLoader} from '../loader/loader.actions';
import {
  RegistrationActionTypes,
  RegistrationFailure,
  RegistrationRequest,
  RegistrationSuccess,
} from './registration.actions';

@Injectable()
export class RegistrationEffects {

  constructor(private actions$: Actions, private registrationService: RegistrationService,   private store: Store<any>,
              private authService: AuthenticationService,
              private message: MessageService) {

  }
  @Effect()
  registration$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationRequest),
    concatMap((action: RegistrationRequest) => {
      this.store.dispatch(new TurnOnLoader({
        blockUI: false,
      }));
      return this.registrationService.register(action.payload).pipe(
        map((userResponse: AuthenticationResponse) => {
          return new RegistrationSuccess(userResponse);
        }),
        catchError((error: string) => {
          return of(new RegistrationFailure(error));
        }),
      );
    }),
  );

  @Effect()
  registrationSuccess$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationSuccess),
    flatMap( (action: RegistrationSuccess) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.SUCCESS, action.payload.text, action.payload.data)),
      ];
    }),
  );

  @Effect()
  registrationFailure$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationFailure),
    flatMap( (action: RegistrationFailure) => {
      return [
        new ClearAll(),
        new TurnOffLoader(),
        this.message.messageToAction(new Message(MessageType.FAILED, action.payload, null)),
    ];
    }),
  );
}
