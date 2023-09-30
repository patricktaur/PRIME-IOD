import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyCdsRequestIdService {
  private requestId = new BehaviorSubject(0);
  sharedId = this.requestId.asObservable();
  constructor() {}

  setId(id: number) {
    this.requestId.next(id);
  }
}
