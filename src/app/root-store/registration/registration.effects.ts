import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators';
import {Message, MessageType} from '../../modules/core/models/message/message.class';
import {User} from '../../modules/core/models/user/user.class';
import {RegistrationService} from '../../modules/core/services/registration.service';
import * as fromMessages from '../../root-store/page-messages/page-messages.actions';
import {
  RegistrationActionTypes,
  RegistrationFailure,
  RegistrationRequest,
  RegistrationSuccess,
} from './registration.actions';

@Injectable()
export class RegistrationEffects {

  constructor(private actions$: Actions, private registrationService: RegistrationService) {

  }
  @Effect()
  registration$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationRequest),
    concatMap((action: RegistrationRequest) => {
      return this.registrationService.register(action.payload).pipe(
        map((user: User) => {
          return new RegistrationSuccess(user);
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
    map( (action: RegistrationSuccess) => {
      return new fromMessages.AddMessages(new Message(MessageType.SUCCESS, ' Registration Success', action.payload));
    }),
  );

  @Effect()
  registrationFailure$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationFailure),
    map( (action: RegistrationFailure) => {
      return new fromMessages.AddMessages(new Message(MessageType.FAILED, action.payload, null));
    }),
  );
}
