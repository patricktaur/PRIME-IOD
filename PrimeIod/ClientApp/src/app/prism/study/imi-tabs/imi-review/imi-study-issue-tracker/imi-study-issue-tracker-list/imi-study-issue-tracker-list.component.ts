import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-imi-study-issue-tracker-list',
  templateUrl: './imi-study-issue-tracker-list.component.html',
  styleUrls: ['./imi-study-issue-tracker-list.component.css']
})
export class ImiStudyIssueTrackerListComponent extends StudyListBase implements OnInit {
  override title = 'Project Issues / Risk Tracker';
  override controllerName = 'TblImistudyIssueTracker';
  messageFieldForDelete = 'issueCategoryPDescription'; //***Todo***
  override keyField = 'recId';

  // hasImiManagerRole: boolean = false;
  mode: string = "";
  isViewMode: boolean = false;

  constructor(public override router: Router, 
    public override actRoute: ActivatedRoute, 
    public override studyEditService: StudyEditService,
    private credentialsService: CredentialsService) {
    super(actRoute, studyEditService);
  }

  // constructor(private imistudyissuetrackerEditService: StudyEditAService) {}

  override ngOnInit(): void {
    super.ngOnInit();
    // this.hasImiManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.IMI_PM);

    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    if (this.mode == 'view') {
      //remove edit - del button columns
      this.isViewMode = true;
      // this.columns.splice(0, 2);
    }
  }

  //***Todo***
  columns: Array<any> = [
    {
      header: 'Issue / Risk Category',
      field: 'issueCategoryPDescription'
    },
    {
      header: 'Issue / Risk Description',
      field: 'issueDescription'
    },
    {
      header: 'Planned Corrective Action (CA) / Mitigation',
      field: 'correctiveActionPlanned',
      width: 50
    },
    {
      header: 'Target Date for CA',
      field: 'targetDateForCa',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Status after CA',
      field: 'statusafterCa'
    }
  ];
}
