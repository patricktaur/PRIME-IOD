import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAccessUserIdService {
 
  private _userId = new BehaviorSubject<number | null>(null);
  userId$ = this._userId.asObservable();

  updateUserId(userId: number) {
    this._userId.next(userId);
  }

}
