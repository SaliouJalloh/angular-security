import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concatMap, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.AuthenticatedUser$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return next(req);
      }
      return next(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 403:
                router.navigate(['forbidden']);
                break;
              case 401: // handle 401 unauthorized error : try to refresh JWT
                return authService.refreshToken().pipe(
                  concatMap(() => next(req)),
                  catchError((err) => {
                    if (err.status === 403) {
                      authService.logout();
                    }
                    return throwError(() => err);
                  }),
                );
            }
          }
          return throwError(() => err);
        }),
      );
    }),
  );
};
