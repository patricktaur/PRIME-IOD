export enum MenuStatus {
    NotReady,
    ReadyForUAT,
    UATPassed,
    ProductionPassed,
    UnderMaintenance,
  }
  
  export enum AccessMode {
    None = 0,
    View = 1,
    EditIfUserIsInStudyResource = 2,
    Edit = 3,
  }
  
  export interface StudyIconNumber {
    studyIconNumber: string;
    studyId: number;
  }
  
  export interface ComponentPermission {
    compCode: string;
    componentPath: string;
    path: string; // for iterating through siblings
    alternatePath: string;
    status?: MenuStatus;
    title: string;
    mode: AccessMode;
    studiesPermitted: StudyIconNumber[];
  }

  export interface MenuPermission {
    menuPath: string;
    status?: MenuStatus;
    title: string;
    mode: AccessMode;
    compCode: string;
    alternatePath: string;
  }
  