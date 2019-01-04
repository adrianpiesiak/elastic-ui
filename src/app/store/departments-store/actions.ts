import { RequestAction, ResultAction, ErrorAction } from './../loadable';

export enum ActionTypes {
  loadDepartmentsData = '[DEPARTMENTS] LOAD',
  loadDepartmentsDataSuccess = '[DEPARTMENTS] LOAD SUCCESS',
  loadDepartmentsDataError = '[DEPARTMENTS] LOAD ERROR',
  loadDetailsData = '[DEPARTMENTS] DETAILS LOAD',
  loadDetailsDataSuccess = '[DEPARTMENTS] DETAILS LOAD SUCCESS',
  loadDetailsDataError = '[DEPARTMENTS] DETAILS LOAD ERROR'
}

export class LoadDepartmentsData implements RequestAction<any> {
  readonly type = ActionTypes.loadDepartmentsData;
}

export class LoadDepartmentsDataSuccess implements ResultAction<any> {
  readonly type = ActionTypes.loadDepartmentsDataSuccess;
  readonly results: any;
  constructor(results: any) {
    this.results = results;
  }
}

export class LoadDepartmentsDataError implements ErrorAction<any> {
  readonly type = ActionTypes.loadDepartmentsDataError;
  readonly error: any;
  constructor(error: any) {
    this.error = error;
  }
}

export class LoadDetailsData implements RequestAction<string> {
  readonly type = ActionTypes.loadDetailsData;
  readonly params: string;
  constructor(deptName: string) {
    this.params = deptName;
  }
}

export class LoadDetailsDataSuccess implements ResultAction<any> {
  readonly type = ActionTypes.loadDetailsDataSuccess;
  readonly results: any;
  constructor(payload: any) {
    this.results = payload;
  }
}

export class LoadDetailsDataError implements ErrorAction<any> {
  readonly type = ActionTypes.loadDetailsDataError;
  readonly error: any;
  constructor(error: any) {
    this.error = error;
  }
}

export type ActionsUnion =
  | LoadDepartmentsData
  | LoadDepartmentsDataSuccess
  | LoadDepartmentsDataError
  | LoadDetailsData
  | LoadDetailsDataSuccess
  | LoadDetailsDataError;
