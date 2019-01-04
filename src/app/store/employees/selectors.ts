import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { State, dataAdapter, suggestionsAdapter } from './reducer';

export const employeesSelector = createFeatureSelector('employees');

export const selectSuggestionsEntity = createSelector(
  employeesSelector,
  (state: State) => state.suggestions
);

const selectAllSuggestions = suggestionsAdapter.getSelectors().selectAll;

export const selectSuggestions = createSelector(
  selectSuggestionsEntity,
  selectAllSuggestions
);

export const selectPhrase = createSelector(
  employeesSelector,
  (state: State) => state.phrase
);

export const selectEmploymentsEntity = createSelector(
  employeesSelector,
  (state: State) => state.employments
);

const selectAllEmployments = dataAdapter.getSelectors().selectAll;

export const selectEmployments = createSelector(
  selectEmploymentsEntity,
  selectAllEmployments
);

export const selectEmploymentsLoading = createSelector(
  employeesSelector,
  (state: State) => state.employments.loading
);
