import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  }
  
  // Redirect to login with message
  router.navigate([''], { 
    queryParams: { redirectMessage: 'You must be logged in to view that page' }
  });
  return false;
};