import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedCompsModule } from "@app/prism/shared-comps/shared-comps.module";
import { SharedModule } from "@app/shared";
import { ArchivedDataRoutingModule } from "./archived-data-routing.module";
import { CdsOutputArchivedDataComponent } from './cds-output-archived-data/cds-output-archived-data.component';
import { CdsDeliveryArchivedDataComponent } from './cds-delivery-archived-data/cds-delivery-archived-data.component';
import { ArchivedDataContainerComponent } from './archived-data-container/archived-data-container.component';
import { ArchivedDataFiltersComponent } from './archived-data-filters/archived-data-filters.component';

@NgModule({
	declarations: [
    CdsOutputArchivedDataComponent,
    CdsDeliveryArchivedDataComponent,
    ArchivedDataContainerComponent,
    ArchivedDataFiltersComponent
  ],
	imports: [CommonModule, SharedModule, SharedCompsModule, ArchivedDataRoutingModule]
})
export class ArchivedDataModule {}