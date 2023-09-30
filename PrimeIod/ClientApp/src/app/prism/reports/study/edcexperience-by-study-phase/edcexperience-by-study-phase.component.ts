import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudyReportService } from '@app/prism/reports/study/study-report.service';

//https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
// const groupBy = (key: any) => (array: any) =>
//   array.reduce((objectsByKeyValue: any, obj: any) => {
//     const value = obj[key];
//     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//     return objectsByKeyValue;
//   }, {});

//   Or using an implicit return (slower):

// const groupBy = key => array =>
//   array.reduce(
//     (objectsByKeyValue, obj) => ({
//       ...objectsByKeyValue,
//       [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
//     }),
//     {}
//   );

@Component({
  selector: 'app-edcexperience-by-study-phase',
  templateUrl: './edcexperience-by-study-phase.component.html',
  styleUrls: ['./edcexperience-by-study-phase.component.css']
})
export class EDCExperienceByStudyPhaseComponent implements OnInit {
  isLoading: boolean = false;
  title = 'EDC Experience By Study Phase';

  pageNumber = 1;
  pageSize = 50;

  records: any;
  filteredRecords: any;

  groupedUnfilteredRecords: any;
  groupedRecords: any;

  groupedByPhaseRecords: any;

  constructor(private router: Router, private studyReportService: StudyReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.studyReportService.getEdcExperienceByStudyPhaseReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          if (this.records) {
            // this.filteredRecords = this.records;
            //  this.ConvertToGroupedRows();

            this.groupedRecords = this.ConvertToGroupedRows(this.records);
            this.groupedUnfilteredRecords = this.ConvertToGroupedRows(this.records);
          }
        }
        this.isLoading = false;
      },
      (err: any) => {
        // let title = "EDC Experience By Study Phase";
        // this.router.navigate(['no-access', { title: title, error: err }]);
        // console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(filteredRecords: any) {
    // this.filteredRecords = filteredRecords;
    //  this.ConvertToGroupedRows();

    this.groupedRecords = this.ConvertToGroupedRows(filteredRecords);
  }

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  // fields = ['field123', 'field234', 'field345', 'field456'];
  // fields = ['Phase', 'Studies', 'Patients', 'Sites'];

  columns: Array<any> = [
    {
      header: 'Phase',
      field: 'protocolPhase'
    },
    {
      header: 'Studies',
      field: 'studies',
      width: 50,
      align: 'right'
      //source {type: 'clothes'}
    },
    {
      header: 'Patients',
      field: 'revisedRandomisedSubjectsExpected',
      width: 50,
      align: 'right'
    },
    {
      header: 'Sites',
      field: 'sites',
      width: 50,
      align: 'right'
    },
    {
      header: 'Excluded',
      field: 'excluded',
      width: 50,
      align: 'right'
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
  //     (x: any) => x.protocolPhase != null && x.sites != null && x.revisedRandomisedSubjectsExpected != null
  //   );
  //   var groupedData = this.groupBy('protocolPhase', filteredRecords);
  //   console.log(`grouped data = ${JSON.stringify(groupedData, null, 2)}`);
  //   var tableArr = [];

  //   for (var key in groupedData) {
  //     tableArr.push({
  //       protocolPhase: key != 'null' ? key : '',
  //       studies: groupedData[key].reduce((a: any, b: any) => a + b.studyCount, 0),
  //       revisedRandomisedSubjectsExpected: groupedData[key].reduce((a: any, b: any) => {
  //         return a + b.revisedRandomisedSubjectsExpected;
  //       }, 0),
  //       sites: groupedData[key].reduce((a: any, b: any) => a + b.sites, 0),
  //       excluded: ''
  //     });
  //   }

  //   let excludedRecords = this.filteredRecords.filter(
  //     (x: any) => !(x.protocolPhase != null && x.sites != null && x.revisedRandomisedSubjectsExpected != null)
  //   );
  //   var excludedTotal = 0;
  //   for (let i = 0; i < excludedRecords.length; i++) {
  //     excludedTotal = excludedRecords[i].studyCount + excludedTotal;
  //   }

  //   this.groupedRecords = tableArr.sort(function(a, b) {
  //     return a.protocolPhase > b.protocolPhase ? 1 : -1;
  //   });

  //   this.groupedRecords.push({
  //     protocolPhase: 'Total',
  //     studies: this.groupedRecords.reduce((a: any, b: any) => a + b.studies, 0),
  //     revisedRandomisedSubjectsExpected: this.groupedRecords.reduce(
  //       (a: any, b: any) => a + b.revisedRandomisedSubjectsExpected,
  //       0
  //     ),
  //     sites: this.groupedRecords.reduce((a: any, b: any) => a + b.sites, 0),
  //     excluded: excludedTotal
  //   });

  //   // this.groupedRecords.
  //   // console.log(`table arr = ${JSON.stringify(tableArr, null, 2)}`);
  // }

  ConvertToGroupedRows(records: any) {
    let filteredRecords = records.filter(
      (x: any) => x.protocolPhase != null && x.sites != null && x.revisedRandomisedSubjectsExpected != null
    );
    var groupedData = this.groupBy('protocolPhase', filteredRecords);
    console.log(`grouped data = ${JSON.stringify(groupedData, null, 2)}`);
    var tableArr = [];

    for (var key in groupedData) {
      tableArr.push({
        protocolPhase: key != 'null' ? key : '',
        studies: groupedData[key].reduce((a: any, b: any) => a + b.studyCount, 0),
        revisedRandomisedSubjectsExpected: groupedData[key].reduce((a: any, b: any) => {
          return a + b.revisedRandomisedSubjectsExpected;
        }, 0),
        sites: groupedData[key].reduce((a: any, b: any) => a + b.sites, 0),
        excluded: ''
      });
    }

    let excludedRecords = records.filter(
      (x: any) => !(x.protocolPhase != null && x.sites != null && x.revisedRandomisedSubjectsExpected != null)
    );
    var excludedTotal = 0;
    for (let i = 0; i < excludedRecords.length; i++) {
      excludedTotal = excludedRecords[i].studyCount + excludedTotal;
    }
    var groupedRecords: any;
    groupedRecords = tableArr.sort(function(a, b) {
      return a.protocolPhase > b.protocolPhase ? 1 : -1;
    });

    groupedRecords.push({
      protocolPhase: 'Total',
      studies: groupedRecords.reduce((a: any, b: any) => a + b.studies, 0),
      revisedRandomisedSubjectsExpected: groupedRecords.reduce(
        (a: any, b: any) => a + b.revisedRandomisedSubjectsExpected,
        0
      ),
      sites: groupedRecords.reduce((a: any, b: any) => a + b.sites, 0),
      excluded: excludedTotal
    });

    return groupedRecords;
  }

  get csvfileName() {
    let recOf = '';
    if (this.groupedRecords && this.groupedRecords.length > 0) {
      if (this.groupedRecords.length == this.groupedUnfilteredRecords.length) {
        recOf = 'All-Of-' + this.groupedUnfilteredRecords.length;
      } else {
        recOf = this.groupedRecords.length + '-Of-' + this.groupedUnfilteredRecords.length;
      }
    }
    return this.title + '-' + recOf + '-records.csv';
  }
}
