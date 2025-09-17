import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}

interface AuthResponse {
  accessToken?: string;
  user?: User | null;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenStorageKey = 'token';
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;
  private readonly authStateSubject = new BehaviorSubject<User | null>(null);
  readonly authState$ = this.authStateSubject.asObservable();

  private accessToken: string | null = null;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.tokenStorageKey);
    if (storedToken) {
      this.accessToken = storedToken;
    }
  }

  get token(): string | null {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  login(credentials: Record<string, unknown>): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        credentials,
        this.getHttpOptions()
      )
      .pipe(
        tap((response) => {
          this.handleToken(response?.accessToken ?? null);
          this.nextAuthState(response?.user ?? null);
        })
      );
  }

  register(userData: Record<string, unknown>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      userData,
      this.getHttpOptions()
    );
  }

  forgotPassword(payload: Record<string, unknown>): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/forgot-password`,
      payload,
      this.getHttpOptions()
    );
  }

  resetPassword(payload: Record<string, unknown>): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/reset-password`,
      payload,
      this.getHttpOptions()
    );
  }

  refresh(): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/refresh`, {}, this.getHttpOptions())
      .pipe(
        tap((response) => {
          this.handleToken(response?.accessToken ?? null);
          this.nextAuthState(
            response?.user ?? undefined,
            /* emitCurrentWhenUndefined */ true
          );
        })
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, {}, this.getHttpOptions())
      .pipe(finalize(() => this.clearAuth()));
  }

  me(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/me`, this.getHttpOptions())
      .pipe(tap((user) => this.nextAuthState(user)));
  }

  registerUser(userData: Record<string, unknown>): Observable<AuthResponse> {
    return this.register(userData);
  }

  loginUser(credentials: Record<string, unknown>): Observable<AuthResponse> {
    return this.login(credentials);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  private getHttpOptions() {
    return environment.useCredentials ? { withCredentials: true } : {};
  }

  private handleToken(token: string | null): void {
    if (token) {
      this.accessToken = token;
      localStorage.setItem(this.tokenStorageKey, token);
    } else {
      this.clearToken();
    }
  }

  private nextAuthState(
    user: User | null | undefined,
    emitCurrentWhenUndefined = false
  ): void {
    if (user === undefined) {
      if (emitCurrentWhenUndefined) {
        this.authStateSubject.next(this.authStateSubject.value);
      }
      return;
    }

    this.authStateSubject.next(user);
  }

  private clearAuth(): void {
    this.clearToken();
    this.authStateSubject.next(null);
  }

  private clearToken(): void {
    this.accessToken = null;
    localStorage.removeItem(this.tokenStorageKey);
  }
}
