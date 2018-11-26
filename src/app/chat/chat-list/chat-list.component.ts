import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  orders:any[] = []
  constructor(private service:OrderService) { }

  ngOnInit() {
    this.service.getOrders()
    .subscribe(
      (res:any[])=>{this.orders = res;console.log(this.orders);}
      ,err=>alert('err')
    )
    
  }

 get Orders(){
   if(this.orders){
     if(AppComponent.User.Role === 'User'){
      return this.orders.filter((order)=>order.Order.Request.User === AppComponent.User._id)
     }else{
      return this.orders.filter((order)=>order.Order.Tailor._id === AppComponent.User._id)
     }
   }
 }
 daysleft(date,duration){
   let start = Date.parse(date);
   let now = Date.now();
   let end = start + (duration *24*60*60*1000);
   let diff =  end - now;
   let dd = (diff/(1000*24*60*60));
   console.log(start,now,end,diff,dd)
   return dd.toFixed(0);
 }

}
