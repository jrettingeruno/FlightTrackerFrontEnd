import { Injectable } from '@angular/core';

import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import '../polyfills'
import { CesiumService } from './cesium.service';
import { FlightDetails } from './objects/flight-details/flight-details';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private cesium: CesiumService) { }
  private stompClient: any;

  connectToConsumer() {
    const socket = new SockJS('http://localhost:9093/consumer-socket');
    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/liveCoords', (data: { body: string; }) => {
        console.log(data)
        console.log(data.body)

        let jsonDataObj = JSON.parse(data.body);
        if (jsonDataObj.error) {
          console.log("An error response was received from the Producer. Nothing will be updated. Error Details: " + jsonDataObj.error)
          //TODO:Create an error response dialog or something like that
          return;
        }

        interface flightData {
          latitude: number;
          longitude: number;
          altitude: number;
        }
        

        let airlineName: string = jsonDataObj.airline;
        let flightIcao: string = jsonDataObj.icao;
        let flightLabel: string = airlineName + "-" + flightIcao;

        
        let liveObj: flightData = JSON.parse(jsonDataObj.live)
                
        console.log(liveObj)
        console.log("ALT: " + liveObj.altitude);
        console.log("LAT: " + liveObj.latitude);
        console.log("LONG: " + liveObj.longitude);
        console.log("Airline Name: " + airlineName);
        console.log("Flight Icao: ", flightIcao);

        this.cesium.updateFlightsAndZones("cesium", liveObj.longitude, liveObj.latitude, liveObj.altitude, flightLabel, jsonDataObj);
      })
    })
  }
}
