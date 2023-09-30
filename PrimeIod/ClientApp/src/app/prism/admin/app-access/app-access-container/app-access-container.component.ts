import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import {AppAccessUserIdService} from '../app-access-user-id.service'

import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

@Component({
  selector: 'app-app-access-container',
  templateUrl: './app-access-container.component.html',
  styleUrls: ['./app-access-container.component.css']
})
export class AppAccessContainerComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  users : any; 
  selectedUser : any = undefined;
  userId : number = 0;

  loadSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apAccessUserIdService : AppAccessUserIdService,
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
        // this.selectedUser = this.users[0].value;
      }
    );
  }
  onFiltersChange() {
    this.apAccessUserIdService.updateUserId(this.selectedUser);
    // this.router.navigate(['component-permission', this.selectedUser], { relativeTo: this.actRoute.parent });

  }

  ngOnDestroy(): void {
    
    this.loadSubscription?.unsubscribe();
    
  }
}
