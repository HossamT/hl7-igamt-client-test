import { Action } from '@ngrx/store';
import {RegistrationObject} from '../../modules/core/models/user/registration-object.class';
import {User} from '../../modules/core/models/user/user.class';

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
  constructor(readonly payload: User) {
  }
}

export class RegistrationFailure implements Action {
  readonly type = RegistrationActionTypes.RegistrationFailure;
  constructor(readonly payload: string) {
  }
}

export type RegistrationActions = RegistrationRequest | RegistrationFailure | RegistrationSuccess;
