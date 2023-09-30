import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class StudyService {
  constructor(private http: HttpClient) {}

  getStudyIconNumbers() {
    let api = `${environment.serverUrl}/api/tblStudy/study-icon-numbers`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIconNumbersByUser(userId: string) {
    let api = `${environment.serverUrl}/api/tblStudy/study-icon-numbers-user/${userId}`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyIconNumbersA(): any {
    let api = `${environment.serverUrl}/api/tblStudy/study-icon-numbers-a`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getDmAndDmPlusImiAndImiStudyIconNumbers(): any {
    let api = `${environment.serverUrl}/api/tblStudy/dm-imi-dm-plus-imi-study-icon-numbers`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getImiStudyIconNumbers(): any {
    let api = `${environment.serverUrl}/api/tblStudy/imi-study-icon-numbers`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyStatusDashboard() {
    let api = `${environment.serverUrl}/api/tblStudy/study-status-dashboard`;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getTblStudy(id: number) {
    const api = environment.serverUrl + '/api/tblStudy/' + id;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  addTblStudy(tblStudy: any) {
    const api = environment.serverUrl + '/api/tblStudy/add';
    const body = JSON.stringify(tblStudy);
    return this.http.post(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateTblStudy(tblStudy: any) {
    const api = environment.serverUrl + '/api/tblStudy/edit';
    const body = JSON.stringify(tblStudy);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteTblStudy(tblStudy: any) {
    const api = environment.serverUrl + '/api/tblStudy/delete?tblStudyId=' + tblStudy.recId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  removeCurrentReview(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudy/remove-current-review/' + +studyId;
    return this.http.delete(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getStudyDashboardDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-dashboard/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyDetailsDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-details/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyDetails(studyId: number, studyDetailsDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-details/' + studyId;
  //   const body = JSON.stringify(studyDetailsDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // updateTblStudy(tblStudy: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/edit';
  //   const body = JSON.stringify(tblStudy);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyAssumptionsDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-assumptions/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyAssumptions(studyId: number, studyAssumptionsDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-assumptions/' + studyId;
  //   const body = JSON.stringify(studyAssumptionsDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyTimelinesDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-timelines/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyTimelines(studyId: number, StudyTimelinesDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-timelines/' + studyId;
  //   const body = JSON.stringify(StudyTimelinesDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyStatusDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-status/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyStatus(studyId: number, StudyTimelinesDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-status/' + studyId;
  //   const body = JSON.stringify(StudyTimelinesDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // getStudyPageflowDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-pageflow/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyPageflow(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-pageflow/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyTasksDTO(studyId: number) {
  //   //const api = environment.serverUrl + '/api/tblStudy/studytasks/' + studyId;
  //   // const api = environment.serverUrl + '/api/tblStudy/test/' + studyId;
  //   const api = environment.serverUrl + '/api/tblStudy/test/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // saveStudyTasks(studyId: number, StudyTasksDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-tasks/' + studyId;
  //   const body = JSON.stringify(StudyTasksDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReview(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-project-review-x/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyIssueTracker(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudyIssueTracker/list/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReviewHistory(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudy/study-project-review-history/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  // getStudyReviewTimelineHistory(studyId: number) {
  //   //study-project-review-timeline-history
  //   const api = environment.serverUrl + '/api/tblStudy/timeline-history/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // saveStudyReview(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/save-study-project-review/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // // DmpmConfirmProjectReview
  // // DmpmUndoProjectReview
  // // DmpmManagerConfirmProjectReview
  // // DmpmManagerUndoProjectReview
  // dmpmConfirmProjectReview(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/dmpm-confirm-project-review/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // dmpmUndoProjectReview(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/dmpm-undo-project-review/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // dmpmManagerConfirmProjectReview(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/dmpm-manager-confirm-project-review/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  // dmpmManagerUndoProjectReview(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudy/dmpm-manager-undo-project-review/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
}
