import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { jwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  private _token: string | null = null;
  nextRefreshToken: string | null = null;

  readonly refresh = jasmine
    .createSpy('refresh')
    .and.callFake(() => {
      this._token = this.nextRefreshToken;
      return of({ accessToken: this.nextRefreshToken ?? undefined });
    });

  readonly logout = jasmine
    .createSpy('logout')
    .and.returnValue(of(void 0));

  get token(): string | null {
    return this._token;
  }

  setToken(token: string | null): void {
    this._token = token;
  }
}

describe('jwtInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: MockAuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = new MockAuthService();
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should append the bearer token for API requests', () => {
    authService.setToken('token-123');

    let responseBody: string | undefined;
    http.get<string>('/api/data').subscribe((response) => {
      responseBody = response;
    });

    const request = httpMock.expectOne('/api/data');
    expect(request.request.headers.get('Authorization')).toBe(
      'Bearer token-123'
    );
    request.flush('success');

    expect(responseBody).toBe('success');
    expect(authService.refresh).not.toHaveBeenCalled();
  });

  it('should refresh the token and retry the request once', () => {
    authService.setToken('expired-token');
    authService.nextRefreshToken = 'new-token';

    let responseBody: string | undefined;
    http.get<string>('/api/data').subscribe((response) => {
      responseBody = response;
    });

    const initialRequest = httpMock.expectOne('/api/data');
    expect(initialRequest.request.headers.get('Authorization')).toBe(
      'Bearer expired-token'
    );
    initialRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    expect(authService.refresh).toHaveBeenCalledTimes(1);

    const retriedRequest = httpMock.expectOne('/api/data');
    expect(retriedRequest.request.headers.get('Authorization')).toBe(
      'Bearer new-token'
    );
    retriedRequest.flush('final-response');

    expect(responseBody).toBe('final-response');
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should logout and redirect when the retried request is unauthorized', (done) => {
    authService.setToken('expired-token');
    authService.nextRefreshToken = 'new-token';

    http.get<string>('/api/data').subscribe({
      next: () => {
        fail('Request should not succeed after repeated 401 responses');
      },
      error: (error) => {
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
        done();
      },
    });

    const initialRequest = httpMock.expectOne('/api/data');
    expect(initialRequest.request.headers.get('Authorization')).toBe(
      'Bearer expired-token'
    );
    initialRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    const retriedRequest = httpMock.expectOne('/api/data');
    expect(retriedRequest.request.headers.get('Authorization')).toBe(
      'Bearer new-token'
    );
    retriedRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  });
});
