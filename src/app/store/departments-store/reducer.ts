import * as Dashboard from './actions';

export interface State {
  loading: boolean;
  success: boolean;
  error: any;
  results: any;
  details: any;
}

export const initialState: State = {
  loading: false,
  success: false,
  error: null,
  results: [],
  details: []
};

export function departmentsReducer(
  state: State = initialState,
  action: Dashboard.ActionsUnion
): State {
  console.log(action.type);
  switch (action.type) {
    case Dashboard.ActionTypes.loadDepartmentsData: {
      return {
        ...state,
        loading: true
      };
    }

    case Dashboard.ActionTypes.loadDepartmentsDataError: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case Dashboard.ActionTypes.loadDepartmentsDataSuccess: {
      console.log(action.results);

      const newState = {
        ...state,
        loading: false,
        error: null,
        results: [...action.results]
      };

      console.log(newState);

      return newState;
    }

    case Dashboard.ActionTypes.loadDetailsData: {
      return {
        ...state,
        loading: true
      };
    }

    case Dashboard.ActionTypes.loadDetailsDataSuccess: {
      return {
        ...state,
        loading: false,
        details: action.payload
      };
    }

    case Dashboard.ActionTypes.loadDetailsDataError: {
      return {
        ...state,
        loading: false,
        details: null,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
}
