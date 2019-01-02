import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees/employees.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from './employees/employees.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elastic-ui';
  options: Employee[] = [];
  employments: Employee[] = [];
  loading = false;

  searchForm: FormGroup;
  /**
   *
   */
  constructor(
    private employeesService: EmployeesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ''
    });

    this.searchForm
      .get('name')
      .valueChanges.pipe(
        debounceTime(500),
        switchMap(value => {
          if (typeof value === 'string') {
            return this.employeesService.searchByName(value);
          }
          return of([]);
        })
      )
      .subscribe(data => {
        this.options = data as Employee[];
      });
  }

  selectedUserFn(user: any): string {
    if (user) {
      return user.first_name + ' ' + user.last_name;
    }
    return 'None selected';
  }

  loadEmploymentHistory(user: Employee) {
    this.loading = true;
    this.employeesService.getEmployments(user.emp_no).subscribe(data => {
      this.employments = data;
      this.loading = false;
    });
  }

  getTopHighestSalaries() {
    this.loading = true;
    this.employeesService
      .getTopHighestSalaries()
      .pipe(
        switchMap(results => {
          return this.employeesService.getEmployeesById(results);
        })
      )
      .subscribe(data => {
        this.loading = false;
        this.employments = data;
      });
  }
}
