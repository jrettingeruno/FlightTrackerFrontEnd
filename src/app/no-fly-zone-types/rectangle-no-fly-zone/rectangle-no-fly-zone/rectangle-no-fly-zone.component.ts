import { Component } from '@angular/core';

@Component({
  selector: 'app-rectangle-no-fly-zone',
  templateUrl: './rectangle-no-fly-zone.component.html',
  styleUrls: ['./rectangle-no-fly-zone.component.css']
})
export class RectangleNoFlyZoneComponent {
  longitudeW: number;

  submitDisabled = true;


  longitudeWest(event: Event): void {
    
    // this.longitudeW = value;
    console.log(this.longitudeW)
  }
}
