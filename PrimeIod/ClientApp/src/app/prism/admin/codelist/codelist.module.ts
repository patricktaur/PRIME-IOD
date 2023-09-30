import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { CodelistRoutingModule } from './codelist-routing.module';
import { CodelistContainerComponent } from './codelist-container/codelist-container.component';
import { CodelistListComponent } from './codelist-list/codelist-list.component';
import { CodelistFilterComponent } from './codelist-filter/codelist-filter.component';
import { CodelistEditComponent } from './codelist-edit/codelist-edit.component';

@NgModule({
  declarations: [CodelistContainerComponent, CodelistListComponent, CodelistFilterComponent, CodelistEditComponent],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, CodelistRoutingModule]
})
export class CodelistModule {}
