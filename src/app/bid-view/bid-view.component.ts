import { Component, OnInit } from '@angular/core';
import {Schedule} from '../shared/schedule';

@Component({
  selector: 'app-bid-view',
  templateUrl: './bid-view.component.html',
  styleUrls: ['./bid-view.component.css']
})
export class BidViewComponent implements OnInit {
  acceptbid = true;
  bidprice: string;
  task: string;
  duration: number;
  totalTimeline = 0;
  schedules:  Schedule[] = [];
  schedule: Schedule = new Schedule();
  private temp: Schedule = new Schedule();
  constructor() { }

  ngOnInit() {
  }

  maketerms() {
    this.acceptbid = true;

  }

  updatearry(schedulesarr: Schedule[]) {
    this.schedules = schedulesarr;
  }
  addSchedule() {
    this.schedules.push(this.schedule);
    this.totalTimeline = this.totalTimeline + this.schedule.duration;
     this.schedule = new Schedule();
  }
  removeSchedule(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    temparr = temparr.filter(schedule => this.schedules.indexOf(schedule) !== i);
    this.updatearry(temparr);
  }
  moveScheduleUp(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    this.temp = new Schedule({task: temparr[i].task, duration: temparr[i].duration });
    temparr[i] = temparr[i - 1];
    temparr[i - 1] = this.temp;
    this.updatearry(temparr);
  }
  moveScheduleDown(i: number) {
    let temparr: any[];
    temparr = this.schedules;
    if (temparr.length > 1) {
      this.temp = new Schedule({task: temparr[i].task, duration: temparr[i].duration });
      temparr[i] = temparr[i + 1];
      temparr[i + 1] = this.temp;
      this.updatearry(temparr);
    }
  }

  get Schedules() {
    return this.schedules;
  }

  get timeline() {
    return this.totalTimeline;
  }
}
