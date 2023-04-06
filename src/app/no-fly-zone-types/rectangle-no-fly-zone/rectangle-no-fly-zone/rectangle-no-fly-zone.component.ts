import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RectangleNoFly } from 'src/app/objects/rectangle-no-fly/rectangle-no-fly';
import { NoFlyZoneSubmittedComponent } from '../../no-fly-zone-submitted/no-fly-zone-submitted/no-fly-zone-submitted.component';

@Component({
  selector: 'app-rectangle-no-fly-zone',
  templateUrl: './rectangle-no-fly-zone.component.html',
  styleUrls: ['./rectangle-no-fly-zone.component.css']
})
export class RectangleNoFlyZoneComponent {

  rectangleNoFly = new RectangleNoFly();
  buttonDisabled = true;

  name: string = '';
  westLongDegree: string = '';
  eastLongDegree: string = '';
  southLatDegree: string = '';
  northLatDegree: string = '';
  rotationDegree: string = '';
  maxAltitude: number;
  minAltitude: number;

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
  private dialog: MatDialog,
  private httpClient: HttpClient) {}

  changeName(event: Event): void {
    this.rectangleNoFly.name = this.name;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeWestLongDegree(event: Event): void {
    this.rectangleNoFly.westLongDegree = this.westLongDegree;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeEastLongDegree(event: Event): void {
    this.rectangleNoFly.eastLongDegree = this.eastLongDegree;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeSouthLatDegree(event: Event): void {
    this.rectangleNoFly.southLatDegree = this.southLatDegree;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeNorthLatDegree(event: Event): void {
    this.rectangleNoFly.northLatDegree = this.northLatDegree;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeRotationDegree(event: Event): void {
    this.rectangleNoFly.rotationDegree = this.rotationDegree;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeMaxAltitude(event: Event): void {
    this.rectangleNoFly.maxAltitude = this.maxAltitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeMinAltitude(event: Event): void {
    this.rectangleNoFly.minAltitude = this.minAltitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  checkForCompleteNoFlyZoneObject(): boolean{
    console.log(this.rectangleNoFly)
    if (
      this.rectangleNoFly.name != null &&
      this.rectangleNoFly.westLongDegree != null &&
      this.rectangleNoFly.eastLongDegree != null &&
      this.rectangleNoFly.southLatDegree != null &&
      this.rectangleNoFly.northLatDegree != null &&
      this.rectangleNoFly.rotationDegree != null &&
      this.rectangleNoFly.maxAltitude != null &&
      this.rectangleNoFly.minAltitude != null
    ){
      return false
    } else {
      return true;
    }
  }

  submit(): void {
    // TODO
    //WILL MAKE HTTP CALL TO ADD NO FLY ZONE
    this.httpClient.post<string>('http://34.198.166.4:9093/addNoFlyZone/rectangle',
     this.rectangleNoFly, this.httpOptions).subscribe( data => {
      console.log(data);
    })
    console.log('Here is your no flyzone', this.rectangleNoFly);
    const dialogRef = this.dialog.open(NoFlyZoneSubmittedComponent, {
      width: '250px'
    })

  }
}
