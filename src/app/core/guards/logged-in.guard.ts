import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    // If already logged in, redirect to dashboard
    return inject(Router).createUrlTree(['/dashboard']);
  }
  // Not logged in, allow access
  return true;
}; 