export class Message {
  constructor(status: MessageType, text: string, data: any) {
    this._status = status;
    this._text = text;
    this._data = data;
  }
  private _status: MessageType;
  private _text: string;
  private _data: any;

  get status(): MessageType {
    return this._status;
  }

  set status(value: MessageType) {
    this._status = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }
}
export enum MessageType {
  SUCCESS, WARNING, INFO, FAILED,

}
