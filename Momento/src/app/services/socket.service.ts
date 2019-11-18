import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket : any;
  readonly uri:string='http://localhost:3000';

  constructor() { 
    this.socket = io(this.uri);
   }

  listen(eventName:string){
    return new Observable(subscriber=>{
      this.socket.on(eventName,(data:{message:string,handle:string})=>{
        subscriber.next(data);
      });
    });
  }

  emit(eventName:string, data){
    this.socket.emit(eventName,data);
  }
}
