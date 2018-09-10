import { Component, OnInit } from '@angular/core';
import {Navigation} from '../shared/Navigation';

@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css']
})

export class TailorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get getCurrentNavigation() {
    return Navigation.Title;
  }

}
