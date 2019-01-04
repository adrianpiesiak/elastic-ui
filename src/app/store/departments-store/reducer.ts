import * as Dashboard from './actions';
import * as Loadable from '../loadable';
import { loadableBasicReducer } from '../loadable';
import { createEntityAdapter } from '@ngrx/entity';

export interface State {
  departments: Loadable.Loadable<any>;
  details: Loadable.Loadable<any>;
}

export const deptsAdapter = createEntityAdapter<any>({
  selectId: x => x.dept_name
});

export const detailsAdapter = createEntityAdapter<any>({
  selectId: x => x.num
});

export const initialState: State = {
  departments: Loadable.initLoadable(deptsAdapter),
  details: Loadable.initLoadable(detailsAdapter)
};

export function detailsReducer(
  state: Loadable.Loadable<any>,
  action: Dashboard.ActionsUnion
): Loadable.Loadable<any> {
  return loadableBasicReducer(
    state,
    action,
    Dashboard.ActionTypes.loadDetailsDataSuccess,
    Dashboard.ActionTypes.loadDetailsDataError,
    Dashboard.ActionTypes.loadDetailsData,
    detailsAdapter,
    Dashboard.ActionTypes.loadDepartmentsData
  );
}

export function departmentDataReducer(
  state: Loadable.Loadable<any>,
  action: Dashboard.ActionsUnion
): Loadable.Loadable<any> {
  return loadableBasicReducer(
    state,
    action,
    Dashboard.ActionTypes.loadDepartmentsDataSuccess,
    Dashboard.ActionTypes.loadDepartmentsDataError,
    Dashboard.ActionTypes.loadDepartmentsData,
    deptsAdapter
  );
}

export function departmentsContainerReducer(
  state: State = initialState,
  action: Dashboard.ActionsUnion
): State {
  return {
    departments: departmentDataReducer(state.departments, action),
    details: detailsReducer(state.details, action)
  };
}
