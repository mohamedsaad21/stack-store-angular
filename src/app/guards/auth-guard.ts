import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserAuth } from '../services/user-auth';

export const authGuard: CanActivateFn = (route, state) => {
  let _userAuthSer = inject(UserAuth);
  console.log(_userAuthSer.user);
  return _userAuthSer.user.roles.includes('Admin');
};
