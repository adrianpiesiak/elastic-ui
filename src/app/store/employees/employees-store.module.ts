import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { employeesReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('employees', employeesReducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: []
})
export class EmployeesStoreModule {}
