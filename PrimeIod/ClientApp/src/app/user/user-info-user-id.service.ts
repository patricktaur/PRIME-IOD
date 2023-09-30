import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoUserIdService {
 
  private _userId = new BehaviorSubject<number | null>(null);
  userId$ = this._userId.asObservable();

  updateUserId(userId: number) {
    console.log("userId in UserInfoUserIdService : " + userId);
    this._userId.next(userId);
  }

}
