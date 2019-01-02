import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  @Input() departments: any[];
  @Output() departmentSelected = new EventEmitter<string>();
  columnsToDisplay: string[] = [
    'department',
    'maxSalary',
    'minSalary',
    'avgSalary'
  ];
  constructor() {
    console.log(this.departments);
  }

  ngOnInit() {
    console.log(this.departments);
  }

  onDepartmentSelect(department: any) {
    this.departments.forEach(d => (d.selected = false));
    (department || {}).selected = true;
    this.departmentSelected.emit(department.dept_name);
  }
}
