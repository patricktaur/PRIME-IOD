import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  title: string | undefined;
  error: any;
  status: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.title = params[`title`];
      this.error = params[`error`];
      this.status = params[`status`];
    });
  }

  ngOnInit() {}

  get errorMessage() {
    switch (this.status) {
      case '0':
        return 'Unable to reach the Server.';
        break;
      case '401':
        return 'Access restricted';
        break;
      case '500':
        return 'Internal Server Error';
        break;

      default:
        return 'Error : ' + this.status;
        break;
    }
  }
}
