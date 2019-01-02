import { Action } from '@ngrx/store';

export enum ActionTypes {
  loadDepartmentsData = '[DEPARTMENTS] LOAD',
  loadDepartmentsDataSuccess = '[DEPARTMENTS] LOAD SUCCESS',
  loadDepartmentsDataError = '[DEPARTMENTS] LOAD ERROR',
  loadDetailsData = '[DEPARTMENTS] DETAILS LOAD',
  loadDetailsDataSuccess = '[DEPARTMENTS] DETAILS LOAD SUCCESS',
  loadDetailsDataError = '[DEPARTMENTS] DETAILS LOAD ERROR'
}

export class LoadDepartmentsData implements Action {
  readonly type = ActionTypes.loadDepartmentsData;
}

export class LoadDepartmentsDataSuccess implements Action {
  readonly type = ActionTypes.loadDepartmentsDataSuccess;
  readonly results: any;
  constructor(results: any) {
    this.results = results;
  }
}

export class LoadDepartmentsDataError implements Action {
  readonly type = ActionTypes.loadDepartmentsDataError;
  readonly error: any;
  constructor(error: any) {
    this.error = error;
  }
}

export class LoadDetailsData implements Action {
  readonly type = ActionTypes.loadDetailsData;
  readonly deptName: string;
  constructor(deptName: string) {
    this.deptName = deptName;
  }
}

export class LoadDetailsDataSuccess implements Action {
  readonly type = ActionTypes.loadDetailsDataSuccess;
  readonly payload: any;
  constructor(payload: any) {
    this.payload = payload;
  }
}

export class LoadDetailsDataError implements Action {
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
