import { Injectable } from '@angular/core';

declare let Cesium: any;

Cesium.Ion.defaultAccessToken = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTE4ZTAwNC1iYjY0LTQ2MmUtOTAzNi0wZDNhY2EyY2MzNTAiLCJpZCI6MTI4NTgxLCJpYXQiOjE2Nzg3NjAzNTB9.1UEATVrKMPSwbEh6ObHPAMs1L99KpJg_pKqMjVDqYDk";

@Injectable({
  providedIn: 'root'
})
export class CesiumService {

  constructor() { }
  private viewer: any;
plotPoints(div:string){
    this.viewer = new Cesium.Viewer(div);
    this.viewer.infoBox.frame.removeAttribute("sandbox");
    this.viewer.infoBox.frame.src = "about:blank";
    this.viewer.scene.requestRenderMode = true;
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-100, 41.5),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 16,
      },
    });
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
}
