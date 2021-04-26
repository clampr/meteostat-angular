import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-weather-station',
  templateUrl: './weather-station.component.html',
  styleUrls: ['./weather-station.component.scss']
})

export class WeatherStationComponent implements OnInit {

  // Meta data for weather station
  station: any = {};

  // List of weather observations
  weatherData: any = [];

  // Default start & end data
  defaultStartDate: Date = new Date('2020-01-01');
  defaultEndDate: Date = new Date('2020-01-31');

  // List of columns
  displayedColumns: string[] = ['date', 'tavg', 'tmin', 'tmax', 'prcp', 'snow', 'wdir', 'wspd', 'wpgt'];

  // The constructor
  constructor(
    private route: ActivatedRoute
  ) {}

  // Get meta data on init
  ngOnInit(): void {
    this.getStationMetaData();
  }

  // Talk to meta data API endpoint
  getStationMetaData(): void {
    const identifier: String|null = this.route.snapshot.paramMap.get('stationId');
    if (identifier !== null && identifier.length === 5) {
      const stations = ajax({
        url: `https://api.meteostat.net/v2/stations/meta?id=${identifier}`,
        method: 'GET',
        headers: {
          'x-api-key': '5Mjn4YZoS7bvsuYGYyhfafZJJqNH0z58'
        },
      });

      stations.subscribe(
        res => {
          this.station = res.response.data;
          this.getWeatherData(
            this.defaultStartDate.toISOString().substr(0, 10),
            this.defaultEndDate.toISOString().substr(0, 10)
          );
        },
        err => console.error(err)
      );
    }
  }

  // Set the date range
  setDateRange(start: HTMLInputElement, end: HTMLInputElement) {
    if (end.value) {
      const startDate: Date = new Date(start.value);
      const endDate: Date = new Date(end.value);

      const startDateString = startDate.toISOString().substr(0, 10);
      const endDateString = endDate.toISOString().substr(0, 10);

      this.getWeatherData(startDateString, endDateString);
    }
  }

  // Get weather data for date range
  getWeatherData(start: String, end: String) {
    if (end) {
      const weatherData = ajax({
        url: `https://api.meteostat.net/v2/stations/daily?station=${this.station.id}&start=${start}&end=${end}`,
        method: 'GET',
        headers: {
          'x-api-key': '5Mjn4YZoS7bvsuYGYyhfafZJJqNH0z58'
        },
      });

      weatherData.subscribe(
        res => {
          this.weatherData = res.response.data;
        },
        err => console.error(err)
      );
    }
  }
}
