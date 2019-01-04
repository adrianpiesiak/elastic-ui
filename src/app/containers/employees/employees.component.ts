import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employees/employees.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './../../store/employees/reducer';
import * as Actions from './../../store/employees/actions';
import {
  selectSuggestions,
  selectEmployments,
  selectEmploymentsLoading,
  selectPhrase
} from 'src/app/store/employees/selectors';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  options$: Observable<Employee[]>;
  employments$: Observable<any>;
  // employments$: Observable<Employee[]>;
  employmentsLoading$: Observable<boolean>;
  searchPhrase = '';

  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.store.select(selectPhrase).subscribe(value => {
      this.searchPhrase = value;
      console.log(`selecting: ${value}`);
    });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: this.searchPhrase
    });

    this.options$ = this.store.select(selectSuggestions);
    this.options$.subscribe(x => console.log(x));
    this.employments$ = this.store.select(selectEmployments);

    this.employments$.subscribe(x => console.log(x));

    this.employmentsLoading$ = this.store.select(selectEmploymentsLoading);

    this.searchForm
      .get('name')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(value => {
        if (typeof value === 'string') {
          this.store.dispatch(new Actions.EmployeeSearch(value));
        }
      });
  }

  selectedUserFn(user: any): string {
    if (user && typeof user === 'object') {
      return user.first_name + ' ' + user.last_name;
    } else if (user) {
      return user;
    }
    return '';
  }

  loadEmploymentHistory(user: Employee) {
    this.store.dispatch(new Actions.LoadEmploymentHistory(user.emp_no));
  }

  get searchValid(): boolean {
    const user = this.searchForm.get('name').value;
    return user && user.emp_no;
  }

  getEmployeeNameAndSurname(employee: any) {
    if (typeof employee === 'string') {
      return employee;
    }
    const name = employee.first_name + ' ' + employee.last_name;
    const pattern = this.searchForm.get('name').value;
    return name.replace(pattern, `<b>${pattern}</b>`);
  }
}
