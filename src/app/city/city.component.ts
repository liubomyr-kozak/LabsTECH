import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppStoreService } from '../shared/app-store/app-store.service';

import { DatePipe, DecimalPipe} from '@angular/common';

const tableColMap = {
  equip_name: 'Name',
  time: 'Last Update',
  timeseries: 'Time',
  S3avg: 'S3 Ang',
  S4avg: 'S4 avg',
  TempAvg: 'Temp Avg',
}

interface ICity {
  site: string;
  equips: any[];
}

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  public City: ICity = <ICity>{};
  public CityTable: any = {
    colName: []
  }

  constructor(
    private route: ActivatedRoute,
    private appStore: AppStoreService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) { }
  ngOnInit() {

    this.route.params.subscribe(params => {
      let cityStoreData = this.appStore.getCity(params['cityName']);
      let uniqueData = this.appStore.getUniqueEquipData(cityStoreData.equips)
    
      this.City['equips'] = this.setCorrectFormateToData(uniqueData);
      this.City['site'] = cityStoreData.site;

      this.CityTable.columnDefs = Object.keys(this.City.equips[0]);
      this.CityTable.columnName = this.CityTable.columnDefs.map(key => tableColMap[key]);
    });
  }

  setCorrectFormateToData(data) {
    return data.map(item => {
      let newItem = {};
      newItem["equip_name"] = item["equip_name"];
      newItem["time"] = this.datePipe.transform(item["time"], 'yyyy-MM-dd');
      newItem["timeseries"] = this.datePipe.transform(item["time"], 'HH:MM:SS');
      newItem["S3avg"] = this.decimalPipe.transform(item["S3avg"], '2.1-2');
      newItem["S4avg"] = this.decimalPipe.transform(item["S4avg"], '2.1-2');
      newItem["TempAvg"] = this.decimalPipe.transform(item["TempAvg"], '2.1-2');

      return newItem;
    });
  }

  showAll(){
    debugger
  }
}
