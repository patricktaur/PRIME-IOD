import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

@Component({
  selector: 'app-user-view-select',
  templateUrl: './user-view-select.component.html',
  styleUrls: ['./user-view-select.component.css']
})
export class UserViewSelectComponent implements OnInit {
  @Input() userId: number = 0;
  @Input() disabled: boolean = false;

  @Output() userSelected = new EventEmitter<any>();
  selectedUserId: number = 0;
  users: any;
  constructor(private tblUserService: TblUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.tblUserService.getUsers().subscribe((users: any) => {
      this.users = users as any[];
      this.selectedUserId = this.userId;
    });
  }

  onUserSelect() {
    this.userSelected.emit(this.selectedUserId);
  }
}
