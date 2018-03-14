import { Injectable } from '@angular/core';

const SITES = 'city';

@Injectable()
export class AppStoreService {
  private store: object = {};
  private lastSearchCityName: '';
  private lastSearchCityData: {}
  constructor() { }
  setData(key: string, data: any) {
    this.store[key] = data;
  }

  getCities() {
    return this.store[SITES];
  }

  getCity(cityName: string) {

    if (this.lastSearchCityName == cityName) {
      return this.lastSearchCityData;
    }

    return this.store[SITES].filter(city => {
      if (city.site == cityName) {
        return this.lastSearchCityData = city;
      }
    })[0];
  }
  getCityDiagram(cityName: string, equipName: string) {
    return this.getUniqueEquipData(this.store[SITES].filter(city => city.site == cityName))[0]
               .equips
               .filter(equip => equip.equip_name == equipName);
  }

  getUniqueEquipData(data) {
    let uniqueName = {};
    let uniqueData = [];
    data.forEach((item, index) => {
      if (item.equip_name in uniqueName) {
        uniqueData[uniqueName[item.equip_name]] = item;
      } else {
        uniqueData.push(item);
      }
      uniqueName[item.equip_name] = index;
    });
    return uniqueData;
  }

}
