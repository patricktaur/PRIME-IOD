import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedCompsModule } from "@app/prism/shared-comps/shared-comps.module";
import { SharedModule } from "@app/shared";
import { ImiReviewCategoriesCodelistContainerComponent } from './imi-review-categories-codelist-container/imi-review-categories-codelist-container.component';
import { ImiReviewCategoriesCodelistFilterComponent } from './imi-review-categories-codelist-filter/imi-review-categories-codelist-filter.component';
import { ImiReviewCategoriesCodelistListComponent } from './imi-review-categories-codelist-list/imi-review-categories-codelist-list.component';
import { ImiReviewCategoriesCodelistEditComponent } from './imi-review-categories-codelist-edit/imi-review-categories-codelist-edit.component';
import { ImiReviewCategoriesCodelistRoutingModule } from "./imi-review-categories-codelist-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [
    ImiReviewCategoriesCodelistContainerComponent,
    ImiReviewCategoriesCodelistFilterComponent,
    ImiReviewCategoriesCodelistListComponent,
    ImiReviewCategoriesCodelistEditComponent
  ],
	imports: [
		CommonModule,
		SharedModule,
		SharedCompsModule,
		RouterModule,
		ImiReviewCategoriesCodelistRoutingModule
	]
})
export class ImiReviewCategoriesCodelistModule {}