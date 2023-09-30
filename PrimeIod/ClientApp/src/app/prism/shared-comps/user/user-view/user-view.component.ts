import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '@app/shared/http.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnChanges {
  @Input() userId: number = 0;
  record: any;
  controllerName = 'TblUser';
  actionName = 'user-view-dto';
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userId > 0) {
      this.loadUserRecord(this.userId, this.controllerName, this.actionName);
    }
  }

  loadUserRecord(userId: number, controllerName: string, actionName: string) {
    this.httpService.getRecord(userId, controllerName, actionName).subscribe((user: any) => {
      this.record = user;
    });
  }
}
