import { Component, OnInit } from '@angular/core';
import { Navigation } from '../shared/Navigation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { 
    Navigation.Title = 'Orders'
  }

  ngOnInit() {
  }

}
