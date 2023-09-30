import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { StudyTabsService } from '../../study-tabs.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-cds-view',
  templateUrl: './study-cds-view.component.html',
  styleUrls: ['./study-cds-view.component.css']
})
export class StudyCdsViewComponent {
  studyId: number | any;
  record: any;
  study: any;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  cdsNetworkLocationParId = 6300;

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
    private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.cdsnetworkLocationPidlist();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  getDeliveryTypes() {
    if(this.record.deliveryTypes) {
      return this.record.deliveryTypes.map((item: any) => item.deliveryTypePDescription).join(', ');
    } else {
      return "";
    }
  }

  cdsnetworkLocationPidlist() {
    this.tblParamService.getParams(this.cdsNetworkLocationParId)
    .subscribe((res: any) => {
      var ids = this.record.cdsnetworkLocationPidlist.split(",");
      console.log(`ids = ${ids}`);
      console.log(`res = ${JSON.stringify(res, null, 2)}`);
      var params = res.filter((item: any) => ids.find((x: any) => parseInt(x) == (item.recId)) != null);
      this.record.cdsnetworkLocationPidlist = params.map((item: any) => item.description).join(', ')
      console.log(`params = ${JSON.stringify(params, null, 2)}`);
    })
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
