import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Navigation } from '../shared/Navigation';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/tailor/home/profile')
  }
  openNav() {
    document.getElementById('side-nav').style.width = '280px';
  }

  closeNav() {
    document.getElementById('side-nav').style.width = '0';
  }
}
