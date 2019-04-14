
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Config} from '../../modules/shared/models/config.class';
import { ConfigActions, ConfigActionTypes } from './config.actions';

export interface IState {
  hl7Config: Config;
}

export const initialState: IState = {
  hl7Config: new Config([], []),
};

export function reducer(state = initialState, action: ConfigActions): IState {
  if (action.type === ConfigActionTypes.LoadConfigSuccess) {
      state = {...state, hl7Config: action.payload};
      return  state;
  } else {
    return state;
  }
}
export const getConfigState = createFeatureSelector<IState>('config');

export const getHl7ConfigState = createSelector(
  getConfigState,
  ( state: IState) => state.hl7Config,
);

export const getHl7Versions = createSelector(
  getHl7ConfigState,
  ( state: Config) => state.hl7Versions,
);
