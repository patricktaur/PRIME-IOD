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
export class ImiStudyReviewService {
  constructor(private http: HttpClient) {}

  getStudyDashboardDTO(studyId: number) {
    const api = environment.serverUrl + '/api/tblStudyReviewXXX/study-dashboard/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  //not used?
  // getStudyDetailsDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/study-details/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //Not used?
  // saveStudyDetails(studyId: number, studyDetailsDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/save-study-details/' + studyId;
  //   const body = JSON.stringify(studyDetailsDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //not used:
  // getStudyAssumptionsDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/study-assumptions/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //Not used:
  // saveStudyAssumptions(studyId: number, studyAssumptionsDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/save-study-assumptions/' + studyId;
  //   const body = JSON.stringify(studyAssumptionsDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getStudyDetailsDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/imi-study-details/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyDetailsViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/imi-study-details-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyDetails(studyId: number, studyDetailsDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-imi-study-details/' + studyId;
    const body = JSON.stringify(studyDetailsDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyAssumptionsDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/imi-study-assumptions/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyAssumptionsViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/imi-study-assumptions-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyAssumptions(studyId: number, studyAssumptionsDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-imi-study-assumptions/' + studyId;
    const body = JSON.stringify(studyAssumptionsDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyTimelinesDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-timelines/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyTimelines(studyId: number, StudyTimelinesDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-study-timelines/' + studyId;
    const body = JSON.stringify(StudyTimelinesDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyStatusDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-status/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyStatusViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-status-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyStatus(studyId: number, StudyTimelinesDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-study-status/' + studyId;
    const body = JSON.stringify(StudyTimelinesDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  //Not used
  // getStudyPageflowDTO(studyId: number) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/study-pageflow/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //Not used:
  // saveStudyPageflow(studyId: number, StudypageflowDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/save-study-pageflow/' + studyId;
  //   const body = JSON.stringify(StudypageflowDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //Not used:
  // getStudyTasksDTO(studyId: number) {
  //   //const api = environment.serverUrl + '/api/tblStudyReviewXXX/studytasks/' + studyId;
  //   // const api = environment.serverUrl + '/api/tblStudy/test/' + studyId;
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/test/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  //Not used
  // saveStudyTasks(studyId: number, StudyTasksDTO: any) {
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/save-study-tasks/' + studyId;
  //   const body = JSON.stringify(StudyTasksDTO);
  //   return this.http.put(api, body, httpOptions).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  getStudySignOff(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-sign-off/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudySignOffView(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-sign-off-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReview(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-review/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getIMIReviewCategoryHeader(studyId: number) {
    const api = environment.serverUrl + '/api/TblImistudyReviewCategoriesFields/records/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getall(studyId: number) {
    const api = environment.serverUrl + '/api/TblImistudyReviewCategoriesData/getall/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getReviewData(studyId: number, groupId: number) {
    const api = environment.serverUrl + '/api/TblImistudyReviewCategoriesData/getbygroup/' + studyId + '/' + groupId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReviewPart1(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-review-part1/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReviewPart2(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-review-part2/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyReviewHistory(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-project-review-history/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  // getStudyReviewTimelineHistory(studyId: number) {
  //   //study-project-review-timeline-history
  //   const api = environment.serverUrl + '/api/tblStudyReviewXXX/timeline-history/' + studyId;
  //   return this.http.get(api).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }

  saveStudyReview(studyId: number, StudypageflowDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-study-project-review/' + studyId;
    const body = JSON.stringify(StudypageflowDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveImiStudyReview(tempdata: any) {
    const api = environment.serverUrl + '/api/TblImistudyReviewCategoriesData/updateDB/';
    const body = JSON.stringify(tempdata);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  // DmpmConfirmProjectReview
  // DmpmUndoProjectReview
  // DmpmManagerConfirmProjectReview
  // DmpmManagerUndoProjectReview
  dmpmConfirmProjectReview(studyId: number, StudypageflowDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/dmpm-confirm-project-review/' + studyId;
    const body = JSON.stringify(StudypageflowDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  dmpmUndoProjectReview(studyId: number, StudypageflowDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/dmpm-undo-project-review/' + studyId;
    const body = JSON.stringify(StudypageflowDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  dmpmManagerConfirmProjectReview(studyId: number, StudypageflowDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/dmpm-manager-confirm-project-review/' + studyId;
    const body = JSON.stringify(StudypageflowDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
  dmpmManagerUndoProjectReview(studyId: number, StudypageflowDTO: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/dmpm-manager-undo-project-review/' + studyId;
    const body = JSON.stringify(StudypageflowDTO);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdmsDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-cdms/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudyCdmsViewDTO(studyId: number) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/study-cdms-view/' + studyId;
    return this.http.get(api).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveStudyCdms(studyId: number, studyCdmsDto: any) {
    const api = environment.serverUrl + '/api/TblIMIStudyReview/save-study-cdms/' + studyId;
    const body = JSON.stringify(studyCdmsDto);
    return this.http.put(api, body, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
