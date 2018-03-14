import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbardComponent } from './dashbard/dashbard.component';
import { CityComponent } from './city/city.component';
import { CitiesResolver } from './app.resolver';
import { EquipComponent } from './equip/equip.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashbardComponent,
      },
      { path: 'city/:cityName', component: CityComponent },
      { path: 'city/:cityName/diagram/:equipName', component: EquipComponent },
    ],
    resolve: {
      cities: CitiesResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CitiesResolver]
})
export class AppRoutingModule { }
