import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-fte-computations',
  templateUrl: './fte-computations.component.html',
  styleUrls: ['./fte-computations.component.css']
})
export class FteComputationsComponent implements OnInit {
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
  }
}
