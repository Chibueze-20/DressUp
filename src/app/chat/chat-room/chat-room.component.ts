import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ChatService} from '../chat.service';
import { Message } from 'src/app/shared/Message';
import { Schedule } from 'src/app/shared/schedule';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewInit {
  id ="1111"
  schedules:Schedule[] = [
    {
      task: 'Buy material',
      duration: 3
    },
    {
      task: 'Cut material to size',
      duration: 5
    },
    {
      task: 'Sew up shirt',
      duration: 2
    },
    {
      task: 'Sew trousers and add pockets',
      duration: 3
    },
    {
      task:'Iron and package for sending',
      duration:1
    }
  ]
  startDate = Date.parse('10-16-2018');
  endDate = this.startDate;
  nowDate = Date.now();
  daysPast:number;
  percentageDone:number;
  message: string;
  messages:Message[] = [];
  widget=false;
  TaskTitle:string;TaskDuration:number;
  PictueWidget = false;PictureUrl:any;PictureText:string;
  PriceWidget = false;Price:number;PriceDescription:string;
  SizeWidget = false;Size:string;SizeValue:number;
  constructor(private chatService:ChatService) { }

  ngOnInit() {
    document.getElementById('details').style.display = 'none'
    this.schedules.forEach((sch) => this.endDate= this.endDate+this.daysToMillisecs(sch.duration));
    console.log(new Date(this.endDate));
    this.chatService
      .getMessages().subscribe((message:Message) => {
        this.messages.push(message);
        // document.querySelector('.chat-window').scrollTo(0, document.querySelector('#chat-window').scrollHeight)
      });
  }
  ngAfterViewInit(){
    this.taskDone();
    //send feedback widget when today is a day after end date or more
  }

  sendMessage() {
    let msg = {
      Type:'chat',
      From:'129299',
      To:'1111',
      Content:this.message
    }
    this.messages.push(msg);
    this.chatService.sendMessage(msg);
    this.message = '';
  }
  taskWidget(){
    if(!this.widget){
      let msg ={
        Type:'task',
        From:'129299',
        To:'1111',
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
        From:'129299',
        To:'1111',
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
        From:'129299',
        To:'1111',
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
        From:'129299',
        To:'1111',
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
    this.daysPast =this.nowDate-this.startDate;
    this.daysPast = (((this.daysPast/1000)/60)/60)/24
    console.log(this.daysPast);
  }
//   percentageComplete(){
//    return ((this.endDate-this.nowDate)/(this.endDate-this.startDate))*100;
//  }
  get taskWidth(){
    let val = 100/this.schedules.length
    return val+'%';
  }
  taskDone(){
    this.percentageDone=0;
    this.doneTime();
    for (let index = 0; index < this.schedules.length; index++) {
      if(this.daysPast >= this.schedules[index].duration){
          document.getElementById(String(index)).classList.add('bg-success');
          this.daysPast -= this.schedules[index].duration;
          this.percentageDone +=1;
      }
      
    }
    this.percentageDone = Number(((this.percentageDone/this.schedules.length)*100).toFixed(0));
  }
  daysToMillisecs( day:number){
    return (day*24*60*60)*1000;
  }
  get StartDate(){
    return new Date(this.startDate).toLocaleDateString()
  }
  get EndDate(){
    return new Date(this.endDate).toLocaleDateString()
  }

  isOdd(i:number){
    return i % 2  !== 0;
  }
  isEven(i:number){
    return i % 2 === 0;
  }
}
