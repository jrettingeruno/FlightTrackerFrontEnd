import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RectangleNoFly } from './objects/rectangle-no-fly/rectangle-no-fly';
import { PolygonNoFly } from './objects/polygon-no-fly/polygon-no-fly';
import { EllipsoidNoFly } from './objects/ellipsoid-no-fly/ellipsoid-no-fly';
import { Component, OnInit } from '@angular/core';
import { GetNoFlyZonesResponse } from 'src/app/objects/get-no-fly-zones-response/get-no-fly-zones-response';



declare let Cesium: any;

Cesium.Ion.defaultAccessToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTE4ZTAwNC1iYjY0LTQ2MmUtOTAzNi0wZDNhY2EyY2MzNTAiLCJpZCI6MTI4NTgxLCJpYXQiOjE2Nzg3NjAzNTB9.1UEATVrKMPSwbEh6ObHPAMs1L99KpJg_pKqMjVDqYDk";

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

  constructor(private httpClient: HttpClient) {
    this.ngOnInit();
  }


    ellipsoidNoFly: EllipsoidNoFly = new EllipsoidNoFly();
    rectangleNoFly: RectangleNoFly = new RectangleNoFly();
    polygonNoFly: PolygonNoFly = new PolygonNoFly();
    getNoFlyZoneResponse: GetNoFlyZonesResponse;
private viewer: any;
  ngOnInit() {
      this.httpClient.get<GetNoFlyZonesResponse>('http://34.198.166.4:9093/get-no-fly-zones', this.httpOptions).subscribe(data => {
        this.getNoFlyZoneResponse = data;

        console.log('ELLIPSOID NO FLY ZONES')
        for (const ellipsoidNoFly of this.getNoFlyZoneResponse.ellipsoidNoFlyZones) {

          this.viewer.entities.add({
                     name: ellipsoidNoFly.name,
                     position: Cesium.Cartesian3.fromDegrees(Number(ellipsoidNoFly.longitude), Number(ellipsoidNoFly.latitude), ellipsoidNoFly.altitude),
                     ellipsoid: {
                       radii: new Cesium.Cartesian3(ellipsoidNoFly.longRadius,ellipsoidNoFly.latRadius, ellipsoidNoFly.altRadius),
                       material: Cesium.Color.RED.withAlpha(0.5),
                     }
                   });
          console.log(ellipsoidNoFly)
        }

        console.log('RECTANGLE NO FLY ZONE')
        for (const rectangleNoFly of this.getNoFlyZoneResponse.rectangleNoFlyZones) {
          this.viewer.entities.add({
            name: rectangleNoFly.name, // String name
            rectangle: {
              rotation: Cesium.Math.toRadians(Number(rectangleNoFly.rotationDegree)), // .toRadians( rotation value )
              extrudedHeight: Number(rectangleNoFly.minAltitude),                  //Minimum Height
              height: Number(rectangleNoFly.maxAltitude),
              material: Cesium.Color.fromRandom({ alpha: 0.5 }),
              coordinates: Cesium.Rectangle.fromDegrees(Number(rectangleNoFly.westLongDegree), Number(rectangleNoFly.southLatDegree), Number(rectangleNoFly.eastLongDegree), Number(rectangleNoFly.northLatDegree)),
            },
          });
          console.log(rectangleNoFly)
        }

        console.log('POLYGON NO FLY ZONE')
        for (const polygonNoFly of this.getNoFlyZoneResponse.polygonNoFlyZones) {
          this.viewer.entities.add({
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
          console.log(polygonNoFly)
        }

      })
    }




plotPoints(div:string){


    this.viewer = new Cesium.Viewer(div);
    this.viewer.infoBox.frame.removeAttribute("sandbox");
    this.viewer.infoBox.frame.src = "about:blank";
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-100, 41.5),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 16,
      },
    });

    this.rectangleNoFly.maxAltitude = 300000;
    this.rectangleNoFly.minAltitude = 100000;

    this.rectangleNoFly.name = 'rect';
    this.rectangleNoFly.westLongDegree= 80;
    this.rectangleNoFly.eastLongDegree= 90;
    this.rectangleNoFly.southLatDegree = 30;
    this.rectangleNoFly.northLatDegree = 40;
    this.rectangleNoFly.rotationDegree = 0;

    this.polygonNoFly.name = 'poly'
    this.polygonNoFly.vertex1Long = 80;
    this.polygonNoFly.vertex1Lat = 60;
    this.polygonNoFly.vertex2Long = 80;
    this.polygonNoFly.vertex2Lat = 50;
    this.polygonNoFly.vertex3Long = 70;
    this.polygonNoFly.vertex3Lat = 50;
    this.polygonNoFly.vertex4Long = 75;
    this.polygonNoFly.vertex4Lat = 60;
    this.polygonNoFly.maxAltitude = 300000;
    this.polygonNoFly.minAltitude = 100000;

    this.ellipsoidNoFly.name = 'ellip';
    this.ellipsoidNoFly.longitude = 60;
    this.ellipsoidNoFly.latitude = 50;

    this.ellipsoidNoFly.altitude = 200000;
    this.ellipsoidNoFly.longRadius = 80000;
    this.ellipsoidNoFly.latRadius = 80000;
    this.ellipsoidNoFly.altRadius = 80000;



//console.log("Rotation: " + Number(this.rectangleNoFly.rotationDegree))
    let addedShape = this.viewer.entities.add({
                  name: this.rectangleNoFly.name, // String name
                  rectangle: {
                    rotation: Cesium.Math.toRadians(Number(this.rectangleNoFly.rotationDegree)), // .toRadians( rotation value )
                    extrudedHeight: Number(this.rectangleNoFly.minAltitude),                  //Minimum Height
                    height: Number(this.rectangleNoFly.maxAltitude),
                    material: Cesium.Color.fromRandom({ alpha: 0.5 }),
                    coordinates: Cesium.Rectangle.fromDegrees(Number(this.rectangleNoFly.westLongDegree), Number(this.rectangleNoFly.southLatDegree), Number(this.rectangleNoFly.eastLongDegree), Number(this.rectangleNoFly.northLatDegree)),
                  },
                });
    let vertPositions = []
    vertPositions.push(this.polygonNoFly.vertex1Long)
    vertPositions.push(this.polygonNoFly.vertex1Lat)
    vertPositions.push(this.polygonNoFly.maxAltitude)
    vertPositions.push(this.polygonNoFly.vertex2Long)
    vertPositions.push(this.polygonNoFly.vertex2Lat)
    vertPositions.push(this.polygonNoFly.maxAltitude)
    vertPositions.push(this.polygonNoFly.vertex3Long)
    vertPositions.push(this.polygonNoFly.vertex3Lat)
    vertPositions.push(this.polygonNoFly.maxAltitude)
    vertPositions.push(this.polygonNoFly.vertex4Long)
    vertPositions.push(this.polygonNoFly.vertex4Lat)
    vertPositions.push(this.polygonNoFly.maxAltitude)
    addedShape = this.viewer.entities.add({
              name: this.polygonNoFly.name, //String Name

              polygon: {
                hierarchy: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(vertPositions),
                            //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
                },
                extrudedHeight: this.polygonNoFly.minAltitude, //int minimum height
                perPositionHeight: true,
                material: Cesium.Color.RED.withAlpha(0.5),

              },
            });
/*
    addedShape = this.viewer.entities.add({
              name: this.ellipsoidNoFly.name,
              position: Cesium.Cartesian3.fromDegrees(Number(this.ellipsoidNoFly.longitude), Number(this.ellipsoidNoFly.latitude), this.ellipsoidNoFly.altitude),
              ellipsoid: {
                radii: new Cesium.Cartesian3(this.ellipsoidNoFly.longRadius, this.ellipsoidNoFly.latRadius, this.ellipsoidNoFly.altRadius),
                material: Cesium.Color.PINK.withAlpha(0.5),
              }
            })

    for(let i = 0; i < ellipsoidNoFly.length; i++){
        this.viewer.entities.add({
           name: ellipsoidNoFly[i].name,
           position: Cesium.Cartesian3.fromDegrees(Number(ellipsoidNoFly[i].longitude), Number(ellipsoidNoFly[i].latitude), ellipsoidNoFly[i].altitude),
           ellipsoid: {
             radii: new Cesium.Cartesian3(ellipsoidNoFly[i].longRadius,ellipsoidNoFly[i].latRadius, ellipsoidNoFly[i].altRadius),
             material: Cesium.Color.RED.withAlpha(0.5),
           }
         });
    }*/
    let yep = {
       name: "point1",
       position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
       point: {
         color: Cesium.Color.BLUE,
         pixelSize: 16,
       },
     };
     this.viewer.entities.add(yep);
     let testShape = {
            name: "point2",
            position: Cesium.Cartesian3.fromDegrees(-80.6, 35.14),
            point: {
              color: Cesium.Color.BLUE,
              pixelSize: 16,
            },
          };
     this.viewer.entities.add(testShape);
addedShape = this.viewer.entities.add({
name: "Test",
  polyline:{
      positions: Cesium.Cartesian3.fromDegreesArray([-80.6, 35.14, -80.5, 35.14]),
      //positions: Cesium.Cartesian3.fromDegreesArray([addedShape1.position, addedShape.position]),
      width: 10,
      material: Cesium.Color.RED,
      clampToGround: true,
      },
  });

 //If a enity was added the viewer will fly to it


if (addedShape != null) {
      this.viewer.flyTo(addedShape);
    }


/* The code in this block is for code milestone 3 to read all military bases from geojson text

    const testData = JSON.parse(geojson);

    let coords = testData.features;
          let teststr

          for (let i = 0; i < coords.length; i++) {

            teststr = coords[i].geometry.coordinates.toString();
            let testarr = teststr.split(',')

            for(let i = 0; i < testarr.length; i++){
              testarr[i] = parseFloat(testarr[i])
            }
            this.viewer.entities.add({
              name: coords[i].properties.INSTALLATI,

              polygon: {
                hierarchy: {
                  positions: Cesium.Cartesian3.fromDegreesArray(
                    testarr
                  ),
                },

                extrudedHeight: 100000,

                material: Cesium.Color.RED.withAlpha(0.5),
                outline: false,
                outlineColor: Cesium.Color.BLACK,
              },
            });
          }

 -----------------------------End of Block--------------------------------------*/

//     this.viewer.entities.add({
//       position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
//       point: {
//         color: Cesium.Color.BLUE,
//         pixelSize: 16,
//       },
//     });
    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
    //   point: {
    //     color: Cesium.Color.YELLOW,
    //     pixelSize: 16,
    //   },
    // });
  }
}
