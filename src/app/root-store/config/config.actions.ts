import { Action } from '@ngrx/store';
import {Hl7Config} from '../../modules/shared/models/config.class';

export enum ConfigActionTypes {
  LoadConfig = '[Main Page] Load Config',
  LoadConfigSuccess = '[Main Page] Load Config Success',
  LoadConfigFailure = '[Main Page] Load Config Failure',

}

export class LoadConfig implements Action {
  readonly type = ConfigActionTypes.LoadConfig;
}

export class LoadConfigSuccess implements Action {
  readonly type = ConfigActionTypes.LoadConfigSuccess;
  constructor(readonly payload: Hl7Config) {

  }
}

export class LoadConfigFailure implements Action {
  readonly type = ConfigActionTypes.LoadConfigFailure;
  constructor(readonly payload: string) {
  }
}

export type ConfigActions = LoadConfig | LoadConfigSuccess | LoadConfigFailure;
