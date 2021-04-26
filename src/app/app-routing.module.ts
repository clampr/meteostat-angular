import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherStationComponent } from './weather-station/weather-station.component';

const routes: Routes = [
  {
    path: 'station/:stationId',
    component: WeatherStationComponent
  },
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
