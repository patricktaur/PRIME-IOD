import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeContainerComponent } from './employee-container/employee-container.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    EmployeeContainerComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [CommonModule, SharedModule,  EmployeeRoutingModule]
})
export class  EmployeeModule {}
