import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private socket: any;
  private stompClient: any;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {
    this.socket = new SockJS('http://localhost:8080/websocket'); // impostiamo la nostra connessione
    this.stompClient = Stomp.over(this.socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
    }, function(error: any) {
      console.error('Error: ' + error);
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    const _this = this;
    if (this.stompClient.connected) {
      this.subscribeToTopic(topic, callback);
    } else {
      this.stompClient.connect({}, function () {
        _this.subscribeToTopic(topic, callback);
      });
    }
  }

  private subscribeToTopic(topic: string, callback: (message: any) => void): void {
    this.stompClient.subscribe(topic, (message: any) => {
      console.log('Received message: ' + message.body);
      callback(message.body);
    });
  }

  send(destinazione:string, payload:string){

    let dest = `/ws/${destinazione}`;
    this.stompClient.send(dest,{}, payload);
  }
}
