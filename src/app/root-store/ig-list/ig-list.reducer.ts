import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISortOptions } from 'src/app/modules/shared/models/sort.class';
import { IgListItem } from '../../modules/ig/models/ig/ig-list-item.class';
import { IgListActions, IgListActionTypes, IgListLoad } from './ig-list.actions';

export interface IState extends EntityState<IgListItem> {
  viewType: IgListLoad;
  sortOptions: ISortOptions;
}

export const initialState: IState = {
  entities: {},
  ids: [],
  viewType: 'USER',
  sortOptions: {
    property: 'title',
    ascending: true,
  },
};

const igListItemAdapter = createEntityAdapter<IgListItem>();

export function reducer(state = initialState, action: IgListActions): IState {
  switch (action.type) {

    case IgListActionTypes.UpdateIgList:
      return igListItemAdapter.upsertMany(action.payload, state);

    case IgListActionTypes.DeleteIgListItemSuccess:
      return igListItemAdapter.removeOne(action.id, state);

    case IgListActionTypes.SelectIgListViewType:
      return {
        ...state,
        viewType: action.viewType,
      };

    case IgListActionTypes.SelectIgListSortOption:
      return {
        ...state,
        sortOptions: action.sortOption,
      };

    default:
      return state;
  }
}

export const selectIgList = createFeatureSelector<IState>('igList');
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = igListItemAdapter.getSelectors();

export const selectViewType = createSelector(
  selectIgList,
  (state: IState) => {
    return state.viewType;
  },
);

export const selectSortOptions = createSelector(
  selectIgList,
  (state: IState) => {
    return state.sortOptions;
  },
);

export const selectLoadedIgs = createSelector(
  selectIgList,
  selectAll,
);

export const selectIgListView = createSelector(
  selectLoadedIgs,
  selectViewType,
  (igList: IgListItem[], viewType: IgListLoad) => {
    return igList.filter((item) => {
      return item.type === viewType || (viewType === 'ALL' && item.type === 'USER');
    });
  },
);

export const selectIgListViewFiltered = createSelector(
  selectIgListView,
  (igList: IgListItem[], props: any) => {
    return igList.filter((item) => {
      return props.filter && item.title.includes(props.filter) || !props.filter;
    });
  },
);

export const selectIgListViewFilteredAndSorted = createSelector(
  selectIgListViewFiltered,
  selectSortOptions,
  (igList: IgListItem[], sort: ISortOptions) => {
    return igList
      .slice()
      .sort((elm1, elm2) => {
        const factor: number = elm1[sort.property] < elm2[sort.property] ? -1 : elm2[sort.property] < elm1[sort.property] ? 1 : 0;
        return !sort.ascending ? factor * -1 : factor;
      });
  },
);
