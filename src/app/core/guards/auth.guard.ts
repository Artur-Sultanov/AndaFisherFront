import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map, of, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.resolveAccess(route, state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.resolveAccess(childRoute, state.url);
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    const url = `/${[route.path, ...segments.map((segment) => segment.path)]
      .filter(Boolean)
      .join('/')}`;

    return this.resolveAccess(undefined, url, route);
  }

  private resolveAccess(
    route: ActivatedRouteSnapshot | undefined,
    url: string,
    routeConfig?: Route
  ): Observable<boolean | UrlTree> {
    const isPublic = route?.data?.['public'] ?? routeConfig?.data?.['public'];
    if (isPublic) {
      return of(true);
    }

    if (this.authService.isAuthenticated()) {
      return of(true);
    }

    return this.authService.authState$.pipe(
      take(1),
      map((user) => {
        if (user || this.authService.isAuthenticated()) {
          return true;
        }

        return this.router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: url },
        });
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkRoles(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkRoles(route);
  }

  private checkRoles(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data?.['roles'] as string[] | undefined;
    if (!requiredRoles || requiredRoles.length === 0) {
      return of(true);
    }

    return this.authService.authState$.pipe(
      take(1),
      map((user) => {
        const userRoles = (user?.['roles'] as string[] | undefined) ?? [];
        return requiredRoles.every((role) => userRoles.includes(role));
      })
    );
  }
}
