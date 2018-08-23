import { Component, OnInit } from '@angular/core';
import {Schedule} from '../shared/schedule';

@Component({
  selector: 'app-bid-view',
  templateUrl: './bid-view.component.html',
  styleUrls: ['./bid-view.component.css']
})
export class BidViewComponent implements OnInit {
  acceptbid = false;
  bidprice: string;
  task: string;
  duration: number;
  schedules:  Schedule[];
  schedule: Schedule = new Schedule();
  private temp: Schedule;
  constructor() { }

  ngOnInit() {
  }

  maketerms() {
    this.acceptbid = true;

  }

  addSchedule() {
    this.schedules.push(this.schedule);
    this.schedule = new Schedule();
  }
  removeSchedule(i: number) {
    this.schedules = this.schedules.filter(schedule => this.schedules.indexOf(schedule) !== i);
  }
  moveScheduleUp(i: number) {
    this.temp = this.schedules[i];
    this.schedules[i] = this.schedules[i + 1];
    this.schedules[i + 1] = this.temp;
  }
  moveScheduleDown(i: number) {
    this.temp = this.schedules[i];
    this.schedules[i] = this.schedules[i - 1];
    this.schedules[i - 1] = this.temp;
  }

  get Schedules() {
    return this.schedules;
  }
}
