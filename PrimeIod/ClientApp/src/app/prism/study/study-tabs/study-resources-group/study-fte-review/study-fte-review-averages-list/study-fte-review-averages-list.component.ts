import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';

import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-fte-review-averages-list',
  templateUrl: './study-fte-review-averages-list.component.html',
  styleUrls: ['./study-fte-review-averages-list.component.css']
})
export class StudyFteReviewAveragesListComponent implements OnInit {
  @Input() records: any;
  @Input() title: string | undefined;

  constructor(public actRoute: ActivatedRoute, public studyEditService: StudyEditService) {}

  ngOnInit(): void {}

  columns: Array<any> = [
    {
      header: 'Month',
      field: 'monthYear',
      type: 'date',
      format: 'MMM-yyyy'
    },

    {
      header: 'Value',
      field: 'value',
      type: 'number',
      format: '2.2-2',
      align: 'center'
    }
  ];
}
