import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../store/role.reducer';
import { Store } from '@ngrx/store';
import { selectRoles } from '../store/role.selector';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let store = inject(Store<{auth:AuthState}>);
  return store.select(selectRoles).pipe(map(roles => roles.includes('Admin')));
};
