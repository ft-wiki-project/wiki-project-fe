import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.admin === 'true') {
    return true;
  }
  
  alert('You must be an admin to view that page');
  router.navigate(['/announcements']);
  return false;
};