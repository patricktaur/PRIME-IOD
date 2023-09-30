import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-study-containter',
  templateUrl: './crm-study-containter.component.html',
  styleUrls: ['./crm-study-containter.component.css']
})
export class CrmStudyContainterComponent implements OnInit {
  rootPath = 'requests/crm-study-request';

  constructor() { }

  ngOnInit(): void {
  }

}
