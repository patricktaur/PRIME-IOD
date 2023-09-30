import { Component, OnInit, TemplateRef } from '@angular/core';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-update-sw-toast',
  templateUrl: './update-sw-toast.component.html',
  styleUrls: ['./update-sw-toast.component.css']
})
export class UpdateSwToastComponent implements OnInit {
  constructor(public updateService: UpdateService) {}

  ngOnInit() {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
