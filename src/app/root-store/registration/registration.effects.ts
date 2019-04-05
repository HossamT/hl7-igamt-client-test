import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { User } from '../../modules/core/models/user/user.class';
import { RegistrationService } from '../../modules/core/services/registration.service';
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
          return of(new RegistrationFailure([error]));
        }),
      );
    }),
  );

  @Effect()
  registrationSuccess$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationSuccess),
    concatMap((action: RegistrationSuccess) => {
      return of(
        // new fromMessages.AddMessage(new Message(MessageType.SUCCESS, ' Registration Success', action.payload))
      );
    }),
  );

  @Effect()
  registrationFailure$ = this.actions$.pipe(
    ofType(RegistrationActionTypes.RegistrationFailure),
    concatMap((action: RegistrationFailure) => {
      return of(
        // new fromMessages.AddMessage(new Message(MessageType.FAILED, ' Registration Failure', action.payload))
      );
    }),
  );
}
