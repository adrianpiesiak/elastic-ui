import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as DeptActions from './actions';
import { EmployeesService } from './../../employees/employees.service';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private dataService: EmployeesService
  ) {}

  @Effect()
  loadDepartmentsData$: Observable<Action> = this.actions$.pipe(
    ofType(DeptActions.ActionTypes.loadDepartmentsData),
    mergeMap(action =>
      this.dataService.getDepartmentsAgregatedData().pipe(
        map(data => new DeptActions.LoadDepartmentsDataSuccess(data)),
        catchError(error => of(new DeptActions.LoadDepartmentsDataError(error)))
      )
    )
  );

  @Effect()
  loadDetailsData$: Observable<Action> = this.actions$.pipe(
    ofType(DeptActions.ActionTypes.loadDetailsData),
    mergeMap((action: DeptActions.LoadDetailsData) =>
      this.dataService.searchByDepartment(action.deptName).pipe(
        map(data => new DeptActions.LoadDetailsDataSuccess(data)),
        catchError(error => of(new DeptActions.LoadDetailsDataError(error)))
      )
    )
  );
}
