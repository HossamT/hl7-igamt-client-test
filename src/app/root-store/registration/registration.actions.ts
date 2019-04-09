import { Action } from '@ngrx/store';
import {RegistrationObject} from '../../modules/core/models/user/registration-object.class';
import {User} from '../../modules/core/models/user/user.class';
import {AuthenticationResponse} from '../../modules/core/services/authentication.service';

export enum RegistrationActionTypes {
  RegistrationRequest = '[Registration Page] Registration Request',
  RegistrationSuccess = '[Registration Page] Registration Success',
  RegistrationFailure = '[Registration Page] Registration Failure',

}

export class RegistrationRequest implements Action {
  readonly type = RegistrationActionTypes.RegistrationRequest;
  constructor(readonly payload: RegistrationObject) {
  }
}

export class RegistrationSuccess implements Action {
  readonly type = RegistrationActionTypes.RegistrationSuccess;
  constructor(readonly payload: AuthenticationResponse) {
  }
}

export class RegistrationFailure implements Action {
  readonly type = RegistrationActionTypes.RegistrationFailure;
  constructor(readonly payload: string) {
  }
}

export type RegistrationActions = RegistrationRequest | RegistrationFailure | RegistrationSuccess;
