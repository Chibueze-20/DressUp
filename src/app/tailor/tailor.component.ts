import { Component, OnInit } from '@angular/core';
import {Navigation} from '../shared/Navigation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css']
})

export class TailorComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }

  get getCurrentNavigation() {
    return Navigation.Title;
  }
 goback(){
  this.location.back();
 }
}
