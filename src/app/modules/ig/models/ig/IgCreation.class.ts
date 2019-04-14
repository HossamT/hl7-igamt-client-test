import {EventTreeData} from '../messageEvent/message-event.class';
import {DocumentMetaData} from './DocumentMetaData.class';

export class IgCreationWrapper {
  metadata: DocumentMetaData;
  scope: string;
  msgEvts:  EventTreeData[]
  constructor( metadata: DocumentMetaData,
               scope: string,  msgEvts: EventTreeData[]) {
    this.scope = scope;
    this.metadata = metadata;
    this.msgEvts = msgEvts;
  }
}
