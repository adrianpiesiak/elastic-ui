import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/employees/employees.model';

@Component({
  selector: 'app-employment-list',
  templateUrl: './employment-list.component.html',
  styleUrls: ['./employment-list.component.scss']
})
export class EmploymentListComponent implements OnInit {
  @Input() employments: Employee[];
  columnsToDisplay: string[] = ['department', 'dateFrom', 'dateTo', 'salary'];
  constructor() {}

  ngOnInit() {}
}
