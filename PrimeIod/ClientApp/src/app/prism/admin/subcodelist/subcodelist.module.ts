import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { SubCodelistRoutingModule } from './subcodelist-routing.module';
import { SubcodelistContainerComponent } from './subcodelist-container/subcodelist-container.component';
// import { VeevaVaultVersionListComponent } from './veeva-vault-version/veeva-vault-version-list/veeva-vault-version-list.component';
// import { RaveUrlVersionListComponent } from './rave-url-version/rave-url-version-list/rave-url-version-list.component';
// import { ProcessImprovementCategoryListComponent } from './process-improvement-category/process-improvement-category-list/process-improvement-category-list.component';
// import { VeevaVaultVersionEditComponent } from './veeva-vault-version/veeva-vault-version-edit/veeva-vault-version-edit.component';
// import { VeevaVaultVersionFilterComponent } from './veeva-vault-version/veeva-vault-version-filter/veeva-vault-version-filter.component';
// import { RaveUrlVersionFilterComponent } from './rave-url-version/rave-url-version-filter/rave-url-version-filter.component';
// import { RaveUrlVersionEditComponent } from './rave-url-version/rave-url-version-edit/rave-url-version-edit.component';
// import { ProcessImprovementCategoryFilterComponent } from './process-improvement-category/process-improvement-category-filter/process-improvement-category-filter.component';
// import { ProcessImprovementCategoryEditComponent } from './process-improvement-category/process-improvement-category-edit/process-improvement-category-edit.component';

@NgModule({
  declarations: [
    SubcodelistContainerComponent,
    
    // VeevaVaultVersionListComponent,
    // RaveUrlVersionListComponent,
    // ProcessImprovementCategoryListComponent,
    
    // VeevaVaultVersionEditComponent,
    // VeevaVaultVersionFilterComponent,
    // RaveUrlVersionFilterComponent,
    // RaveUrlVersionEditComponent,
    // ProcessImprovementCategoryFilterComponent,
    // ProcessImprovementCategoryEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, SubCodelistRoutingModule]
})
export class SubCodelistModule {}
