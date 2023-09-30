import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-not-registered',
  templateUrl: './not-registered.component.html',
  styleUrls: ['./not-registered.component.css']
})
export class NotRegisteredComponent implements OnInit {
  msg: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.msg = this.route.snapshot.paramMap.get('error') + '';
  }
}
