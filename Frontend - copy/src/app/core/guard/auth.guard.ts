import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    alert('You must be logged in to access this page!');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
