import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DmStudyMembersShellComponent} from '@app/prism/study/study-shared-comps/dm-study-members-shell/dm-study-members-shell.component';

@Component({
  selector: 'app-study-dm-container',
  templateUrl: './study-dm-container.component.html',
  styleUrls: ['./study-dm-container.component.css']
})
export class StudyDmContainerComponent implements OnInit, OnDestroy {
  rootPath = 'study/dm';
  studyId: number = 0;
  studyProperties: any;
  subscription: Subscription | undefined;
  menuWidth = 3;

  hasDMManagerRole: boolean = false;
  constructor(private studyEditService: StudyEditService,
    private credentialsService: CredentialsService,
    private modalService: NgbModal,) {}

  ngOnInit(): void {
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyProperties = st;
      this.studyId = st.studyId
    });
    this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  menuClass() {
    if (this.menuWidth == 3) {
      return `col-3 px-0 position-relative`;
    } else {
      return `col-1 px-0 overflow-hidden text-truncate text-nowrap position-relative`;
    }
    //return `col-${this.menuWidth} pe-0`; //"col-1 pe-0";
  }

  toggleMenuWidth() {
    if (this.menuWidth == 3) {
      this.menuWidth = 1;
    } else {
      this.menuWidth = 3;
    }
  }

  collapse() {
    if (this.menuWidth == 3) {
      return 'bi bi-arrow-bar-left';
    } else {
      return 'bi bi-arrow-bar-right';
    }
  }


  showTeamMembers() {
    const modalRef = this.modalService.open(DmStudyMembersShellComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      scrollable: true
    });
     modalRef.componentInstance.studyId = this.studyId;
    // modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // result.roles = this.removeNonSelectedRolesFromRoles(result.roles);
          // this.addUser(result);
          // this.getUsersOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
