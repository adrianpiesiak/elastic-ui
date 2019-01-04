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
  MatGridListModule,
  MatCardModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { EmployeesStoreModule } from './store/employees/employees-store.module';

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
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      departments: DepartmentStore.departmentsContainerReducer
    }),
    EffectsModule.forRoot([DepartmentStore.Effects]),
    EmployeesStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
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
