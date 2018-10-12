import { Component, OnInit } from '@angular/core';
import {Navigation} from '../../shared/Navigation';

@Component({
  selector: 'app-bid-notifications',
  templateUrl: './bid-notifications.component.html',
  styleUrls: ['./bid-notifications.component.css']
})
export class BidNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Navigation.Title = 'Bids';
  }

}
