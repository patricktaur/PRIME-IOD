import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Directive({
  selector: '[appHasResourcePermissions]'
})
export class HasResourcePermissionsDirective implements OnInit {
  permissionValue: string = '';
  @Input() set appHasResourcePermissions(value: string) {
    this.permissionValue = value;
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}
  ngOnInit() {
    let subscription = this.studyEditService._studyId.subscribe((st: any) => {
      if(this.permissionValue){
        var userRole: UserRoles = UserRoles[this.permissionValue as keyof typeof UserRoles];
        let hasPermission = this.credentialsService.userHasResourcePermission(st, userRole);
        // console.log(`has permission = ${hasPermission}`);
        if (hasPermission) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
     
    })
  }
}
