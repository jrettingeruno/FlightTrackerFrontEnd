import { Component, OnChanges, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cesium-test',
  templateUrl: './cesium-test-page.component.html',
  styleUrls: ['./cesium-test-page.component.css']
})
export class CesiumTestComponent implements OnInit, OnChanges {

  search: string = '';
  fligth_icao_list: string[] = [];
  are_flights_visible: boolean = true;

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
  

  constructor(

    private httpClient: HttpClient) {}

  getLiveFlightIcaos(): void {
    this.httpClient.get<string>('http://localhost:9091/flighticao/getLive', this.httpOptions).subscribe( data => {
    console.log(JSON.parse(JSON.stringify(data)).icaos)  
    this.fligth_icao_list = JSON.parse(JSON.stringify(data)).icaos.split(",");
    })

  }

  ngOnInit(): void {
    this.getLiveFlightIcaos();
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

}

