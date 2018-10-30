import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack():void{
    this.location.back();
  }
  openNav() {
    document.getElementById('side-nav').style.width = '280px';
  }

  closeNav() {
    document.getElementById('side-nav').style.width = '0';
  }
}
