import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
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
          default: this.throwError();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }),
    );
  }

  requestChangePassword(email: string): Observable<string> {
    console.log(email);
    console.log('email');

    return this.http.post<AuthenticationResponse>('api/password/reset', email).pipe(
      concatMap((response) => {
        switch (response.status) {
          case 'SUCCESS': return of(response.text);
          case 'FAILED': return throwError(response.text);
          default: return this.throwError();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }),
    );
  }

  validateToken(token):  Observable<string> {
    return this.http.post<AuthenticationResponse>('api/password/validatetoken', token).pipe(
      concatMap((response) => {
        switch (response.status) {
          case 'SUCCESS': return of(response.text);
          case 'FAILED': return throwError(response.text);
          default: return this.throwError();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }),
    );
  }

  updatePassword(token: string, password: string) {
    return this.http.post<AuthenticationResponse>('api/password/reset/confirm', {token, password}).pipe(
      mergeMap((response) => {
        switch (response.status) {
          case 'SUCCESS': return of(response.text);
          case 'FAILED': return throwError(response.text);
          default: return this.throwError();
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }));

    function mergeResponse(response) {
      switch (response.status) {
        case 'SUCCESS':
          return of(response.data);
        case 'FAILED':
          return throwError(response.text);
        default:
          this.throwError();
      }
    }
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

   throwError(): Observable<never> {

    return throwError(' Unexpected error happened');
  }
}

export class AuthenticationResponse {
  status: AuthenticationResponseStatus;
  text: string;
  data: any;
}

export type AuthenticationResponseStatus = 'SUCCESS' | 'WARNING' | 'INFO' | 'FAILED';
