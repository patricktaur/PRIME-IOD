import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-study-resource-dashboard',
  templateUrl: './study-resource-dashboard.component.html',
  styleUrls: ['./study-resource-dashboard.component.css']
})
export class StudyResourceDashboardComponent implements OnInit {
  @Input() records: any;
  constructor() {}

  ngOnInit(): void {}

  groupBy(key: any, array: any) {
    return array?.reduce((objectsByKeyValue: any, obj: any) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }

  get summary() {
    //isResourceActive": true, "rolePDescription":
    // return this.records.slice(0, 2);
    let filteredRecords = this.records?.filter((x: any) => x.isResourceActive == true);
    //rolePid rolePDescription
    var groupedData = this.groupBy('rolePid', filteredRecords);
    // console.log(`grouped data = ${JSON.stringify(groupedData, null, 2)}`);
    var tableArr = [];

    for (var key in groupedData) {
      tableArr.push({
        rolePId: key != 'null' ? key : 0,
        //ZoneCount: Object.keys(byZone).length,
        resourceCount: groupedData[key].length,
        fteTotal: groupedData[key]?.reduce((a: any, b: any) => {
          return a + b.percentageAllocated;
        }, 0)
      });
    }

    //rolePId CDC =
    // DMPM = 201,
    // CDL = 202,
    //  CDC = 206,
    // Set_Up_CDL = 1824,

    var retArr = [
      { roleName: 'CDC', resourceCount: 0, fteTotal: 0 },
      { roleName: 'CDL', resourceCount: 0, fteTotal: 0 },
      { roleName: 'DMPM', resourceCount: 0, fteTotal: 0 }
    ];

    //CDC
    var cdcResourceCount = 0;
    var cdcfteTotal = 0;
    var cdc = tableArr.find(x => x.rolePId == 206);
    if (cdc) {
      cdcResourceCount = cdc.resourceCount;
      cdcfteTotal = cdc.fteTotal;
    }
    retArr[0].resourceCount = cdcResourceCount;
    retArr[0].fteTotal = cdcfteTotal;

    //CDL + SetupCDL
    var cdlResourceCount = 0;
    var cdlfteTotal = 0;
    var cdl = tableArr.find(x => x.rolePId == 202);
    if (cdl) {
      cdlResourceCount = cdl.resourceCount;
      cdlfteTotal = cdl.fteTotal;
    }
    var setUpCdlResourceCount = 0;
    var setUpCdlfteTotal = 0;
    var setUpCdl = tableArr.find(x => x.rolePId == 1824);
    if (setUpCdl) {
      setUpCdlResourceCount = setUpCdl.resourceCount;
      setUpCdlfteTotal = setUpCdl.fteTotal;
    }
    retArr[1].resourceCount = cdlResourceCount + setUpCdlResourceCount;
    retArr[1].fteTotal = cdlfteTotal + setUpCdlfteTotal;

    //DMPM
    var dmpmResourceCount = 0;
    var dmpmfteTotal = 0;
    var dmpm = tableArr.find(x => x.rolePId == 201);
    if (dmpm) {
      dmpmResourceCount = dmpm.resourceCount;
      dmpmfteTotal = dmpm.fteTotal;
    }
    retArr[2].resourceCount = dmpmResourceCount;
    retArr[2].fteTotal = dmpmfteTotal;

    // var groupedRecords: any;
    // groupedRecords = tableArr.sort(function(a, b) {
    //   return a.roleName > b.roleName ? 1 : -1;
    // });

    // return groupedRecords.filter((x: any) => x.roleName == 'CDC' || x.roleName == 'CDL' || x.roleName == 'DMPM');

    return retArr;
  }
}
