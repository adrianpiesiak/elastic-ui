import { RequestAction, ResultAction, ErrorAction } from './../loadable';

export enum ActionTypes {
  employeeSearch = '[EMPLOYEES] SEARCH',
  employeeSearchSuccess = '[EMPLOYEES] SEARCH SUCCESS',
  employeeSearchError = '[EMPLOYEES] SEARCH ERROR',
  loadEmploymentHistory = '[EMPLOYEES] LOAD HISTORY',
  loadEmploymentHistorySuccess = '[EMPLOYEES] LOAD HISTORY SUCCESS',
  loadEmploymentHistoryError = '[EMPLOYEES] LOAD HISTORY ERROR'
}

export class EmployeeSearch implements RequestAction<any> {
  readonly type = ActionTypes.employeeSearch;
  constructor(public params: any) {}
}

export class EmployeeSearchSuccess implements ResultAction<any> {
  readonly type = ActionTypes.employeeSearchSuccess;
  constructor(public results: any[]) {}
}

export class EmployeeSearchError implements ErrorAction<any> {
  readonly type = ActionTypes.employeeSearchError;
  constructor(public error: any) {}
}

export class LoadEmploymentHistory implements RequestAction<any> {
  readonly type = ActionTypes.loadEmploymentHistory;
  constructor(public params: any) {}
}

export class LoadEmploymentHistorySuccess implements ResultAction<any> {
  readonly type = ActionTypes.loadEmploymentHistorySuccess;
  constructor(public results: any[]) {}
}

export class LoadEmploymentHistoryError implements ErrorAction<any> {
  readonly type = ActionTypes.loadEmploymentHistoryError;
  constructor(public error: any) {}
}

export type Actions =
  | EmployeeSearch
  | EmployeeSearchSuccess
  | EmployeeSearchError
  | LoadEmploymentHistory
  | LoadEmploymentHistorySuccess
  | LoadEmploymentHistoryError;
