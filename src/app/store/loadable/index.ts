import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export class ErrorAction<T> implements Action {
  error: T;
  type: string;
}

export class RequestAction<T> implements Action {
  params?: T;
  type: string;
}

export class ResultAction<T> implements Action {
  results: T[];
  type: string;
}

export interface Loadable<T> extends EntityState<T> {
  loading: boolean;
  success: boolean;
  error: any;
}

export function initLoadable<T>(adapter: EntityAdapter<T>) {
  const state = adapter.getInitialState();
  return {
    ...state,
    loading: false,
    success: false,
    error: null
  };
}

export function onLoadableLoad<T>(
  loadable: Loadable<T>,
  adapter: EntityAdapter<T>
): Loadable<T> {
  const state = adapter.removeAll(loadable);
  return {
    ...state,
    loading: true,
    success: false,
    error: null
  };
}

export function onLoadableSuccess<T>(
  loadable: Loadable<T>,
  results: T[],
  adapter: EntityAdapter<T>
) {
  const state = adapter.addAll(results, loadable);
  return {
    ...state,
    loading: false,
    success: true,
    error: null
  };
}

export function onLoadableError<T>(loadable: Loadable<T>, error: any) {
  return {
    ...loadable,
    loading: false,
    success: false,
    error: error,
    result: null
  };
}

export function loadableBasicReducer<T>(
  loadable: Loadable<T>,
  action: any,
  successAction: string,
  errorAction: string,
  loadAction: string,
  adapter: EntityAdapter<T>,
  clearAction?: string
) {
  switch (action.type) {
    case loadAction: {
      return onLoadableLoad(loadable, adapter);
    }
    case errorAction: {
      return onLoadableError(loadable, action.error);
    }
    case successAction: {
      console.log('adding results');
      console.log(action.results);
      return onLoadableSuccess(loadable, action.results, adapter);
    }

    case clearAction: {
      console.log('CLEAR ACTION');
      return {
        ...loadable,
        result: null
      };
    }

    default: {
      return loadable;
    }
  }
}
