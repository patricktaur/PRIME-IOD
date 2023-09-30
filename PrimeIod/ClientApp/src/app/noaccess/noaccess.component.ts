import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-noaccess',
  templateUrl: './noaccess.component.html',
  styleUrls: ['./noaccess.component.css']
})
export class NoaccessComponent implements OnInit {
  message: string | undefined;
  constructor(private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.params.subscribe((params: any) => {
    //   this.message = params[`message`];
    // });
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const msg = params['message'] ;
      if (msg) {
        this.message = msg;// params['message'];
      } else {
        this.message = 'You do not have access to this page';
      }
    });
  }

  ngOnInit() {}
}

/*
We apologize, but it appears that you do not currently have the necessary permissions to access this page. If you believe this to be an error, please contact our support team for assistance. Thank you.
*/
