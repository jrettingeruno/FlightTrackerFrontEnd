import { Component, OnChanges, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerateFlightRequest } from '../objects/generate-flight/generate-flight-request';
import { MatDialog } from '@angular/material/dialog';
import { FlightGenerateDialog } from '../flight-generate-dialog/flight-generate-dialog.component';
import { CesiumService } from '../cesium.service';

@Component({
  selector: 'app-cesium-showcase',
  templateUrl: './cesium-showcase-page.component.html',
  styleUrls: ['./cesium-showcase-page.component.css']
})
export class CesiumShowcaseComponent implements OnInit, OnChanges {

  search: string = '';
  flight_icao_list: string[] = [];
  are_flights_visible: boolean = true;
  gen_airline_name: string;
  gen_flight_icao: string;
  gen_degreeOfChange: number;
  gen_longitude: number;
  gen_latitude: number;
  gen_altitude: number;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'key': 'x-api-key',
      'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

    })
  };
  

  constructor(private httpClient: HttpClient, 
    public dialog: MatDialog,
    private cesium: CesiumService) {}

  getLiveFlightIcaos(): void {
    this.httpClient.get<string>('http://localhost:9091/flighticao/getLive', this.httpOptions).subscribe( data => {
    console.log(JSON.parse(JSON.stringify(data)).icaos)  
    this.flight_icao_list = JSON.parse(JSON.stringify(data)).icaos.split(",");
    })

  }

  ngOnInit(): void {
    this.getLiveFlightIcaos();
    this.cesium.setUpViewer("cesium");
    this.cesium.getAndLoadNoFlyZones();
  }

  ngOnChanges(): void {
    console.log('t')
  }

  setFlightIcao(icao:string) : void {
    this.search = icao;
  }

  getFlightInfo(): void {
    console.log("getting Flight Info")
    this.httpClient.get<string>('http://localhost:9091/flighticao/' + this.search, this.httpOptions).subscribe( data => {
      console.log(data);
    })
    this.are_flights_visible = false;
  }

  toggleFlightsVisible(): void {
    this.are_flights_visible = !this.are_flights_visible;
  }

  generateMockFlight(): void {
    this.are_flights_visible = false;
    let generateRequest: GenerateFlightRequest = new GenerateFlightRequest();
    const dialogRef = this.dialog.open(FlightGenerateDialog, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      generateRequest.setAirlineName(result.airline);
      generateRequest.setFlightIcao(result.icao);
      generateRequest.setLongitude(result.longitude);
      generateRequest.setLatitude(result.latitude);
      generateRequest.setAltitude(result.altitude);
      
      generateRequest.setLongitudeChange(result.longChange)
      generateRequest.setLatitudeChange(result.latChange)
      generateRequest.setAltitudeChange(result.altChange)

      this.httpClient.post<string>('http://localhost:9091/flighticao/generate/', generateRequest, this.httpOptions).subscribe(data => {
      console.log(data);
    })
    })
  }

}
