import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './role.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('roles');

export const selectRoles = createSelector(
    
  selectAuthState,
  state => {
     console.log('STATE:', state);
    return state?.roles ?? [];
  }
);