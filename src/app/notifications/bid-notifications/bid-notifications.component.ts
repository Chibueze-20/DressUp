import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AppComponent } from 'src/app/app.component';
import { MyWindow } from 'src/app/shared/windowAlert';
import { RequestserviceService } from 'src/app/services/requestservice.service';
import { BidService } from 'src/app/services/bid.service';
declare let window:MyWindow
@Component({
  selector: 'app-bid-notifications',
  templateUrl: './bid-notifications.component.html',
  styleUrls: ['./bid-notifications.component.css']
})
export class BidNotificationsComponent implements OnInit {
  bids:any[] = [];
  bid:any ={}
  constructor(private service:NotificationService, private bidService:BidService) { }

  ngOnInit() {
    this.service.getBids(AppComponent.User._id)
    .subscribe(
      (res:any[])=>{this.bids = res}, err => console.log(err)//window.toastr['error']('error getting bid notifications')
    )
  }
  get Bids(){
    return this.bids;
  }
  get Bid(){
    return this.bid;
  }
  view(bid){
    this.bid = bid;
  }
  accept(id:any){
    this.bidService.acceptBid(id)
    .subscribe(
      (res)=>{window.toastr['success']('Bid accepted');location.reload()},
      err=>{window.toastr['error']('Bid acceptance failed')}
    )
  }
  reject(id:any){
    this.bidService.rejectBid(id)
    .subscribe(
      (res)=>{window.toastr['info']('Bid rejected');location.reload()},
      err=>{window.toastr['error']('Bid rejection failed')}
    )
  }
  getDate(iso_date):string{
    let date = new Date(iso_date);
    return date.toDateString();
  }

}
