import * as Departments from './departments-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  departments: Departments.State;
}

// export const selectDepartments = (state: AppState) => state.departments;

export const selectDepartments = createFeatureSelector<Departments.State>(
  'departments'
);

export const selectDepartmentsResults = createSelector(
  selectDepartments,
  (state: Departments.State) => state.results
);

export const selectDetails = createSelector(
  selectDepartments,
  (state: Departments.State) => state.details
);
