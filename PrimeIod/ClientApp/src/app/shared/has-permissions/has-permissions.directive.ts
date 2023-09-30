import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';
@Directive({
  selector: '[appHasPermissions]'
})
export class HasPermissionsDirective implements OnInit {
  permissionValue: string | undefined;
  @Input() set appHasPermissions(value: string) {
    this.permissionValue = value;
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private credentialsService: CredentialsService
  ) {}
  ngOnInit() {
    if (this.credentialsService.userHasPermission(this.permissionValue)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
