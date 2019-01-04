import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from 'src/app/employees/employees.service';
import { DepartmentListComponent } from 'src/app/components/department-list/department-list.component';

import { Store, select } from '@ngrx/store';
import * as DepartmentStore from './../../store/departments-store';
import {
  selectDepartmentsResults,
  selectDetails,
  selectDepartmentsLoading,
  selectDetailsLoading,
  selectDepartmentsLoaded
} from './../../store/departments-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(DepartmentListComponent)
  private deptsList: DepartmentListComponent;
  departments$: Observable<any>;
  departmentsLoaded$: Observable<boolean>;
  departentsLoading$: Observable<boolean>;
  detailsLoading$: Observable<boolean>;
  employees$: Observable<any>;
  constructor(
    private dataService: EmployeesService,
    private store: Store<DepartmentStore.State>
  ) {}

  ngOnInit() {
    this.departments$ = this.store.select(selectDepartmentsResults);
    this.departentsLoading$ = this.store.select(selectDepartmentsLoading);
    this.detailsLoading$ = this.store.select(selectDetailsLoading);
    this.employees$ = this.store.select(selectDetails);

    this.departmentsLoaded$ = this.store.select(selectDepartmentsLoaded);
    this.departmentsLoaded$.subscribe(x => {
      if (!x) {
        this.store.dispatch(new DepartmentStore.LoadDepartmentsData());
      }
    });

    // this.dataService
    //   .getDepartmentsAgregatedData()
    //   .subscribe(data => (this.departments = data));

    this.deptsList.departmentSelected.subscribe(value => {
      this.store.dispatch(new DepartmentStore.LoadDetailsData(value));
    });

    // this.deptsList.departmentSelected.subscribe(value => {
    //   this.dataService.searchByDepartment(value).subscribe(result => {
    //     this.employees = result;
    //   });
    // });
  }
}
