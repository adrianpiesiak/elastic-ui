import { Loadable, initLoadable, loadableBasicReducer } from './../loadable';
import { Actions, ActionTypes } from './actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Employee } from 'src/app/employees/employees.model';

export interface State {
  phrase: string;
  suggestions: Loadable<any>;
  employments: Loadable<Employee>;
}

export const dataAdapter = createEntityAdapter<Employee>({
  selectId: e => e.num
});

export const suggestionsAdapter = createEntityAdapter<Employee>({
  selectId: e => e.emp_no
});

export const initialState = {
  phrase: '',
  suggestions: initLoadable(suggestionsAdapter),
  employments: initLoadable(dataAdapter)
};

export function suggestionsReducer(
  state: Loadable<Employee>,
  action: Actions
): Loadable<Employee> {
  return loadableBasicReducer(
    state,
    action,
    ActionTypes.employeeSearchSuccess,
    ActionTypes.employeeSearchError,
    ActionTypes.employeeSearch,
    suggestionsAdapter
  );
}

export function employeesReducer(
  state: State = initialState,
  action: Actions
): State {
  console.log(state);
  return {
    ...state,
    suggestions: suggestionsReducer(state.suggestions, action),
    employments: employmentsReducer(state.employments, action),
    phrase: phraseReducer(state.phrase, action)
  };
}

export function employmentsReducer(
  state: Loadable<Employee>,
  action: Actions
): Loadable<Employee> {
  return loadableBasicReducer(
    state,
    action,
    ActionTypes.loadEmploymentHistorySuccess,
    ActionTypes.loadEmploymentHistoryError,
    ActionTypes.loadEmploymentHistory,
    dataAdapter
  );
}

export function phraseReducer(state: string, action: Actions): string {
  switch (action.type) {
    case ActionTypes.employeeSearch: {
      console.log(action.params);
      return action.params;
    }
    default: {
      return state;
    }
  }
}
