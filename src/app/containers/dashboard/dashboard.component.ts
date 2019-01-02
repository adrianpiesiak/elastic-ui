import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  tiles = [
    {
      icon: 'accessibility_new',
      title: 'Employees',
      link: '/employees'
    },
    {
      icon: 'account_balance',
      title: 'Departments',
      link: '/departments'
    },
    {
      icon: 'date_range',
      title: 'Date range'
    }
  ];

  ngOnInit() {}

  tileClicked(tile: any) {
    if (tile && tile.link) {
      this.router.navigate([tile.link]);
    }
  }
}
