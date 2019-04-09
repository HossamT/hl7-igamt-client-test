import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, concatMap, mergeMap} from 'rxjs/operators';
import {RegistrationRequest} from '../../../root-store/registration/registration.actions';
import {RegistrationObject} from '../models/user/registration-object.class';
import {User} from '../models/user/user.class';
import {AuthenticationResponse} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  constructor(private http: HttpClient) {}

  register(registrationRequest: RegistrationObject): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('api/register', registrationRequest).pipe(
      concatMap((response) => {
        switch (response.status) {
          case 'SUCCESS': return of(response);
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
}
