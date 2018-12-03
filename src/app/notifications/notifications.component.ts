import { Component, OnInit } from '@angular/core';
import {Navigation} from '../shared/Navigation';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }
  back(){
    if (this.UserRole === 'Designer') {
      this.router.navigateByUrl('/tailor/home/jobs')
    } else {
      this.router.navigateByUrl('/user/home/feeds')
    }
  }
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
  get Navigation() {
    return Navigation.Title;
  }
  get UserRole(){
    return AppComponent.User.Role;
  }
}
