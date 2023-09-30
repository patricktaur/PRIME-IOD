import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-timeline-interim-locks-list',
  templateUrl: './study-timeline-interim-locks-list.component.html',
  styleUrls: ['./study-timeline-interim-locks-list.component.css']
})
export class StudyTimelineInterimLocksListComponent implements OnInit {
  isLoading: boolean = false;
  title = ''; //'Interim Locks';
  controllerName = 'TblStudyTimelineInterimLocks';
  messageFieldForDelete = 'interimDate';
  keyField = 'recid';

  studyId: number = 0;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 10;

  records: any;
  // hasDMManagerRole: boolean = false;

  mode: string = "";
  isViewMode: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
      let routeParent: any = this.actRoute.parent;
      this.mode = routeParent.snapshot.data['mode'];

      if (this.mode == 'view') {
        //remove edit - del button columns
        this.isViewMode = true;
        // this.columns.splice(0, 2);
      }
    });
  }

  columns: Array<any> = [
    {
      header: 'Interim Lock',
      field: 'interimDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'CutOff Date',
      field: 'cutOffDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'SoftLock Date',
      field: 'softLockDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'HardLock Date',
      field: 'hardLockDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    }
  ];
}
