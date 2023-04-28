import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CesiumService } from '../cesium.service';
import { SocketService } from '../socket.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-cesium-component',
  templateUrl: './cesium-component.component.html',
  styleUrls: ['./cesium-component.component.css']
})
export class CesiumComponentComponent implements OnInit {
  
  id!: string | null;


  constructor(
    private cesium: CesiumService,
    private route: ActivatedRoute,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      console.log(this.id);
    })

    //console.log("CESIUM SERVICE: " + this.cesium);

    // this.socket.connectToConsumer(this.cesium.flyToAndPlotPoint)
    this.socket.connectToConsumer();
  }

  hideEllip(event: string) {
    this.cesium.hideEllipsoidNoFlyz();
  }

  hideRect(event: string) {
    this.cesium.hideRectangleNoFlyz();
  }

  hidePoly(event: string) {
    this.cesium.hidePolygonNoFlys();
  }

}
