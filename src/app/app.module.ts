import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatAutocompleteModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatGridListModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import * as DepartmentStore from './store/departments-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesService } from './employees/employees.service';
import { CorsHeaderInterceptor } from './interceptors/cors-header.interceptor';
import { EmploymentListComponent } from './components/employment-list/employment-list.component';
import { containers } from './containers';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    EmploymentListComponent,
    ...containers,
    DepartmentListComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ departments: DepartmentStore.departmentsReducer }),
    EffectsModule.forRoot([DepartmentStore.Effects])
  ],
  providers: [
    EmployeesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
