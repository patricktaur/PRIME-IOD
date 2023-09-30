import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AppAccessService} from '../app-access.service'
import { FormControl } from '@angular/forms';
interface ComponentData {
  title: string;
  studiesPermitted: string;
  modeName: string;
}

@Component({
  selector: 'app-comp-permissions',
  templateUrl: './comp-permissions.component.html',
  styleUrls: ['./comp-permissions.component.css']
})
export class CompPermissionsComponent implements OnInit, OnChanges {

  @Input('userId') userId!: number | null;
  isLoading = false;

  componentPermissions : any;
  permList : any;
  pageNumber: number = 1;
  pageSize : number = 10;

  filterForm = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private appAccessService : AppAccessService
    ) { }

  ngOnInit() {

    if (this.userId){
      this.loadComponentPermissions();
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadComponentPermissions();
    }
  }


  loadComponentPermissions() {
    this.isLoading = true;
    let userId = this.userId;
    if(!userId) {
      this.permList = [];
      this.isLoading = false;
      return;
    }

    this.appAccessService.getAppComponentPermissions(userId).subscribe(
      (res: any) => {
        this.componentPermissions = res;
        this.permList = this.getcomponentPermissionsList(res);
        this.isLoading = false;
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.pageNumber = pageOptions.page;
    this.pageSize = pageOptions.pageSize;
  }

  getcomponentPermissionsList(permissions : any[]){
    const result: ComponentData[] = [];
    for (const perm of permissions) {
      const title = perm.title;
      const modeName = perm.modeName;
      const studiesPermitted = (perm.studiesPermitted || []).map((sp : any) => sp.studyIconNumber).join(", ");
      result.push({ title, studiesPermitted, modeName });
    }
    return result;
  }

  get filteredRecords() {
    let pageOrStudiesPermitted: any = '';

    pageOrStudiesPermitted = this.filterForm.value?.toLowerCase();
    pageOrStudiesPermitted = pageOrStudiesPermitted.toLowerCase();

    let filter1 = this.permList;
    if (pageOrStudiesPermitted.length > 0) {
      filter1 = null;
      filter1 = this.permList.filter(
        (x: any) =>
          x.title
            ?.toString()
            .toLowerCase()
            .indexOf(pageOrStudiesPermitted) != -1 ||
          x.studiesPermitted
            ?.toString()
            .toLowerCase()
            .indexOf(pageOrStudiesPermitted) != -1
      );
    }

    return filter1;
  }

  /*
: [ { "compCode": "dm-study-members", 
"componentPath": null, "path": null, "alternatePath": null, "status": 1, 
"title": "Home -DM Study Members", "mode": 1, 
"studiesPermitted": null }, { "compCode": "dm-study-list", "componentPath": null, "path": null, "alternatePath": null, "status": 1, "title": "Home -DM studies", "mode": 1, "studiesPermitted": null }, {
  */

  columns: Array<any> = [
    
    {
      header: 'Page',
      field: 'title'
    },
    {
      header: 'Mode',
      field: 'modeName',
      
    },
    {
      header: 'Studies Permitted',
      field: 'studiesPermitted',
      width : 30
    },
    
    
  ];

}
