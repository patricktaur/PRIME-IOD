import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imi-tracker-item-dashboard',
  templateUrl: './imi-tracker-item-dashboard.component.html',
  styleUrls: ['./imi-tracker-item-dashboard.component.css']
})
export class ImiTrackerItemDashboardComponent implements OnInit {
  @Input() record: any;
  constructor() {}

  ngOnInit(): void {}
}
