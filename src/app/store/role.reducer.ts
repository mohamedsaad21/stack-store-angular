// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { clearRoles, setRoles } from './role.action';

export interface AuthState {
  roles: string[];
}

export const initialState: AuthState = {
  roles: []
};

export const roleReducer = createReducer(
  initialState,
  on(setRoles, (state, { roles }) => ({
    ...state,
    roles
  })),
  on(clearRoles, (state) => ({
    ...state,
    roles: []
  }))
);
