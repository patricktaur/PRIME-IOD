import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleRoutingModule } from './roles-routing.module';
import { RolesContainerComponent } from './roles-container/roles-container.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesFormComponent } from './roles-list/roles-form/roles-form.component';

@NgModule({
  declarations: [RolesContainerComponent, RolesListComponent, RolesFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedCompsModule,
    RouterModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class RoleModule {}
