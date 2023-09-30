import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Directive({
  selector: '[appHasStudyResourcePermissions]'
})
export class HasStudyResourcePermissionsDirective implements OnInit {
  path: string = '';
  @Input() set appHasResourcePermissions(value: string) {
    this.path = value;
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}
  ngOnInit() {
    let subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // console.log(`study = ${JSON.stringify(st, null, 2)}`);
      let studyId = st.studyId;

      let menuPermission = this.credentialsService.getMenuPermission("study/" + st.studyType.toLowerCase().replace("+", "-") + "/cdms/cdms-tracker");
      console.log(`menu permission = ${JSON.stringify(menuPermission, null, 2)}`);
      console.log(`sudyid = ${studyId}`);

      if(menuPermission) {
        const componentCode = menuPermission.componentCode;

        const componentPermission = this.credentialsService.getCompPermission(componentCode);
        console.log(`componentPermission = ${JSON.stringify(componentPermission, null, 2)}`);

        if ( componentPermission?.studiesPermitted?.length > 0) {
          const studyPermitted = componentPermission.studiesPermitted.find((s : any) => s.studyId === studyId);
          // console.log(`componentPermission = ${JSON.stringify(componentPermission)}`);
  
          // console.log(`menu permission = ${JSON.stringify(menuPermission)}`);
          if (studyPermitted) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        }
      }
    });
  }
}
