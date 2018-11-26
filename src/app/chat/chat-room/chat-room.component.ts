import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ChatService} from '../chat.service';
import { Message } from 'src/app/shared/Message';
import { Schedule } from 'src/app/shared/schedule';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewInit {
  id ="1111"
  schedules:Schedule[] = []
  startDate = Date.parse('10-16-2018');
  endDate = this.startDate;
  daysPast:number;
  percentageDone:number =0;
  message: string;
  messages:Message[] = [];
  cansend = false;
  widget=true;
  chat:any={}
  TaskTitle:string;TaskDuration:number;
  PictueWidget = false;PictureUrl:any;PictureText:string;
  PriceWidget = false;Price:number;PriceDescription:string;
  SizeWidget = false;Size:string;SizeValue:number;
  done = false;
  picnum = 0;
  constructor(private chatService:ChatService,private orderService:OrderService,private route: ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getChat(id)
    .subscribe(
      (res:any)=>{this.chat = res;this.done = true;
      // console.log(this.startDate,'start',this.endDate,'end');
      // this.schedules.forEach((sch) =>console.log(this.daysToMillisecs(sch.duration),'days',sch.duration));
      // console.log(this.endDate,'end',new Date(this.endDate),this.EndDate);
      // console.log(this.startDate,'end',new Date(this.startDate),this.StartDate);
      }, err => alert(JSON.stringify(err))
    )
  }

  ngOnInit() {
      setTimeout(() => {
        this.taskDone();
        this.chatService
        .getMessages(this.chat._id).subscribe((message:Message) => {
          this.messages.push(message);
        });
        this.widget = false;
        console.log('task done');
      }, 8000);
      
  }
  ngAfterViewInit(){  
  //  let inter = setInterval(() => {
  //     if(this.Done){
  //       this.taskDone();
  //       clearInterval(inter)
  //     }else{
  //       console.log('awaiting..');
  //     }
  //   }, 1000);
    //send feedback widget when today is a day after end date or more
  }
  get Id(){
    return AppComponent.User._id;
  }
  get Role(){
    return AppComponent.User.Role;
  }
get Chat(){
  if(this.chat){
    return this.chat;
  }
}
get Messages(){
  if(this.chat){
    return this.chat.Messages.concat(this.messages)
  }
}
 get Order(){
   if (this.chat) {
     return this.chat.Order
   }
 }
 get Bid(){
   if(this.Order){
     return this.Order.Order
   }
 }
 get Request(){
   if(this.Bid){
     return this.Bid.Request;
   }
 }
 get Schedule(){
   if(this.Bid){
     return this.Bid.Schedule.Milestones;
   }
   else{ return []}
 }
 get Sizes(){
   if(this.Request){
    return this.Request.Sizes.length > 0 ?  this.Request.Sizes:[{Name:'Size',Value:'Not available'}]
     }else{
     return [{Name:'Size',Value:'Not available'}];
   }
 }
 get Picture(){
   if(this.Request){
     return this.Request.Picture[this.picnum];
   }else{
     return 'assets/images/clem-onojeghuo-197847-unsplash.jpg';
   }
 }
 nextPic(){
  if(this.Request){
    if((this.Request.Picture.length -1) > this.picnum){
      this.picnum ++
    }
  }
 }
 prevPic(){
    if(0<this.picnum){
      this.picnum--;
    }
 }
  sendMessage() {
    if(!this.widget){
    let msg = {
      Type:'chat',
      From:this.Id,
      To:this.chat._id,
      Content:this.message
    }
    this.messages.push(msg);
    this.chatService.sendMessage(msg);
    this.message = '';
  }
}
  taskWidget(){
    if(!this.widget){
      let msg ={
        Type:'task',
        From:this.Id,
        To:this.chat._id,
        Content:null
      }
      this.widget = true;
      this.messages.push(msg);
    }
  }
  pictureWidget(){
    if (!this.widget) {
      let msg ={
        Type:'picture',
        From:this.Id,
        To:this.chat._id,
        Content:null
      }
      this.messages.push(msg);
      this.widget =true;
    }
  }
  priceWidget(){
    if(!this.widget){
      let msg = {
        Type: 'price',
        From:this.Id,
        To:this.chat._id,
        Content:null
      }
      this.messages.push(msg);
      this.widget=true;
    }
  }
  sizeWidget(){
    if(!this.widget){
      let msg = {
        Type: 'size',
        From:this.Id,
        To:this.chat._id,
        Content:null
      }
      this.messages.push(msg);
      this.widget =true;
    }
  }
  hideDetails(){
    document.getElementById('details').style.display = 'none'
  }
  showDetails(){
    document.getElementById('details').style.display = 'block'
  }
  updateTask(i:number){
    let content = {
      Title: this.TaskTitle || "new task",
      Duration: this.TaskDuration
    }
    let schedule ={
      task: this.TaskTitle,
      duration: this.TaskDuration
    };
    this.messages[i].Content = content;
    this.schedules.push(schedule);
    this.endDate = this.endDate+this.daysToMillisecs(this.TaskDuration);
    this.taskDone();
    this.widget = false;
    this.TaskTitle=null;
    this.TaskDuration=null;
    this.chatService.sendMessage(this.messages[i]);
  }
  updatePicture(i:number){
    let content = {
      Picture:this.PictureUrl||'assets/images/header-bg-2.jpeg',
      Description:this.PictureText
    }
    this.messages[i].Content = content;
    this.widget = false;
    this.PictureUrl=null;this.PictureText=null;
    this.chatService.sendMessage(this.messages[i]);
  }
  updatePrice(i:number){
    let content = {
      Price: this.Price,
      Description: this.PriceDescription,
    }
    let msg ={
      Type: 'price-req',
        From:'129299',
        To:'1111',
        Content:{
          Price: this.Price,
          Description: this.PriceDescription,
          Accepted:null
        }
    }
    this.messages[i].Content = content;
    let sendmsg =this.messages[i];
    this.chatService.sendMessage(msg);
    this.widget = false;
    this.Price = null;
    this.PriceDescription=null;
  }
  updateSize(i:number){
    let content = {
      Size: this.Size
    }
    let msg ={
      Type: 'size-req',
        From:'129299',
        To:'1111',
      Content:{
        Size: this.Size,
        Value:null
      }
    }
    this.messages[i].Content = content;
    let sendmsg =this.messages[i];
    this.chatService.sendMessage(msg);
    this.widget = false;
    this.Size =null;
    
  }
  removeWidget(i:number){
    let dummy = this.messages;
    dummy = dummy.filter((msg)=>dummy.indexOf(msg)!== i)
    this.messages = dummy;
    this.widget = false
  }
  acceptPrice(i:number){
    this.messages[i].Content.Accepted = true;
    this.chatService.sendMessage(this.messages[i]);
  }
  rejectPrice(i:number){
    this.messages[i].Content.Accepted = false;
    this.chatService.sendMessage(this.messages[i]);
  }
  sendSize(i:number){
    this.messages[i].Content.Value = this.SizeValue;
    this.SizeValue = null;
    this.chatService.sendMessage(this.messages[i]);
  }
  setPicture(event:any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.PictureUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
   doneTime(){
    let nowDate = Date.now();
    let dayspast =nowDate-Date.parse(this.chat.Order.CreatedAt)
    dayspast = Number((this.daysPast/(1000*24*60*60)).toFixed(0));
    return dayspast;
    
  }
  get taskWidth(){
    let val = 100/this.Schedule.length
    return val+'%';
  }
  taskDone(){
    console.log(this.Schedule,this.chat.Order.Order.Schedule.Milestones)
    let percentageDone=0;
    let dayspast = Date.now()-Date.parse(this.chat.Order.CreatedAt)
    dayspast = Number((dayspast/(1000*24*60*60)).toFixed(0));
    console.log(dayspast);
    for (let index = 0; index < this.Schedule.length; index++) {
      if(dayspast >= this.Schedule[index].duration){
          document.getElementById(String(index)).classList.add('bg-success') 
          console.log(dayspast,this.Schedule[index].duration,document.getElementById(String(index)))
          dayspast -= this.Schedule[index].duration;
          percentageDone +=1;
      }
      
    }
    document.getElementById('percent').innerHTML = ((percentageDone/this.Schedule.length)*100).toFixed(0) + '%';
  }
  daysToMillisecs( day:number){
    return (day*24*60*60)*1000;
  }
  get StartDate(){
    if(this.Order){ 
    return Date.parse(this.Order.CreatedAt)
    }
  }
  get Start(){
    if(this.StartDate){
      return new Date(this.StartDate).toLocaleDateString();
    }
  }
  get EndDate(){
    if(this.Bid && this.StartDate && this.Schedule){
      let enddate = this.StartDate
      this.Schedule.forEach((sch) => enddate= enddate+this.daysToMillisecs(sch.duration));
      return enddate;
    } 
  }
  get End(){
    if(this.EndDate){
      return new Date(this.EndDate).toLocaleDateString();
    }
  }
  get Percentage(){
    return this.percentageDone;
  }
  get Done(){
    return this.done;
  }
  get CanSend(){
    return this.cansend;
  }
  isOdd(i:number){
    return i % 2  !== 0;
  }
  isEven(i:number){
    return i % 2 === 0;
  }
  isDone(i){
    let daystodate
    for(let j = 0;j<=i;j++ ){
      daystodate+=Schedule[i].duration
    }
    return (this.EndDate - this.StartDate)>=daystodate
  }
}
