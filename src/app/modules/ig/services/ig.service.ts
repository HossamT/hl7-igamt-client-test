import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './../../core/models/message/message.class';

@Injectable({
  providedIn: 'root',
})
export class IgService {

  constructor(private http: HttpClient) { }

  cloneIg(id: string): Observable<Message<string>> {
    return this.http.get<any>('/api/igdocuments/' + id + '/clone');
  }
}
