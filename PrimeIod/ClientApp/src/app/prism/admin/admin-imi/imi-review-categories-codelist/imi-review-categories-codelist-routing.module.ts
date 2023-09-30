import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImiReviewCategoriesCodelistContainerComponent } from "./imi-review-categories-codelist-container/imi-review-categories-codelist-container.component";
import { ImiReviewCategoriesCodelistListComponent } from "./imi-review-categories-codelist-list/imi-review-categories-codelist-list.component";
import { ImiReviewCategoriesCodelistEditComponent } from "./imi-review-categories-codelist-edit/imi-review-categories-codelist-edit.component";

const routes: Routes = [
	{
		path: '',
		component: ImiReviewCategoriesCodelistContainerComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'list'
			},
			{
				path: 'list',
				component: ImiReviewCategoriesCodelistListComponent
			},
			{
				path: 'edit',
				component: ImiReviewCategoriesCodelistEditComponent
				// canDeactivate: [CanDeactivateGuard]
			}
		]
	}
];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ImiReviewCategoriesCodelistRoutingModule {}