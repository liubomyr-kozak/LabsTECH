import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { AppStoreService } from './shared/app-store/app-store.service';

@Injectable()
export class CitiesResolver implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private appStore: AppStoreService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this.http.get(`/api/sitesdata`).mergeMap((data: string) => {
      this.appStore.setData('city', data);
      return of(data);
    })
  }
}
