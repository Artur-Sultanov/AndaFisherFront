import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  finalize,
  of,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

const RETRY_ATTEMPTED = new HttpContextToken<boolean>(() => false);
const API_PREFIX = environment.apiBaseUrl.endsWith('/')
  ? environment.apiBaseUrl.slice(0, -1)
  : environment.apiBaseUrl;
let refreshRequest$: Observable<string | null> | null = null;

const getRequestPath = (request: HttpRequest<unknown>): string => {
  if (request.url.startsWith('http')) {
    try {
      return new URL(request.url).pathname;
    } catch {
      return request.url;
    }
  }

  return request.url;
};

const isApiRequest = (request: HttpRequest<unknown>): boolean =>
  getRequestPath(request).startsWith(API_PREFIX);

const isAuthRefreshRequest = (request: HttpRequest<unknown>): boolean =>
  getRequestPath(request).startsWith(`${API_PREFIX}/auth/refresh`);

const addAuthorizationHeader = (
  request: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> =>
  request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

const getRefreshObservable = (authService: AuthService): Observable<string | null> => {
  if (!refreshRequest$) {
    refreshRequest$ = authService.refresh().pipe(
      switchMap((response) => of(response?.accessToken ?? authService.token)),
      shareReplay({ bufferSize: 1, refCount: true }),
      finalize(() => {
        refreshRequest$ = null;
      })
    );
  }

  return refreshRequest$;
};

const logoutAndRedirect = (
  error: HttpErrorResponse,
  authService: AuthService,
  router: Router
) =>
  authService
    .logout()
    .pipe(
      catchError(() => of(void 0)),
      switchMap(() => {
        void router.navigateByUrl('/login');
        return throwError(() => error);
      })
    );

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isApiRequest(req)) {
    return next(req);
  }

  let authRequest = req;
  const token = authService.token;

  if (token) {
    authRequest = addAuthorizationHeader(authRequest, token);
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRefreshRequest(authRequest)) {
        return throwError(() => error);
      }

      if (authRequest.context.get(RETRY_ATTEMPTED)) {
        return logoutAndRedirect(error, authService, router);
      }

      return getRefreshObservable(authService).pipe(
        switchMap((newToken) => {
          if (!newToken) {
            return logoutAndRedirect(error, authService, router);
          }

          const retryRequest = addAuthorizationHeader(
            authRequest.clone({
              context: authRequest.context.set(RETRY_ATTEMPTED, true),
            }),
            newToken
          );

          return next(retryRequest);
        }),
        catchError(() => logoutAndRedirect(error, authService, router))
      );
    })
  );
};
