import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RectangleNoFly } from './objects/rectangle-no-fly/rectangle-no-fly';
import { PolygonNoFly } from './objects/polygon-no-fly/polygon-no-fly';
import { EllipsoidNoFly } from './objects/ellipsoid-no-fly/ellipsoid-no-fly';
import { GetNoFlyZonesResponse } from './objects/get-no-fly-zones-response/get-no-fly-zones-response';
import { getNoFlyZonesConflictResponse } from './objects/get-no-fly-zones-conflict-response/get-no-fly-zones-conflict-response';
import { Observable, tap } from 'rxjs';
import { GetFlightLocationResponse } from './objects/get-flight-location-response/get-flight-location-response';

declare let Cesium: any;
//let global_viewer: any;
//let global_coord_array: number[];
//let global_coord_map: Map<string, number[]>;

// Cesium.Ion.defaultAccessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTE4ZTAwNC1iYjY0LTQ2MmUtOTAzNi0wZDNhY2EyY2MzNTAiLCJpZCI6MTI4NTgxLCJpYXQiOjE2Nzg3NjAzNTB9.1UEATVrKMPSwbEh6ObHPAMs1L99KpJg_pKqMjVDqYDk";
Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzIyMjA2MC02ZDY2LTQ1YmUtYjc0Yi05MzFhY2ViZWNkMWUiLCJpZCI6MTIzOTU4LCJpYXQiOjE2NzU4OTY5MzV9.iWKvQ4p-2joQPJ4o3vMeT3HDeBkyKb5ijeA87NEppa4";

@Injectable({
  providedIn: 'root'
})
export class CesiumService {

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

  // Needed so you can add params to http calls without messing up other service calls
  httpHeaders= new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'key': 'x-api-key',
    'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

  })

  constructor(public httpClient: HttpClient) {
  }

  ellipsoidNoFly: EllipsoidNoFly = new EllipsoidNoFly();
  rectangleNoFly: RectangleNoFly = new RectangleNoFly();
  polygonNoFly: PolygonNoFly = new PolygonNoFly();
  getNoFlyZoneResponse: GetNoFlyZonesResponse;
  getNoFlyZoneConflictResponse: getNoFlyZonesConflictResponse;
  prevFlightLabel: string;
  global_viewer: any;
  global_coord_map: Map<string, number[]> = new Map<string, number[]>();
  conflictFlights: string[];
  pointsMap: Map<string,any[]> = new Map<string, any[]>();

  public updateFlightsAndZones(div: string, longitude: number, latitude: number, altitude: number, flightLabel: string): void {
    // Sets up cesium viewer
    this.setUpViewer(div);

    // Load all no custom fly zones from database into cesium
    this.getAndLoadNoFlyZones();
    // Plots new flight point
    this.flyToAndPlotPoint(longitude, latitude, altitude, flightLabel);

    
  }

  public setUpViewer(div: string): void {
    // Setting up viewer. Checks to make sure it doesn't exist before creating a new one
    if (this.global_viewer == null || this.global_viewer == undefined) {
      this.global_viewer = new Cesium.Viewer(div, {
        animation: false,
        timeline: false
      })

      this.global_viewer.infoBox.frame.removeAttribute("sandbox");
      this.global_viewer.infoBox.frame.src = "about:blank";
      this.global_viewer.scene.requestRenderMode = false;
    }
  }

  private checkInNoFly(longitude: number, latitude: number, altitude: number, flightLabel: string): Observable<getNoFlyZonesConflictResponse> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("longitude", longitude);
    queryParams = queryParams.append("latitude", latitude);
    queryParams = queryParams.append("altitude", altitude);
    

      return this.httpClient.get<getNoFlyZonesConflictResponse>('http://34.198.166.4:9093/getInNoFlyZone', {
        headers: this.httpHeaders,
        params: queryParams
      }).pipe( tap(response => {
          this.getNoFlyZoneConflictResponse = response;
        })
      );
        
  }

  private getFlightLocation(longitude: number, latitude: number, flightLabel: string): Observable<GetFlightLocationResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("longitude", longitude);
    queryParams = queryParams.append("latitude", latitude);

    return this.httpClient.get<GetFlightLocationResponse>('http://34.198.166.4:9093/getFlightLocation', {
        headers: this.httpHeaders,
        params: queryParams
      }).pipe( tap(response => {
          console.log("Flight location response recieved" + response.location)
        })
      );
  }

 
  public getAndLoadNoFlyZones(): void {

    // Code for adding a model plane into Cesium
    // It's only in this function because this is where I got it to work
    // I'll move it soon - Justin Kenney
    makePlane(this.global_viewer).then(function (result){
      return result;
    });
      async function makePlane(view: any) {
        const pUri = await Cesium.IonResource.fromAssetId(1662340);
        let airplane = view.entities.add({

          position: new Cesium.Cartesian3.fromDegrees(-80, 40, 10000),
          model: {
            uri: pUri,
            scale: 1000,
          },

        });
        //view.flyTo(airplane);
        return airplane;
      }
      

    
    console.log("INSIDE NO FLY ZONES")
    this.httpClient.get<GetNoFlyZonesResponse>('http://34.198.166.4:9093/get-no-fly-zones', this.httpOptions).subscribe(data => {
      this.getNoFlyZoneResponse = data;
      // console.log("Response:" + this.getNoFlyZoneResponse);

      console.log('ELLIPSOID NO FLY ZONES')
      for (const ellipsoidNoFly of this.getNoFlyZoneResponse.ellipsoidNoFlyZones) {

        this.global_viewer.entities.add({
          name: ellipsoidNoFly.name,
          position: Cesium.Cartesian3.fromDegrees(Number(ellipsoidNoFly.longitude), Number(ellipsoidNoFly.latitude), ellipsoidNoFly.altitude),
          ellipsoid: {
            radii: new Cesium.Cartesian3(ellipsoidNoFly.longRadius, ellipsoidNoFly.latRadius, ellipsoidNoFly.altRadius),
            material: Cesium.Color.RED.withAlpha(0.5),
          }
        });
        // console.log(ellipsoidNoFly)
      }

      console.log('RECTANGLE NO FLY ZONE')
      for (const rectangleNoFly of this.getNoFlyZoneResponse.rectangleNoFlyZones) {
        this.global_viewer.entities.add({
          name: rectangleNoFly.name, // String name
          rectangle: {
            rotation: Cesium.Math.toRadians(Number(rectangleNoFly.rotationDegree)), // .toRadians( rotation value )
            extrudedHeight: Number(rectangleNoFly.minAltitude),                  //Minimum Height
            height: Number(rectangleNoFly.maxAltitude),
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
            coordinates: Cesium.Rectangle.fromDegrees(Number(rectangleNoFly.westLongDegree), Number(rectangleNoFly.southLatDegree), Number(rectangleNoFly.eastLongDegree), Number(rectangleNoFly.northLatDegree)),
          },
        });
        // console.log(rectangleNoFly)
      }

      console.log('POLYGON NO FLY ZONE')
      for (const polygonNoFly of this.getNoFlyZoneResponse.polygonNoFlyZones) {
        this.global_viewer.entities.add({
          name: polygonNoFly.name, //String Name

          polygon: {
            hierarchy: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                polygonNoFly.vertex1Long, polygonNoFly.vertex1Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex2Long, polygonNoFly.vertex2Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex3Long, polygonNoFly.vertex3Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex4Long, polygonNoFly.vertex4Lat, polygonNoFly.maxAltitude,
              ]),
              //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
            },
            extrudedHeight: polygonNoFly.minAltitude, //int minimum height
            perPositionHeight: true,
            material: Cesium.Color.RED.withAlpha(0.5),

          },
        });
        // console.log(polygonNoFly)
      }
      
    })
  }

  

  flyToAndPlotPoint(longitude: number, latitude: number, altitude: number, flightLabel: string) {
    let conflictResponse: string = "";
    if (!this.global_coord_map.has(flightLabel)) {
      this.global_coord_map.set(flightLabel, []);
    }
    if(!this.pointsMap.has(flightLabel)) {
      this.pointsMap.set(flightLabel, []);
    }


    let current_coord_arr: number[] | undefined = this.global_coord_map.get(flightLabel);
    let prev_entity_point: any[] | undefined = this.pointsMap.get(flightLabel);
    let prevVals: number[] | undefined;
    let prevLong: number = 0;
    let prevLat: number = 0;
    let prevAlt: number = 0;
    let location_has_changed: boolean = true;

    if (current_coord_arr != undefined && current_coord_arr?.length > 0) {
      prevVals = current_coord_arr?.slice(Math.max(current_coord_arr.length - 3, 0));
      console.log("sliced array: " + prevVals);

      if (prevVals.length == 3) {
        prevLong = prevVals[0];
        prevLat = prevVals[1];
        prevAlt = prevVals[2];
        location_has_changed = longitude != prevLong || latitude != prevLat || altitude != prevAlt;
        console.log("location_has_changed: " + location_has_changed)
      }
    }
    


    if (location_has_changed) {
      if (current_coord_arr != undefined) {
        current_coord_arr.push(longitude);
        current_coord_arr.push(latitude);
        current_coord_arr.push(altitude);
      }

      
    }

    console.log("Coordinate Objects");
    console.log(this.global_coord_map);
    console.log(current_coord_arr);

    // Adding a point to mark location
    // If conflict response string is not empty add warning description to object 
    var splitStr = flightLabel.split("-");
    
    var point = this.global_viewer.entities.add({
      name: "Flight ICAO: " + splitStr[1],
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
      point: {
        color: Cesium.Color.GREEN,
        pixelSize: 16,
      },
      
      
    });

    if(prev_entity_point != undefined && prev_entity_point?.length > 0 ) {
      this.global_viewer.entities.remove(prev_entity_point.pop())
    }
    
    if(prev_entity_point != undefined && prev_entity_point.length <= 0) {
      prev_entity_point.push(point);
    }
    

    // Making a line with the stored coordinates
    this.global_viewer.entities.add({
      name: flightLabel,
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(current_coord_arr),
        width: 10,
        material: Cesium.Color.PURPLE,
        clampToGround: false,
      },
    });
    // function drawImage(id) {
    //   const canvas = document.createElement('canvas');
    //   const context2D = canvas.getContext('2d');


    // }
    this.getFlightLocation(longitude, latitude, flightLabel).subscribe( response => {

      this.checkInNoFly(longitude, latitude, altitude, flightLabel).subscribe(
        data => {
          console.log("CONFILCIT RESPONSE STRING: " + conflictResponse);
          if(data.inConflict) {
            point.description= '<p> Flight ICAO: '+splitStr[1] +' is in no fly zone: ' + data.noFlyZoneName + '<br>\
            For Airline: ' + splitStr[0] + '</p><br> Flight location is over ' + response.location;
            this.global_viewer.selectedEntity = point;
            point.billboard = {
              image: "/assets/images/WarningLabel.png",
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0,25),
              width: 57,
              height: 15,
            };
          } else {
            point.description= '<p> Flight ICAO: '+splitStr[1] + ' is over ' + response.location;
          }
        }
      )
    })
    

    // If the location is new, fly to the point
    // if (location_has_changed) {
    //   this.global_viewer.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 1000000),
    //     orientation: {
    //       heading: Cesium.Math.toRadians(90.0),
    //       pitch: Cesium.Math.toRadians(0.0)
    //     }
    //   });
    // }

    // if (location_has_changed) {
    //   this.global_viewer.flyTo(point);
    // }
  }

}
