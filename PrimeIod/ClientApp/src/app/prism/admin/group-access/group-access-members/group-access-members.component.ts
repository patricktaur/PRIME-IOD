import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppAccessGroupMembersService } from '../group-access-members-service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-access-members',
  templateUrl: './group-access-members.component.html',
  styleUrls: ['./group-access-members.component.css']
})
export class GroupAccessMembersComponent implements OnInit, OnDestroy {
  loading = false;

  pageNumberA = 1;
  pageNumberB = 1;

  pageSize = 10;

  // list1: any[] = [];
  // list2: any[] = [];

  groupId: number = 0;
  groupName = '';

  users: any[] = [];
  groupMembers: any[] = [];

  filterUserName: string = "";
  filterMemberName: string = "";

  loadUsersSub: Subscription | undefined;
  loadGroupMembersSub: Subscription | undefined;
  groupMembersUpateSub: Subscription | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private appAccessGroupMembersService: AppAccessGroupMembersService
  ) {}

  ngOnInit(): void {
    let id: any = this.route.snapshot.queryParamMap.get('id');
    this.groupId = +id;
    let groupName: any = this.route.snapshot.queryParamMap.get('groupName');
    this.groupName = groupName;
    this.loadGroupMembers(this.groupId);
    this.loadUsers();
  }

  loadUsers() {
    this.loadUsersSub = this.appAccessGroupMembersService.getUsers().subscribe((data: any) => {
      // this.list1 = data;
      this.users = data;
    });
  }

  get filteredUserRecords() {
    let filter1: any = this.availableMembers;
    if (this.filterUserName && this.filterUserName.length > 0) {
      let filterValueLower = this.filterUserName.toLowerCase();

      filter1 = null;
      // filter1 = this.notMembers.filter((n: any) => filterValueLower.indexOf(n.value.toLowerCase()) != -1);
      filter1 = this.availableMembers.filter((n: any) => n.value.toLowerCase().indexOf(filterValueLower) != -1);
    }
    return filter1;
  }

  loadGroupMembers(groupId: number) {
    this.loadGroupMembersSub = this.appAccessGroupMembersService.getGroupMembers(groupId).subscribe((data: any) => {
      this.groupMembers = data;
    });
  }

  get filteredMemberRecords() {
    let filter1: any = this.groupMembers;
    if (this.filterMemberName && this.filterMemberName.length > 0) {
      let filterValueLower = this.filterMemberName.toLowerCase();

      filter1 = null;
      // filter1 = this.notMembers.filter((n: any) => filterValueLower.indexOf(n.value.toLowerCase()) != -1);
      filter1 = this.groupMembers.filter((n: any) => n.value.toLowerCase().indexOf(filterValueLower) != -1);
    }
    return filter1;
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'add':
        this.add(id);
        break;
      case 'remove':
        this.remove(id);
        break;
      default:
        break;
    }
  }

  // get notMembers() - not working ?
  get availableMembers() {
    // return this.users.filter(item1 => !this.groupMembers.find(item2 => item2.id === item1.id));
    return this.users.filter(item1 => !this.groupMembers.some(item2 => item2.id === item1.id));
  }

  // get filteredMemberRecords() {
  //   let filter1 = this.notMembers;
  //   if (this.filterUserName && this.filterUserName.length > 0) {
  //     let filterValueLower = this.filterUserName.toLowerCase();

  //     filter1 = null;
  //     // filter1 = this.notMembers.filter((n: any) => filterValueLower.indexOf(n.value.toLowerCase()) != -1);
  //     filter1 = this.notMembers.filter((n: any) => n.value.toLowerCase().indexOf(filterValueLower) != -1);
  //   }
  //   return filter1;
  // }

  add(id: any) {
    let item = this.users.find(item => item.id === id);
    this.groupMembers.push(item);
  }

  remove(itemId: number) {
    let indexToRemove = -1;
    for (let i = 0; i < this.groupMembers.length; i++) {
      if (this.groupMembers[i].id === itemId) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove !== -1) {
      this.groupMembers.splice(indexToRemove, 1);
    }
  }

  groupMembersUpate() {
    this.loading = true;

    this.groupMembersUpateSub = this.appAccessGroupMembersService
      .updateGroupMembers(this.groupId, this.groupMembers)
      .subscribe(
        res => {
          this.location.back();
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(`error while editing = ${err}`);
        }
      );
  }

  // moveToList2(item: any) {
  //   this.list2.push(item);
  //   this.list1 = this.list1.filter(x => x.id !== item.id);
  // }

  // moveToList1(item: any) {
  //   this.list1.push(item);
  //   this.list2 = this.list2.filter(x => x.id !== item.id);
  // }

  columnsA: Array<any> = [
    {
      header: 'Application User',
      field: 'value'
    },
    {
      header: 'Add',
      // field: 'id',
      actionType: 'raise-event',
      linkText: 'Add >',
      actionCommand: 'add',
      actionField: 'id'
      // actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    }
  ];

  columnsB: Array<any> = [
    {
      header: 'Remove',
      // field: 'id',
      actionType: 'raise-event',
      linkText: '< Remove',
      actionCommand: 'remove',
      actionField: 'id'
      // actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },

    {
      header: 'Application User',
      field: 'value'
    }
  ];

  ngOnDestroy(): void {
    this.loadUsersSub?.unsubscribe();
    this.groupMembersUpateSub?.unsubscribe();
    this.loadGroupMembersSub?.unsubscribe();
  }
}
