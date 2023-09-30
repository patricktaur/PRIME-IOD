import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReportsMenuComponent } from './menu/reports-menu/reports-menu.component';
import { StudyMenuComponent } from './menu/reports-menu/study-menu/study-menu.component';
import { RisksMenuComponent } from './menu/reports-menu/risks-menu/risks-menu.component';
import { ResourcesMenuComponent } from './menu/reports-menu/resources-menu/resources-menu.component';
import { ComplianceMenuComponent } from './menu/reports-menu/compliance-menu/compliance-menu.component';
import { CdsMenuComponent } from './menu/reports-menu/cds-menu/cds-menu.component';
import { CdmsMenuComponent } from './menu/reports-menu/cdms-menu/cdms-menu.component';
import { CodingRequestMenuComponent } from './menu/reports-menu/coding-request-menu/coding-request-menu.component';
import { ExportMenuComponent } from './menu/reports-menu/export-menu/export-menu.component';
import { ImiCdsMenuComponent } from './menu/reports-menu/imi-cds-menu/imi-cds-menu.component';
import { RequestsMenuComponent } from './menu/requests-menu/requests-menu.component';
import { CrmMenuComponent } from './menu/reports-menu/crm-menu/crm-menu.component';
import { UsersMenuComponent } from './menu/reports-menu/users-menu/users-menu.component';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule, SharedModule],
  declarations: [
    HeaderComponent,
    ShellComponent,
    ReportsMenuComponent,
    StudyMenuComponent,
    RisksMenuComponent,
    ResourcesMenuComponent,
    ComplianceMenuComponent,
    CdsMenuComponent,
    CdmsMenuComponent,
    CodingRequestMenuComponent,
    ExportMenuComponent,
    ImiCdsMenuComponent,
    RequestsMenuComponent,
    CrmMenuComponent,
    UsersMenuComponent
  ]
})
export class ShellModule {}
