import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnChanges {

  // Search term
  @Input('term') term: string;
  
  // List of results
  results: any = [];

  // Find station when term changes
  ngOnChanges(changes: SimpleChanges) {
    const term: SimpleChange = changes.term;
    if(term.currentValue.length > 2){
      const stations = ajax({
        url: `https://api.meteostat.net/v2/stations/search?query=${term.currentValue}`,
        method: 'GET',
        headers: {
          'x-api-key': '5Mjn4YZoS7bvsuYGYyhfafZJJqNH0z58'
        },
      });

      const subscribe = stations.subscribe(
        res => {
          this.results = res.response.data;
        },
        err => console.error(err)
      );
    } else {
      this.results = []
    }
  }

}
