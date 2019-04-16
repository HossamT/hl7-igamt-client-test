import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {LoadConfig} from '../../../../root-store/config/config.actions';
import * as config from '../../../../root-store/config/config.reducer';
import {CreateIg, LoadMessageEvents} from '../../../../root-store/create-ig/create-ig.actions';
import * as fromCreateIg from '../../../../root-store/create-ig/create-ig.reducer';
import {Scope} from '../../../shared/constants/scope.enum';
import {MessageEventTreeNode} from '../../models/message-event/message-event.class';
import {IDocumentCreationWrapper} from '../../models/ig/document-creation.interface';

@Component({
  selector: 'app-create-ig',
  templateUrl: './create-ig.component.html',
  styleUrls: ['./create-ig.component.scss'],
})
export class CreateIGComponent implements OnInit {

  table$: Observable<MessageEventTreeNode[]>;
  hl7Version$: Observable<string[]>;
  creationForm: FormGroup;

  model: IDocumentCreationWrapper = {
    metadata: {title: ''}
    , scope: Scope.USER,
    msgEvts: [],
  };

  constructor(private store: Store<any>) {
    this.store.dispatch(new LoadConfig());
    this.table$ = this.store.select(fromCreateIg.getLoadedMessageEventsState);
    this.hl7Version$ = this.store.select(config.getHl7Versions);
    this.creationForm = new FormGroup({
      title: new FormControl(this.model.metadata.title, [Validators.required] ),
    });
  }

  ngOnInit() {
  }

  getVersion($event: string) {
    this.store.dispatch(new LoadMessageEvents($event));
  }

  setSelected($event) {
    this.model.msgEvts = $event;
    console.log(this.model);
  }

  submit() {
    this.store.dispatch(new CreateIg(this.model));
  }
}
