import { Component, OnInit } from '@angular/core';
import { FlightDetails } from 'src/app/objects/flight-details/flight-details';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit{
    flightDetails: FlightDetails = new FlightDetails(1, 'BA240', -100.000, 41.500, 17000, 540, 
    'LA, California', 'yesterday','Detroit, Michigan', 'tomorrow', 'Nebraska', false );

    ngOnInit(){
    }
}
