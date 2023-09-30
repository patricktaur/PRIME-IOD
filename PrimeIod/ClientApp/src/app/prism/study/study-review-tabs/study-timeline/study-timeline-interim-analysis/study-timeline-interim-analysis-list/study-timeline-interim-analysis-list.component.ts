import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-timeline-interim-analysis-list',
  templateUrl: './study-timeline-interim-analysis-list.component.html',
  styleUrls: ['./study-timeline-interim-analysis-list.component.css']
})
export class StudyTimelineInterimAnalysisListComponent implements OnInit {
  isLoading: boolean = false;
  title = ''; //'Interim Analysis';
  controllerName = 'TblStudyTimelineInterimAnalysis';
  messageFieldForDelete = 'analysisInterimDate';
  keyField = 'recid';

  studyId: number = 0;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 10;

  records: any;
  hasDMManagerRole: boolean = false;
  constructor(
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    });
  }

  columns: Array<any> = [
    {
      header: 'Interim Lock',
      field: 'analysisInterimDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'CutOff Date',
      field: 'analysisCutOffDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'SoftLock Date',
      field: 'analysisSoftLockDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'HardLock Date',
      field: 'analysisHardLockDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    }
  ];
}
