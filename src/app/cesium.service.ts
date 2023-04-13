import { Injectable, OnInit } from '@angular/core';

declare let Cesium: any;
let global_viewer: any;
let global_coord_array: number[];

interface FlightData {
  latitude: number;
  longitude: number;
  altitude: number;
}

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTE4ZTAwNC1iYjY0LTQ2MmUtOTAzNi0wZDNhY2EyY2MzNTAiLCJpZCI6MTI4NTgxLCJpYXQiOjE2Nzg3NjAzNTB9.1UEATVrKMPSwbEh6ObHPAMs1L99KpJg_pKqMjVDqYDk";

@Injectable({
  providedIn: 'root'
})
export class CesiumService {

  constructor() { }
  private viewer: any;
  plotPoints(div: string) {
    this.viewer = new Cesium.Viewer(div);
    this.viewer.infoBox.frame.removeAttribute("sandbox");
    this.viewer.infoBox.frame.src = "about:blank";
    this.viewer.scene.requestRenderMode = true;

    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
    //   point: {
    //     color: Cesium.Color.BLUE,
    //     pixelSize: 16,
    //   },
    // });
    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
    //   point: {
    //     color: Cesium.Color.YELLOW,
    //     pixelSize: 16,
    //   },
    // });
  }

  flyToAndPlotPoint(div: string, longitude: number, latitude: number, altitude: number) {
    let coords: FlightData = {latitude: latitude, longitude: longitude, altitude: altitude}

    if (global_coord_array == undefined) {
      global_coord_array = []
    }

    global_coord_array.push(longitude)
    global_coord_array.push(latitude)
    global_coord_array.push(altitude)
    

    if (global_viewer == null || global_viewer == undefined) {
      global_viewer = new Cesium.Viewer(div)
    }
    global_viewer.infoBox.frame.removeAttribute("sandbox");
    global_viewer.infoBox.frame.src = "about:blank";
    global_viewer.scene.requestRenderMode = false;

    global_viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 16,
      },
    });


    console.log(global_coord_array)

    global_viewer.entities.add({
      name: "FlightPath",
        polyline:{
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(global_coord_array),
            width: 10,
            material: Cesium.Color.RED,
            clampToGround: false,
            },
        });



    // global_viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
    //   orientation: {
    //     heading: Cesium.Math.toRadians(0.0),
    //     pitch: Cesium.Math.toRadians(0.0),
    //   }
    // });
  }
}
