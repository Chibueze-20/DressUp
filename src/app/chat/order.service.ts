import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private uri = 'http://localhost:4000/order'
  private chat_uri = 'http://localhost:4000/chat'
  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get(this.uri+'/active/all')
  }
  getChat(orderid){
    return this.http.get(this.chat_uri+'/order/chat/'+orderid)
  }
  getOrder(id){
    return this.http.get(this.uri+'/'+id)
  }
  updateSize(id,body){
    return this.http.post(this.uri+'/size/'+id,body)
  }
  updateOrder(id,body){
    return this.http.post(this.uri+'/update/'+id,body)
  }
  updateChat(id,body){
    return this.http.post(this.chat_uri+'/all/update/'+id,body)
  }
}
