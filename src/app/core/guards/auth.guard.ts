import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Optionally, add token validation/expiration check here
    return true;
  }
  // Not authenticated, redirect to login
  return inject(Router).createUrlTree(['/auth/login']);
};
