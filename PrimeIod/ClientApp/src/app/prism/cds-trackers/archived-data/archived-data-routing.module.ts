import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CdsOutputArchivedDataComponent } from "./cds-output-archived-data/cds-output-archived-data.component";
import { CdsDeliveryArchivedDataComponent } from "./cds-delivery-archived-data/cds-delivery-archived-data.component";
import { ArchivedDataContainerComponent } from "./archived-data-container/archived-data-container.component";

const routes: Routes = [{
	path: '',
	component: ArchivedDataContainerComponent,
	children: [
		{
			path: '',
			pathMatch: 'full',
			redirectTo: 'output'
		},
		{
			path: 'output',
			component: CdsOutputArchivedDataComponent
		}, 
		{
			path: 'delivery',
			component: CdsDeliveryArchivedDataComponent
		}]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArchivedDataRoutingModule {}
  