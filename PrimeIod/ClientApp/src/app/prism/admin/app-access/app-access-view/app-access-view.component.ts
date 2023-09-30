import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

@Component({
  selector: 'app-app-access-view',
  templateUrl: './app-access-view.component.html',
  styleUrls: ['./app-access-view.component.css']
})
export class AppAccessViewComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  users : any; 
  // selectedUser : number | null = null;
  selectedUser : number | undefined;

  loadSubscription: Subscription | undefined;

  constructor(
    private tblUserService: TblUserService,

  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.loading = true;
    this.loadSubscription = this.tblUserService.getUsers().subscribe(
      (res: any) => {
        this.users = res;
        
        
      }
    );
  }

  onFiltersChange() {

  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
  }
}
