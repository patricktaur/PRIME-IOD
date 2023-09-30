import { Component, OnInit } from '@angular/core';
import { StudyReportService } from '@app/prism/reports/study/study-report.service';

@Component({
  selector: 'app-edcstudystatus-by-system',
  templateUrl: './edcstudystatus-by-system.component.html',
  styleUrls: ['./edcstudystatus-by-system.component.css']
})
export class EdcstudystatusBySystemComponent implements OnInit {
  title = 'EDC Study Status By System';
  isLoading: boolean = false;
  pageNumber = 1;
  pageSize = 50;

  records: any;
  filteredRecords: any;

  groupedRecords: any;
  groupedUnfilteredRecords: any;

  groupedByPhaseRecords: any;
  constructor(private studyReportService: StudyReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.studyReportService.getEdcStudyStateBySystemReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          if (this.records) {
            this.filteredRecords = this.records;
            // this.ConvertToGroupedRows();
            this.groupedRecords = this.ConvertToGroupedRows(this.records);
            this.groupedUnfilteredRecords = this.ConvertToGroupedRows(this.records);
          }
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }
  onFilterChange(filteredRecords: any) {
    // this.filteredRecords = filteredRecords;
    // this.ConvertToGroupedRows();

    this.groupedRecords = this.ConvertToGroupedRows(filteredRecords);
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  columns: Array<any> = [
    {
      header: 'Study Status',
      field: 'studystatus'
    },
    {
      header: 'Discovere (By Cerner)',
      field: 'discovere',
      width: 50,
      align: 'center'
    },
    {
      header: 'Inform',
      field: 'inform',
      width: 50,
      align: 'center'
      //source {type: 'clothes'}
    },
    {
      header: 'Medrio',
      field: 'medrio',
      width: 50,
      align: 'center'
    },
    {
      header: 'OC RDC',
      field: 'ocrdc',
      width: 50,
      align: 'center'
    },
    {
      header: 'Rave',
      field: 'rave',
      width: 50,
      align: 'center'
    },
    {
      header: 'UX EDC (By DataTrak)',
      field: 'uxedc',
      width: 50,
      align: 'center'
    },
    {
      header: 'Other',
      field: 'other',
      width: 50,
      align: 'center'
    },
    {
      header: 'AptivAdvantage (EDC)',
      field: 'aptivadvantage',
      width: 50,
      align: 'center'
    },
    {
      header: 'eClinicalOs (By IBM Clinical Development, Previously by Merge)',
      field: 'eclinicalos',
      width: 50,
      align: 'center'
    },
    {
      header: 'N/A',
      field: 'na',
      width: 50,
      align: 'center'
    },
    {
      header: 'Veeva CDMS',
      field: 'veeva',
      width: 50,
      align: 'center'
    },

    {
      header: 'Total',
      field: 'total',
      width: 50,
      align: 'center'
    },
    {
      header: 'Excluded',
      field: 'excluded',
      width: 50,
      align: 'center'
    }
  ];
  //---Group by:

  groupBy(key: any, array: any) {
    return array.reduce((objectsByKeyValue: any, obj: any) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }
  // ConvertToGroupedRows() {
  //   let filteredRecords = this.filteredRecords.filter(
  //     (x: any) => x.studyStatusText != 'Future' && x.cdmstypeId != 5402 && x.cdms != null
  //   );
  //   var groupedDataBasic = this.groupBy('studyStatusText', filteredRecords);
  //   var groupedData = {};
  //   // console.log(`grouped data = ${JSON.stringify(groupedDataBasic, null, 2)}`);
  //   var tableArr = [];

  //   for (var key in groupedDataBasic) {
  //     if (!(key == 'On Hold' || key == 'Cancelled' || key == 'Completed')) {
  //       groupedData['Active'] = groupedData['Active']
  //         ? groupedData['Active'].concat(groupedDataBasic[key])
  //         : groupedDataBasic[key];
  //     } else {
  //       groupedData[key] = groupedDataBasic[key];
  //     }
  //   }
  //   // console.log(`new grouped data = ${JSON.stringify(groupedData, null, 2)}`);

  //   for (var key in groupedData) {
  //     tableArr.push({
  //       studystatus: key,
  //       discovere: groupedData[key].filter((x: any) => x.cdmsPid == '1301').reduce((a: any, b: any) => a + 1, 0),
  //       inform: groupedData[key].filter((x: any) => x.cdmsPid == '1302').reduce((a: any, b: any) => a + 1, 0),
  //       medrio: groupedData[key].filter((x: any) => x.cdmsPid == '1303').reduce((a: any, b: any) => a + 1, 0),
  //       ocrdc: groupedData[key].filter((x: any) => x.cdmsPid == '1305').reduce((a: any, b: any) => a + 1, 0),
  //       rave: groupedData[key].filter((x: any) => x.cdmsPid == '1307').reduce((a: any, b: any) => a + 1, 0),
  //       uxedc: groupedData[key].filter((x: any) => x.cdmsPid == '1310').reduce((a: any, b: any) => a + 1, 0),
  //       other: groupedData[key].filter((x: any) => x.cdmsPid == '10001').reduce((a: any, b: any) => a + 1, 0),
  //       aptivadvantage: groupedData[key].filter((x: any) => x.cdmsPid == '10006').reduce((a: any, b: any) => a + 1, 0),
  //       eclinicalos: groupedData[key].filter((x: any) => x.cdmsPid == '11240').reduce((a: any, b: any) => a + 1, 0),
  //       na: groupedData[key].filter((x: any) => x.cdmsPid == '11251').reduce((a: any, b: any) => a + 1, 0),
  //       veeva: groupedData[key].filter((x: any) => x.cdmsPid == '11382').reduce((a: any, b: any) => a + 1, 0),
  //       total: groupedData[key].reduce((a: any, b: any) => a + 1, 0),
  //       excluded: ''
  //     });
  //   }

  //   let excludedRecords = this.filteredRecords.filter(
  //     (x: any) => !(x.studyStatusText != 'Future' && x.cdmstypeId != 5402 && x.cdms != null)
  //   );
  //   console.log(`Excluded data = ${JSON.stringify(excludedRecords, null, 2)}`);
  //   var excludedTotal = excludedRecords.length;

  //   for (let i = 0; i < filteredRecords.length; i++) {
  //     if (
  //       !(
  //         filteredRecords[i].cdmsPid == '1301' ||
  //         filteredRecords[i].cdmsPid == '1302' ||
  //         filteredRecords[i].cdmsPid == '1303' ||
  //         filteredRecords[i].cdmsPid == '1305' ||
  //         filteredRecords[i].cdmsPid == '1307' ||
  //         filteredRecords[i].cdmsPid == '1310' ||
  //         filteredRecords[i].cdmsPid == '10001' ||
  //         filteredRecords[i].cdmsPid == '10006' ||
  //         filteredRecords[i].cdmsPid == '11240' ||
  //         filteredRecords[i].cdmsPid == '11251' ||
  //         filteredRecords[i].cdmsPid == '11382'
  //       )
  //     ) {
  //       excludedTotal = excludedTotal + 1;
  //     }
  //   }

  //   this.groupedRecords = tableArr;
  //   // this.groupedRecords = tableArr.sort(function(a, b) {
  //   //   return a.studystatus > b.studystatus ? 1 : -1;
  //   // });

  //   this.groupedRecords.push({
  //     studystatus: 'Total',
  //     discovere: tableArr.reduce((a: any, b: any) => a + b['discovere'], 0),
  //     inform: tableArr.reduce((a: any, b: any) => a + b['inform'], 0),
  //     medrio: tableArr.reduce((a: any, b: any) => a + b['medrio'], 0),
  //     ocrdc: tableArr.reduce((a: any, b: any) => a + b['ocrdc'], 0),
  //     rave: tableArr.reduce((a: any, b: any) => a + b['rave'], 0),
  //     uxedc: tableArr.reduce((a: any, b: any) => a + b['uxedc'], 0),
  //     other: tableArr.reduce((a: any, b: any) => a + b['other'], 0),
  //     aptivadvantage: tableArr.reduce((a: any, b: any) => a + b['aptivadvantage'], 0),
  //     eclinicalos: tableArr.reduce((a: any, b: any) => a + b['eclinicalos'], 0),
  //     na: tableArr.reduce((a: any, b: any) => a + b['na'], 0),
  //     veeva: tableArr.reduce((a: any, b: any) => a + b['veeva'], 0),
  //     total: tableArr.reduce((a: any, b: any) => a + b.total, 0),
  //     excluded: excludedTotal
  //   });
  // }

  ConvertToGroupedRows(records: any) {
    let filteredRecords = records.filter(
      (x: any) => x.studyStatusText != 'Future' && x.cdmstypeId != 5402 && x.cdms != null
    );
    var groupedDataBasic = this.groupBy('studyStatusText', filteredRecords);
    var groupedData: any = {};
    // console.log(`grouped data = ${JSON.stringify(groupedDataBasic, null, 2)}`);
    var tableArr = [];

    for (var key in groupedDataBasic) {
      if (!(key == 'On Hold' || key == 'Cancelled' || key == 'Completed')) {
        groupedData['Active'] = groupedData['Active']
          ? groupedData['Active'].concat(groupedDataBasic[key])
          : groupedDataBasic[key];
      } else {
        groupedData[key] = groupedDataBasic[key];
      }
    }
    // console.log(`new grouped data = ${JSON.stringify(groupedData, null, 2)}`);

    for (var key in groupedData) {
      tableArr.push({
        studystatus: key,
        discovere: groupedData[key].filter((x: any) => x.cdmsPid == '1301').reduce((a: any, b: any) => a + 1, 0),
        inform: groupedData[key].filter((x: any) => x.cdmsPid == '1302').reduce((a: any, b: any) => a + 1, 0),
        medrio: groupedData[key].filter((x: any) => x.cdmsPid == '1303').reduce((a: any, b: any) => a + 1, 0),
        ocrdc: groupedData[key].filter((x: any) => x.cdmsPid == '1305').reduce((a: any, b: any) => a + 1, 0),
        rave: groupedData[key].filter((x: any) => x.cdmsPid == '1307').reduce((a: any, b: any) => a + 1, 0),
        uxedc: groupedData[key].filter((x: any) => x.cdmsPid == '1310').reduce((a: any, b: any) => a + 1, 0),
        other: groupedData[key].filter((x: any) => x.cdmsPid == '10001').reduce((a: any, b: any) => a + 1, 0),
        aptivadvantage: groupedData[key].filter((x: any) => x.cdmsPid == '10006').reduce((a: any, b: any) => a + 1, 0),
        eclinicalos: groupedData[key].filter((x: any) => x.cdmsPid == '11240').reduce((a: any, b: any) => a + 1, 0),
        na: groupedData[key].filter((x: any) => x.cdmsPid == '11251').reduce((a: any, b: any) => a + 1, 0),
        veeva: groupedData[key].filter((x: any) => x.cdmsPid == '11382').reduce((a: any, b: any) => a + 1, 0),
        total: groupedData[key].reduce((a: any, b: any) => a + 1, 0),
        excluded: ''
      });
    }

    let excludedRecords = this.filteredRecords.filter(
      (x: any) => !(x.studyStatusText != 'Future' && x.cdmstypeId != 5402 && x.cdms != null)
    );
    console.log(`Excluded data = ${JSON.stringify(excludedRecords, null, 2)}`);
    var excludedTotal = excludedRecords.length;

    for (let i = 0; i < filteredRecords.length; i++) {
      if (
        !(
          filteredRecords[i].cdmsPid == '1301' ||
          filteredRecords[i].cdmsPid == '1302' ||
          filteredRecords[i].cdmsPid == '1303' ||
          filteredRecords[i].cdmsPid == '1305' ||
          filteredRecords[i].cdmsPid == '1307' ||
          filteredRecords[i].cdmsPid == '1310' ||
          filteredRecords[i].cdmsPid == '10001' ||
          filteredRecords[i].cdmsPid == '10006' ||
          filteredRecords[i].cdmsPid == '11240' ||
          filteredRecords[i].cdmsPid == '11251' ||
          filteredRecords[i].cdmsPid == '11382'
        )
      ) {
        excludedTotal = excludedTotal + 1;
      }
    }

    // this.groupedRecords = tableArr;

    tableArr.push({
      studystatus: 'Total',
      discovere: tableArr.reduce((a: any, b: any) => a + b['discovere'], 0),
      inform: tableArr.reduce((a: any, b: any) => a + b['inform'], 0),
      medrio: tableArr.reduce((a: any, b: any) => a + b['medrio'], 0),
      ocrdc: tableArr.reduce((a: any, b: any) => a + b['ocrdc'], 0),
      rave: tableArr.reduce((a: any, b: any) => a + b['rave'], 0),
      uxedc: tableArr.reduce((a: any, b: any) => a + b['uxedc'], 0),
      other: tableArr.reduce((a: any, b: any) => a + b['other'], 0),
      aptivadvantage: tableArr.reduce((a: any, b: any) => a + b['aptivadvantage'], 0),
      eclinicalos: tableArr.reduce((a: any, b: any) => a + b['eclinicalos'], 0),
      na: tableArr.reduce((a: any, b: any) => a + b['na'], 0),
      veeva: tableArr.reduce((a: any, b: any) => a + b['veeva'], 0),
      total: tableArr.reduce((a: any, b: any) => a + b.total, 0),
      excluded: excludedTotal
    });
    return tableArr;
  }
}
