import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {Message, MessageType} from '../../core/models/message/message.class';
import {Config} from '../models/config.class';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Config> {
    return this.http.get<Message<Config>>('api/config/').pipe(
      mergeMap((response) => {
        switch (response.status) {
          case MessageType.SUCCESS: return of(response.data);
          case MessageType.FAILED : return throwError(response.text);
          default: return throwError(' Unexpected error happened');
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error ? err.error.text ? err.error.text : err.message : err.message;
        return throwError(errorMessage);
      }),
    );
  }
}
