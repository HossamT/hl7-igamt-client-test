import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventTreeData} from '../../../ig/models/messageEvent/message-event.class';

@Component({
  selector: 'app-select-messages',
  templateUrl: './select-messages.component.html',
  styleUrls: ['./select-messages.component.scss'],
})
export class SelectMessagesComponent implements OnInit {

  @Input()
  table: any;

  selectedEvents:  EventTreeData[] = [];
  @Output() selected = new EventEmitter<string>();
  @Output() messages = new EventEmitter<EventTreeData[]>();

  selectedVersion: string;

  @Input()
  hl7Versions: string[] = [];

  constructor() {}
  ngOnInit() {
  }

  isSelected(event) {
    for ( const item of this.selectedEvents) {
      if ( item.id === event.id && item.name === event.name) {
        return true;
      }
    }
    return false;
  }
  toggleEvent(event) {

    for ( let i = 0; i < this.selectedEvents.length; i++) {

      if ( this.selectedEvents[i].id === event.id && this.selectedEvents[i].name === event.name) {
        this.selectedEvents.splice(i, 1);
        return;
      }
    }
    this.selectedEvents.push(event);
    this.messages.emit(this.selectedEvents);

  }

  unselect(selected: any) {
    console.log(selected);

    const index = this.selectedEvents.indexOf(selected);
    if (index > -1) {
      this.selectedEvents.splice(index, 1);
      this.messages.emit(this.selectedEvents);
    }
  }

  select($event: any) {
    this.selectedVersion = $event;
    this.selected.emit($event);
  }
}
