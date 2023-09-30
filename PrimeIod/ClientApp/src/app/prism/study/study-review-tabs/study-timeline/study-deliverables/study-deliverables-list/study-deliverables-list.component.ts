import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-deliverables-list',
  templateUrl: './study-deliverables-list.component.html',
  styleUrls: ['./study-deliverables-list.component.css']
})
export class StudyDeliverablesListComponent implements OnInit {
  isLoading: boolean = false;
  title = ''; //'Study Deliverables';
  controllerName = 'TblStudyDeliverables';
  messageFieldForDelete = 'deliverableDate';
  keyField = 'recId';

  studyId: number = 0;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 10;

  records: any;
  // hasDMManagerRole: boolean = false;

  mode: string = "";
  isViewMode: boolean = false;

  constructor(
    public actRoute: ActivatedRoute, 
    public router: Router,
    private credentialsService: CredentialsService,
    private studydeliverablesEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studydeliverablesEditService._studyId.subscribe((st: any) => {
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
      header: 'Delivery Date',
      field: 'deliverableDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Delivery Type',
      field: 'deliverableTypePDescription'
    },
    {
      header: 'Delivery Name',
      field: 'deliverableName'
    },
    {
      header: 'Outcome',
      field: 'outcomePDescription' //outcomePDescription
    },
    {
      header: 'Comment',
      field: 'comment',
      width: 50
    }
  ];
}
