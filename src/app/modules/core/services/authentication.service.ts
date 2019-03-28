import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user/user.class';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<AuthenticationResponse>('api/login', {
      username,
      password,
    }).pipe(
      mergeMap((response) => {
        switch (response.status) {
          case 'SUCCESS': return of(response.data);
          case 'FAILED': return throwError(response.text);
          default: return throwError('Unexpected error happened');
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }),
    );
  }

  checkAuthStatus(): Observable<User> {
    return this.http.get<User>('api/authentication').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.get('api/logout').pipe(
      map(() => { }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      }),
    );
  }
}

export class AuthenticationResponse {
  status: AuthenticationResponseStatus;
  text: string;
  data: User;
}

export type AuthenticationResponseStatus = 'SUCCESS' | 'WARNING' | 'INFO' | 'FAILED';
