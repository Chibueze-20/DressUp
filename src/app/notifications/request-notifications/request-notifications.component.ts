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
    Navigation.Title = 'Requests';
    
    this.service.getDirectBids(AppComponent.User._id).subscribe(
      (res:any) => {this.notifications = res; console.log(res)}, err => console.log(err)
    )
  }

  get Notifications(){
    return this.notifications;
  }
 getDate(iso_date):string{
   let date = new Date(iso_date);
   return date.toDateString();
 }
 
}
