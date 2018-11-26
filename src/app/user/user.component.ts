import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Navigation } from '../shared/Navigation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router,private location:Location) { }

  ngOnInit() {
  }
  gotoSettings(){
    this.router.navigateByUrl('/user/settings');
  }
  goback(){
    this.location.back();
  }
  get currentNavigation(){
    return Navigation.Title;
  }
  Home(){
    this.router.navigateByUrl('/user/home');
  }
}
