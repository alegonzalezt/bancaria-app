import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  return localStorage.getItem('Token')
    ? true
    : router.navigate(['']);
};
