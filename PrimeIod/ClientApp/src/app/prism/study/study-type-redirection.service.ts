import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class StudyTypeRedirectionService {
  constructor() {}

  callFunctionOrRedirect(
    router: Router,
    compStudyType: string,
    studyType: string,
    studyId: number,
    loadFunction: Function
  ) {
    if (compStudyType === studyType) {
      loadFunction(studyId);
    } else {
      switch (studyType) {
        case 'CRM':
          router.navigate(['study/crm']);
          break;
        case 'DM':
          router.navigate(['study/dm']);
          break;
        case 'DM+IMI':
          router.navigate(['study/dm-imi']);
          break;
        case 'DM+CRM':
          router.navigate(['study/dm-crm']);
          break;
        case 'IMI':
          router.navigate(['study/imi']);
          break;

        default:
          break;
      }
    }
  }
}
