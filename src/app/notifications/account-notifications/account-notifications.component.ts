import { Component, OnInit } from '@angular/core';
import {Navigation} from '../../shared/Navigation';

@Component({
  selector: 'app-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.css']
})
export class AccountNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Navigation.Title = 'Notifications';
  }
  getDate(){
    return new Date().toLocaleDateString();
  }
}
