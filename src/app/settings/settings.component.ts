import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
  }
  goback() {
    // Todo: let user go back to home page on click
    this.route.navigateByUrl('/index');
  }
}
