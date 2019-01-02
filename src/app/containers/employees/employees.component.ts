import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employees/employees.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/employees/employees.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  options: Employee[] = [];
  employments: Employee[] = [];
  loading = false;

  searchForm: FormGroup;
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

  get searchValid(): boolean {
    const user = this.searchForm.get('name').value;
    return user && user.emp_no;
  }

  getEmployeeNameAndSurname(employee: any) {
    const name = employee.first_name + ' ' + employee.last_name;
    const pattern = this.searchForm.get('name').value;
    return name.replace(pattern, `<b>${pattern}</b>`);
  }
}
