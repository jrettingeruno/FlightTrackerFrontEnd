import { Injectable } from '@angular/core';

import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import '../polyfills'


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  constructor() { }
  private stompClient: any;

  connect(func:Function) {
    const socket = new SockJS('http://localhost:9093/consumer-socket');
    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.connect({},  (frame:any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/liveCoords', function (data:any) {
        const values = JSON.parse(data.body).content.split(',');
        func(values[0], values[1], values[2]);
      })
    })
  }

}
