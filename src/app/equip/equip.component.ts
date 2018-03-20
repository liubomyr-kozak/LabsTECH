import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStoreService } from '../shared/app-store/app-store.service';

import * as d3 from 'd3'
import * as c3 from 'c3'

@Component({
  selector: 'equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EquipComponent implements OnInit {

  city: string;
  equip: string;

  chart;
  constructor(
    private route: ActivatedRoute,
    private appStore: AppStoreService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      let columns = [];
      let legendesName = [];
      this.city = params['cityName'];
      this.equip = params['equipName'];

      columns.push(['x', ...Array.from(new Array(24), (val, index) => {
        var now = new Date();
        now.setHours(index + 1, 0, 0, 0);
        return now;
      })]);

      if (params['equipName'] == 'all') {
        this.appStore.getCity(params['cityName']).equips.forEach((equipData, idx) => {
          columns.push([equipData.equip_name]);
          legendesName.push(equipData.equip_name);
          equipData.timeseries.forEach(element => {
            columns[columns.length - 1].push(d3.format(".2f")(element.temperature))
          });
        })
      } else {
        const equipData = this.appStore.getCityDiagram(params['cityName'], params['equipName'])[0];
        columns.push([equipData.equip_name]);
        legendesName.push(equipData.equip_name);
        equipData.timeseries.forEach(element => {
          columns[columns.length - 1].push(d3.format(".2f")(element.temperature))
        });
      }

      this.chart = c3.generate({
        bindto: '#lineChart',
        data: {
          x: 'x',
          columns
        },
        axis: {
          x: {
            type: 'timeseries',
            label: {
              text: 'hours',
              position: 'outer-center'
            },
            tick: {
              format: (val) => {
                return d3.time.format("%H:%M")(<Date>val);
              }
            }
          },
          y: {
            label: {
              text: 'temperature',
              position: 'outer-center'
            },
            tick: {
              format: (val) => {
                return val + '°C';
              }
            }
          }
        },
        legend: {
          show: false
        }
      });

      let that =  this;
      d3.select('.chartist-container').insert('div', '.chart').attr('class', 'legend').selectAll('span')
        .data(legendesName)
        .enter().append('span')
        .attr('data-id', function (id) { return id; })
        .attr('class', 'legend-item')
        .html(function (id) { return id; })
        .each(function (id) {
          d3.select(this)
            .append('span')
            .attr('class', 'legend-items-checkbox')
            .html('<i class="fa fa-check-square"></i>')
           
          d3.select(this)
            .append('span').attr('class', 'legend-items-color')
            .style('background-color', that.chart.color(id));
        })
        .on('mouseover', function (id) {
          that.chart.focus(id);
        })
        .on('mouseout', function (id) {
          that.chart.revert();
        })
        .on('click', function (id:string) {

          const isHide:string = d3.select(this).attr('data-hide');
          d3.select(this).attr('data-hide', !(isHide == 'true'));
        
          that.chart.toggle(id);
        })
    });
  }
}
