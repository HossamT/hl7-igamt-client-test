import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {IDocumentCreationWrapper} from '../models/ig/document-creation.interface';
import {MessageEventTreeNode} from '../models/message-event/message-event.class';
import {Message, MessageType} from './../../core/models/message/message.class';

@Injectable({
  providedIn: 'root',
})
export class IgService {

  constructor(private http: HttpClient) { }

  cloneIg(id: string): Observable<Message<string>> {
    return this.http.get<Message<string>>('/api/igdocuments/' + id + '/clone').pipe();
  }

  getMessagesByVersion(hl7Version: string): Observable<MessageEventTreeNode[]> {

    return this.http.get<Message<MessageEventTreeNode[]>>('api/igdocuments/findMessageEvents/' + hl7Version).pipe(
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

  createIntegrationProfile(wrapper: IDocumentCreationWrapper): Observable<Message<string>> {
    return this.http.post<Message<string>>('api/igdocuments/create/', wrapper).pipe(
      mergeMap((response) => {
        switch (response.status) {
          case MessageType.SUCCESS: return of(response);
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
