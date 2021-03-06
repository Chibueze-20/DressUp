import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:4100';
  private socket;
  constructor() { 
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public sendWidget(message){
    this.socket.emit('widget-message',message)
  }

  public getMessages = (chat_id) =>{
    return Observable.create((observer) =>{
      this.socket.on('new-message-'+chat_id, (message) =>{
        observer.next(message);
      });
      // this.socket.on('widget-message',(message) =>{
      //   observer.next(message);
      // });
    });
  }
}
