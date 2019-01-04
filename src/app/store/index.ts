import * as Departments from './departments-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  departments: Departments.State;
}
