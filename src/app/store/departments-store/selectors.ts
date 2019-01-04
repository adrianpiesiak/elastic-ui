import { State, detailsAdapter, deptsAdapter } from './';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectDepartments = createFeatureSelector<State>('departments');

export const selectDepartmentsEntity = createSelector(
  selectDepartments,
  (state: State) => state.departments
);

const selectAllDepartments = deptsAdapter.getSelectors().selectAll;

export const selectDepartmentsResults = createSelector(
  selectDepartmentsEntity,
  selectAllDepartments
);

export const selectDepartmentsLoading = createSelector(
  selectDepartments,
  (state: State) => state.departments.loading
);

export const selectDetailsLoading = createSelector(
  selectDepartments,
  (state: State) => state.details.loading
);

export const selectDetailsEntity = createSelector(
  selectDepartments,
  (state: State) => state.details
);

const { selectAll } = detailsAdapter.getSelectors();

export const selectDetails = createSelector(
  selectDetailsEntity,
  selectAll
);

export const selectDepartmentsLoaded = createSelector(
  selectDepartments,
  (state: State) => state.departments.success
);
