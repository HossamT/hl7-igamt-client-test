export class MessageEventTreeNode {
  constructor( readonly  data: MessageEventTreeData, readonly children: EventTreeNode[]) {}
}
export enum EventTypes {
  Event = 'EVENT',
  Events = ' EVENTS',
}

export class MessageEventTreeData {
  type = EventTypes.Events;
  constructor(readonly  id: string, readonly name: string, readonly description: string,
              readonly hl7Version: string) {
  }
}

export class EventTreeData {
  type = EventTypes.Event;
  constructor(readonly  id: string, readonly name: string, readonly parentStructId: string,
              readonly hl7Version: string) {
  }
}

export class EventTreeNode {
  constructor( readonly  data: EventTreeData, name: string) {}

}
