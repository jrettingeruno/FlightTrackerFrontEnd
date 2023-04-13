import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CesiumService } from '../cesium.service';
import { SocketService } from '../socket.service';

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
    
    this.socket.connectToConsumer(this.cesium.flyToAndPlotPoint)
  }
}
