import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyService } from '@app/prism/study/study.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

@Component({
  selector: 'app-study-dashboard-horizontal',
  templateUrl: './study-dashboard-horizontal.component.html',
  styleUrls: ['./study-dashboard-horizontal.component.css']
})
export class StudyDashboardHorizontalComponent implements OnInit, OnDestroy {
  @Input() studyId: number = 0;
  // @Output() studySelected = new EventEmitter<any>();
  // @Output() studyProperties = new EventEmitter<any>();

  selectedStudy: any;
  studyIconNumbers: any;
  study: any;
  // studyId: number;
  studyDashboard: any;
  studyProperties: any;

  studyEditMode: boolean = false;
  lockedMessage = '';

  showDMDashBoard = false;
  showIMIDashBoard = false;
  showCrmDashBoard = false;

  loadStudyIconNumbersSub: Subscription | undefined;
  loadStudyDashboardSub: Subscription | undefined;
  studyEditModeSub: Subscription | undefined;
  studyPropertiesSub: Subscription | undefined;

  // selectedStudyId : any;
  constructor(
    private studyService: StudyService,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyEditService._studyId.subscribe((st: any) => {
      if (!this.studyId) {
        this.studyId = st;
      }
    });

    this.loadStudyIconNumbers();

    this.studyEditModeSub = this.studyEditService.getStudyEditMode().subscribe((st: any) => {
      this.studyEditMode = st;
      if (st == true) {
        this.lockedMessage = 'Locked. Cancel the current edit to unlock.';
      } else {
        this.lockedMessage = '';
      }
    });

    this.studyPropertiesSub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyDashboard = st;
      this.showDMDashBoard = false;
      this.showIMIDashBoard = false;
      this.showCrmDashBoard = false;

      switch (st.studyType) {
        case 'DM':
        case 'DM+IMI':
          this.showDMDashBoard = true;
          break;
        case 'IMI':
          this.showIMIDashBoard = true;
          break;
        case 'CRM':
        case 'DM+CRM':
          this.showCrmDashBoard = true;
          break;
        default:
          this.showDMDashBoard = true;
      }
    });
  }

  loadStudyIconNumbers() {
    // this.isLoading = true;
    this.loadStudyIconNumbersSub = this.studyService.getStudyIconNumbers().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.studyIconNumbers = res;
          if (this.studyId > 0) {
            this.selectedStudy = res?.find((i: any) => i.studyId == this.studyId).studyId;
          } else {
            this.selectedStudy = res[0].studyId;
          }

          this.onStudySelected();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onStudySelected() {
    if (this.selectedStudy) {
      this.studyEditService.setStudyId(this.selectedStudy);
      this.studyEditService.loadStudyProperties();
    }
  }

  column: UIGridColumn = {
    header: 'Project Score',
    field: 'overallProjectScore',
    align: 'center',
    backgroundStyle: 'one-to-five-score',
    width: 10
  };
  ngOnDestroy(): void {
    this.loadStudyIconNumbersSub?.unsubscribe();
    this.loadStudyDashboardSub?.unsubscribe();
    this.studyEditModeSub?.unsubscribe();
    this.studyPropertiesSub?.unsubscribe();
  }
}
