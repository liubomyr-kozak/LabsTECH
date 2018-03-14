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
      console.log(this.appStore.getCityDiagram(params['cityName'], params['equipName']));

      debugger
      this.appStore.getCityDiagram(params['cityName'], params['equipName'])[0]
        .timeseries.forEach(element => {
          this.data.labels.push(element.hour);
          this.data.series[0].push(element.temperature)
        });
    });
  }
}
