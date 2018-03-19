import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStoreService } from '../shared/app-store/app-store.service';

export interface LiveData {
  labels: string[];
  series: Array<Array<number>>;
}

export type ChartType = 'Pie' | 'Bar' | 'Line';

@Component({
  selector: 'equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css']
})
export class EquipComponent implements OnInit {
  data: LiveData;
  type: ChartType;

  city: string;
  equip: string;
  muiltyGraph: any;

  view: any[] = [700, 400];
  single: any[];
  multi: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';


  constructor(
    private route: ActivatedRoute,
    private appStore: AppStoreService
  ) { }

  ngOnInit() {


    
    this.data = <LiveData>{};
    this.data.labels = [];
    this.data.series = [[]]
    this.type = 'Line';

    this.route.params.subscribe(params => {

      this.city = params['cityName'];
      this.equip = params['equipName'];

      // if(params['equipName'] == 'all'){
      //   this.muiltyGraph = this.appStore.getCity(params['cityName']).equips;
      //   this.muiltyGraph.forEach((el, idx) => {
      //     el.timeseries.forEach((element, index) => {

      //       if(!idx){
      //         this.data.labels.push(element.hour);
      //       }

      //       if(!this.data.series[index]) this.data.series[index] = [];
      //       this.data.series[index].push(element.temperature)
      //     });
      //   })
      // } else {
      //   this.appStore.getCityDiagram(params['cityName'], params['equipName'])[0]
      //   .timeseries.forEach(element => {
      //     this.data.labels.push(element.hour);
      //     this.data.series[0].push(element.temperature)
      //   });
      // }
    });
  }

  displayEquip(data){
    let newData = {
      series: [[]],
      labels: []
    }

    data.forEach(element => {
      newData.series[0].push(element.temperature)
    });

    newData.labels =  this.data.labels;

    this.data = Object.assign({}, newData);
  }
}
