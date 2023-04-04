import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Flight } from 'src/app/objects/flight/flight';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnChanges {

  search: string = '';

  flightList = [
    new Flight(1, 'NE4512'), new Flight(2, 'OM654'), new Flight(3, 'TEX543'), new Flight(3, 'DEN543'), new Flight(3, 'JFK543'), new Flight(3, 'FLA543'), new Flight(3, 'ALK543'), new Flight(3, 'NY543'), new Flight(3, 'PEN543')
  ]

  filteredFlightList?: Flight[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<string>('http://34.198.166.4/hello_world').subscribe( data  => {
      console.log(data);
    })
    this.filteredFlightList = this.flightList;
    console.log(this.flightList);
  }

  ngOnChanges(): void{
    console.log('t')
  }

  filter(event: Event): void{
    console.log(event);
    this.filteredFlightList = [];
    for (const flight of this.flightList){
      if(flight.flightNumber?.includes(this.search)){
        // console.log(flight)
        this.filteredFlightList?.push(flight);
      }
    }
  }

}
