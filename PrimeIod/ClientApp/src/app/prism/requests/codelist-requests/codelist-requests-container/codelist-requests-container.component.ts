import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codelist-requests-container',
  templateUrl: './codelist-requests-container.component.html',
  styleUrls: ['./codelist-requests-container.component.css']
})
export class CodelistRequestsContainerComponent implements OnInit {
  requestPermissions =
    'rol.Admin, rol.DMPM_manager, rol.DMPM_oversight, rol.DMPM, rol.CDMS Manager, rol.CDS Manager, rol.IMI_TPM';

  constructor() {}

  ngOnInit(): void {}
}
