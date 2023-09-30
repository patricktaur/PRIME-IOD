import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit{
  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    
  }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

  
}
