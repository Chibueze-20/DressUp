import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';
import { Message } from 'src/app/shared/Message';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  message: string;
  messages:Message[] = [];
  TaskWidget = false;TaskTitle:string;TaskDuration = 0;
  PictueWidget = false;PictureUrl:any;PictureText:string;
  PriceWidget = false;Price:number;PriceDescription:string;
  constructor(private chatService:ChatService) { }

  ngOnInit() {
    document.getElementById('details').style.display = 'none'
    this.chatService
      .getMessages().subscribe((message:Message) => {
        this.messages.push(message);
        // document.querySelector('.chat-window').scrollTo(0, document.querySelector('#chat-window').scrollHeight)
      });
  }

  sendMessage() {
    let msg = {
      Type:'chat',
      From:'129299',
      To:'1111',
      Content:this.message
    }
    this.chatService.sendMessage(msg);
    this.message = '';
  }
  taskWidget(){
    if(!this.TaskWidget){
      let msg ={
        Type:'task',
        From:'129299',
        To:'1111',
        Content:null
      }
      this.TaskWidget = true;
      this.messages.push(msg);
    }
  }
  pictureWidget(){
    if (!this.PictueWidget) {
      let msg ={
        Type:'picture',
        From:'129299',
        To:'1111',
        Content:null
      }
      this.messages.push(msg);
      this.PictueWidget =true;
    }
  }
  priceWidget(){
    if(!this.PriceWidget){
      let msg = {
        Type: 'Picture',
        From:'129299',
        To:'1111',
        Content:null
      }
      this.messages.push(msg);
      this.PriceWidget=true;
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
    this.messages[i].Content = content;
    console.log(this.messages);
    this.TaskWidget = false;
  }
  removeTask(i:number){
    let dummy = this.messages;
    dummy = dummy.filter((msg)=>dummy.indexOf(msg)!== i)
    this.messages = dummy;
    this.TaskWidget = false
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
}
