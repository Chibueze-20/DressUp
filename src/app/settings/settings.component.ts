import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Navigation } from '../shared/Navigation';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location:Location,private router:Router) { 
    Navigation.Title ='Settings'
  }

  ngOnInit() {
  }
  goBack():void{
    if(this.isTailor){
    this.router.navigateByUrl('/tailor/home/profile');
    }else{
      this.router.navigateByUrl('/user/home/feeds');
    }
  }
  openNav() {
    document.getElementById('side-nav').style.width = '280px';
  }

  closeNav() {
    document.getElementById('side-nav').style.width = '0';
  }
  get isTailor(){
    return AppComponent.User.Role === 'Designer';
  }
  // get accountsettingsLink(){
  //   if (this.isTailor) {
  //     return '/tailor/settings/account';
  //   } else {
  //       return 'user/settings/account';
  //   }
  // }
  // get accountcustomizeLink(){
  //   if (this.isTailor) {
  //     return '/tailor/settings/customize';
  //   } else {
  //       return '';
  //   }
  // }
}
