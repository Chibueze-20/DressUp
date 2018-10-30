import { Component, OnInit } from '@angular/core';
import {Navigation} from '../../shared/Navigation';
import { NotificationService } from 'src/app/services/notification.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-request-notifications',
  templateUrl: './request-notifications.component.html',
  styleUrls: ['./request-notifications.component.css']
})
export class RequestNotificationsComponent implements OnInit {
  notifications:any[] = [];
  constructor(private service:NotificationService) { }

  ngOnInit() {
    Navigation.Title = 'Bids';
    this.service.getmessage(AppComponent.User._id,'Bid').subscribe(
      (res:any) => this.notifications = res, err => alert('error getting notificaions') 
    )
  }
 
}
