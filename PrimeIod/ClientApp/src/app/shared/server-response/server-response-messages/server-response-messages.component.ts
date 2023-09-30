import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-response-messages',
  templateUrl: './server-response-messages.component.html',
  styleUrls: ['./server-response-messages.component.css']
})
export class ServerResponseMessagesComponent implements OnInit {
  @Input() serverResponseMessages: any;
  @Input() messageBoxHeight: number = 40;

  minHeight = 100;
  // @Input() serviceInstance : string;
  constructor() {}

  ngOnInit(): void {
    this.messageBoxHeight = this.messageBoxHeight < this.minHeight ? this.minHeight : this.messageBoxHeight;
  }

  get sortedMessages() {
    //var res = new Date(dat1).getTime() > new Date(dat2).getTime()
    const sortedDesc = this.serverResponseMessages.sort(
      (objA: any, objB: any) => new Date(objB.exectuedAt).getTime() - new Date(objA.exectuedAt).getTime()
    );
    return sortedDesc;
  }
  //style="max-height: {{messageBoxHeight}}px; overflow:hidden;" *ngIf="serverResponseMessages.length > 0"
  // style={"maxHeight": "400px", "overflow": "scroll"
  get boxStyle() {
    return {
      'max-height': this.messageBoxHeight + 'px',
      overflow: 'scroll'
    };
  }

  bootstrapAlertTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

  getAlertClass(message: any) {
    let type = '';
    type =
      message.type && message.type > 0 && message.type < 6
        ? this.bootstrapAlertTypes[message.type]
        : this.bootstrapAlertTypes[0];
    return 'alert alert-' + type;
  }

  clearClicked() {
    this.serverResponseMessages.length = 0;
  }
}
