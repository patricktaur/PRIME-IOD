import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class ServerResponseService {
  //  private dataSubject : BehaviorSubject<any> = new BehaviorSubject<any>({});

  serverResponses: any = [];
  constructor() {}

  addServerMessages(serverResponse: any) {
    // this.dataSubject.next(... serverResponse)
    if (serverResponse) {
      this.serverResponses.push(...serverResponse);
    }
  }
}
