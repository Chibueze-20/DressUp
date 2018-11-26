import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Schedule} from '../shared/schedule';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestserviceService} from '../services/requestservice.service';
import {Navigation} from '../shared/Navigation';
import { MyWindow } from '../shared/windowAlert';
import { BidService } from '../services/bid.service';
import { AppComponent } from '../app.component';

declare let window:MyWindow
@Component({
  selector: 'app-bid-view',
  templateUrl: './bid-view.component.html',
  styleUrls: ['./bid-view.component.css']
})
export class BidViewComponent implements OnInit,AfterViewInit {
  loader = false;
  request: any = null;
  acceptbid = false;
  bid:any = null;
  bidprice: string;
  staticPrice:number = null;
  task: string;
  duration: number;
  totalTimeline = 0;
  schedules:  Schedule[] = [];
  schedule: Schedule = new Schedule();
  private temp: Schedule = new Schedule();
  constructor(private route: ActivatedRoute,private Location:Router ,private bidservice: BidService, private requestservice: RequestserviceService) {
    Navigation.Title = 'Bid';
   }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    const body = {ID: id};
    this.requestservice.PostOrder(body, 'view')
        .subscribe(
          (res) => {this.request = res; }, err => {window.toastr['error']('Request not found'); this.loader = true; }
        );
        this.loader = true;
        this.bidservice.getBidByRequest(id)
        .subscribe(
        (res) =>{this.bid = res;}, err => {console.log('error getting price');this.loader = true; }
      );
  }
  ngAfterViewInit(){
   
    setTimeout(() => {
      window.runcarosel();
    }, 5000);
  }
 get Loader() {
    return this.loader;
 }
 get StaticPrice(){
   if(this.bid){
    if(this.bid.Price){
      this.bidprice = this.bid.Price
     return this.bid.Price
    }else{
      return null;
    }
   }else{
     return null;
   }
 }
  get Bid() {
    return this.request;
  }
  maketerms() {
    this.acceptbid = true;
  }

  updatearry(schedulesarr: Schedule[]) {
    this.schedules = schedulesarr;
  }
  addSchedule() {
    this.schedules.push(this.schedule);
    this.totalTimeline = this.totalTimeline + this.schedule.duration;
     this.schedule = new Schedule();
  }
  removeSchedule(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    this.totalTimeline = this.totalTimeline - temparr[i].duration;
    temparr = temparr.filter(schedule => this.schedules.indexOf(schedule) !== i);
    this.updatearry(temparr);
  }
  moveScheduleUp(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    this.temp = new Schedule({task: temparr[i].task, duration: temparr[i].duration });
    temparr[i] = temparr[i - 1];
    temparr[i - 1] = this.temp;
    this.updatearry(temparr);
  }
  moveScheduleDown(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    if (temparr.length > 1) {
      this.temp = new Schedule({task: temparr[i].task, duration: temparr[i].duration });
      temparr[i] = temparr[i + 1];
      temparr[i + 1] = this.temp;
      this.updatearry(temparr);
    }
  }

  get Schedules() {
    return this.schedules;
  }

  get timeline() {
    return this.totalTimeline;
  }

  PlaceBid(){
      let Body = {
        Type:'Bid',
        Request:this.request._id,
        Tailor:AppComponent.User._id,
        Price:this.bidprice,
        Schedule:{
          Duration: this.totalTimeline,
          Milestones:this.schedules
        }
      }
      this.bidservice.placeBid(Body)
      .subscribe(
        (res)=>{window.toastr['success']('Bid successfully sent');this.Location.navigateByUrl('/tailor/home/jobs');},err =>{window.toastr['error']('Bid not successfully sent');console.log(err);}
      )
  }
  AcceptDirectBid(){
    let Body ={
      Update:{
        Price:this.staticPrice||Number(this.bidprice),
        Schedule:{
          Duration: this.totalTimeline,
          Milestones:this.schedules
        }
      }
    }
    this.bidservice.acceptDirectBid(Body)
    .subscribe(
      (res)=>{window.toastr['success']('Request Accepted');this.Location.navigateByUrl('/notifications/requests');},err =>{window.toastr['error']('Problem Accepting Request');console.log(err);}
    )
  }

  rejectBid(){
    if(this.bid){
      this.bidservice.rejectBid(this.bid._id)
      .subscribe(
        (res)=>{window.toastr['success']('Request Rejected');this.Location.navigateByUrl('/notifications/requests');
      },err =>{window.toastr['error']('Unknown Error');console.log(err);}
      )
    }
  }
}
