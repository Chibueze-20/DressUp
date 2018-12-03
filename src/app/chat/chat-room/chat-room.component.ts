import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ChatService} from '../chat.service';
import { Message } from 'src/app/shared/Message';
import { Schedule } from 'src/app/shared/schedule';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BidService } from 'src/app/services/bid.service';
import { Navigation } from 'src/app/shared/Navigation';
import { UserserviceService } from 'src/app/userservice.service';
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
  upload=false;
  picnum = 0;
  constructor(private chatService:ChatService,private orderService:OrderService,private bidservice:BidService,private userservice:UserserviceService,private route: ActivatedRoute) { 
    Navigation.Title = 'Chat';
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
        this.messages = this.chat.Messages;
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
  get Upload(){
    return this.upload;
  }
  sentBy(id):string{
    if(this.Id === id){
      return this.Role;
    }else{
      if(this.Role === 'User'){
        return 'Tailor';
      }else{
        return 'User';
      }
    }
  }
get Chat(){
  if(this.chat){
    return this.chat;
  }
}
get Messages(){
  if(this.chat){
    return this.messages;
  }else {return []}
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
      Date: new Date().toDateString(),
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
        Date: new Date().toDateString(),
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
        Date: new Date().toDateString(),
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
        Date: new Date().toDateString(),
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
        Date: new Date().toDateString(),
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
    this.Schedule.push(schedule)
    let milestones = this.Schedule;
    // milestones.push(schedule);
    let duration = Number(this.Bid.Schedule.Duration) + this.TaskDuration;
    let body = {Duration:duration,Milestones:milestones};
    //this.endDate = this.endDate+this.daysToMillisecs(this.TaskDuration);
    this.bidservice.update(this.Bid._id,{Schedule:body})
    .subscribe(
      (res) =>{
        this.messages[i].Content = content;
        setTimeout(() => {
          this.taskDone();
        }, 2000);
        this.TaskTitle=null;
        this.TaskDuration=null;
        this.chatService.sendMessage(this.messages[i]);
        this.widget = false;
      }, err =>{
        console.log(err),alert('Error');
        this.Schedule.pop();
        setTimeout(() => {
          this.taskDone();
        }, 2000);
      } 
    )
    
    //
  }
  updatePicture(i:number){
    const  payload = {
      file: this.PictureUrl,
      upload_preset: 'postdress',
    };
    this.upload=true;
    this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
      .subscribe(
        (res:any) => {
          console.log(res);//
          let content = {
                  Picture:String(res.secure_url),
                  Description:this.PictureText
                }
                this.messages[i].Content = content;
                this.widget = false;
                this.PictureUrl=null;this.PictureText=null;this.upload=false;
                this.chatService.sendMessage(this.messages[i]);
        } , error1 => {
          console.log(error1);
          this.widget = false;
          this.PictureUrl=null;this.PictureText=null;this.upload=false;
        } );
    //     this.chatService.sendMessage(this.messages[i]);
  }
  updatePrice(i:number){
    let content = {
      Price: this.Price,
      Description: this.PriceDescription,
    }
    let msg ={
      Type: 'price-req',
      From:this.Id,
      Date: new Date().toDateString(),
      To:this.chat._id,
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
      From:this.Id,
      Date: new Date().toDateString(),
      To:this.chat._id,
      Content:{
        Size: this.Size,
        Value:null
      }
    }
    this.messages[i].Content = content;
    //let sendmsg =this.messages[i];
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
    this.widget = true;
    this.Bid.Price = Number(this.messages[i].Content.Price)+this.Bid.Price;
    this.Messages[i].Content.Accepted = true;
    let msgs  = this.Messages
    this.bidservice.update(this.Bid._id,{Price:this.Bid.Price})
    .subscribe(
      (res)=>{
        this.orderService.updateChat(this.Chat._id,{Messages:msgs})
        .subscribe((res)=>{console.log('updated chat',res),this.widget=false},(err)=>console.error('update fail',err))
      },
      err =>{
        console.log(err);
        this.Messages[i].Content.Accepted = false;
        alert('Error');
      }
    )
  }
  rejectPrice(i:number){
    this.messages[i].Content.Accepted = false;
    this.chatService.sendMessage(this.messages[i]);
  }
  sendSize(i:number){
    this.widget = true;
    this.messages[i].Content.Value = this.SizeValue;
    let msgs  = this.Messages
    this.SizeValue = null;
    this.orderService.updateSize(this.Order._id,this.messages[i].Content)
    .subscribe(
      (res) => {
        this.orderService.updateChat(this.Chat._id,{Messages:msgs})
        .subscribe((res)=>{console.log('updated chat',res),this.widget=false},(err)=>console.error('update fail',err))
      }, err => {
        console.log(err);
        this.messages[i].Content.Value = null;
        alert('Error');
      }
    )
    
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
