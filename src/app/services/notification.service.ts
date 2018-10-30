import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private uri = 'http://localhost:4000/notification'
  constructor(private http: HttpClient) { }

  sendMessage(to:any,message:any){
    let body = {To: to, Message:message};
    return this.http.post(this.uri+'/send',body)
  }

  getmessage(id:any,type:any){
    return this.http.get(this.uri+'/messages/'+id+'/type/'+type)
  }
}
