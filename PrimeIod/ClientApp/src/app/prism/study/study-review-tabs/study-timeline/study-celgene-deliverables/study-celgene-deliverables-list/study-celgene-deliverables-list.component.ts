import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-celgene-deliverables-list',
  templateUrl: './study-celgene-deliverables-list.component.html',
  styleUrls: ['./study-celgene-deliverables-list.component.css']
})
export class StudyCelgeneDeliverablesListComponent implements OnInit {
  isLoading: boolean = false;
  title = 'Celgene Deliverables';
  controllerName = 'TblStudyCelgeneDeliverables'; //***Todo***
  messageFieldForDelete = 'deliverableDate'; //***Todo***
  keyField = 'recId';

  studyId: number = 0;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 10;

  records: any;
  mode: string = "";
  isViewMode: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private credentialsService: CredentialsService,
    private studycelgenedeliverablesEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studycelgenedeliverablesEditService._studyId.subscribe((st: any) => {
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

  //***Todo***
  columns: Array<any> = [
    {
      header: 'Delivery Date',
      field: 'deliverableDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Delivlery Type',
      field: 'deliverableTypePDescription'
    },
    {
      header: 'Delivlery Name',
      field: 'deliverableName'
    },
    {
      header: 'Description',
      field: 'deliverableDescription'
    },

    {
      header: 'Delivered By', //Delivery Name ??
      field: 'deliveredByPDisplayName'
    },
    {
      header: 'Sponsor Recipient', //Delivery Name ??
      field: 'sponsorRecipient'
    },

    {
      header: 'Outcome',
      field: 'outcomePDescription' //outcomePDescription
    },
    {
      header: 'Quality Deliverable',
      field: 'qualityDeliverable'
    },

    {
      header: 'Company Responsible for Failure of  Quality Deliverable',
      field: 'failureQualityDeliverableNavigationDescription'
    },
    {
      header: 'Primary Failure Criteria',
      field: 'primaryFailureCriteriaNavigationDescription'
    },
    {
      header: 'Functional Area Leadership Alignment',
      field: 'funAreaLeadershipAlignment'
    },
    {
      header: 'Comment',
      field: 'comment',
      width: 50
    }
  ];
}
