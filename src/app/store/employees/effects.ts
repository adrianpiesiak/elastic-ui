import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';
import * as EmpStore from './actions';
import { EmployeesService } from 'src/app/employees/employees.service';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private dataService: EmployeesService
  ) {}

  @Effect()
  searchEmployees$: Observable<Action> = this.actions$.pipe(
    ofType(EmpStore.ActionTypes.employeeSearch),
    mergeMap((action: EmpStore.EmployeeSearch) =>
      this.dataService.searchByName(action.params).pipe(
        map(data => new EmpStore.EmployeeSearchSuccess(data)),
        catchError(error => of(new EmpStore.EmployeeSearchError(error)))
      )
    )
  );

  @Effect()
  loadEmploymentHistory$: Observable<Action> = this.actions$.pipe(
    ofType(EmpStore.ActionTypes.loadEmploymentHistory),
    mergeMap((action: EmpStore.LoadEmploymentHistory) =>
      this.dataService.getEmployments(action.params).pipe(
        delay(500),
        map(data => new EmpStore.LoadEmploymentHistorySuccess(data)),
        catchError(error => of(new EmpStore.LoadEmploymentHistoryError(error)))
      )
    )
  );
}
