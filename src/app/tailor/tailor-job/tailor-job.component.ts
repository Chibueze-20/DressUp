import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RequestserviceService} from '../../services/requestservice.service';
import { Navigation } from 'src/app/shared/Navigation';
import { MyWindow } from 'src/app/shared/windowAlert';

declare let window:MyWindow;
@Component({
  selector: 'app-tailor-job',
  templateUrl: './tailor-job.component.html',
  styleUrls: ['./tailor-job.component.css']
})
export class TailorJobComponent implements OnInit ,AfterViewInit {
  bids: any[] = [];
  constructor(private bidservice: RequestserviceService) { 
    Navigation.Title = "Jobs"
  }

  ngOnInit() {
    this.bidservice.GetOrder('0', 'bids').subscribe(
      (res: any[]) => { this.bids = res; }, error => alert(error)
    );
  }
  ngAfterViewInit(){
    setTimeout(() => {
      window.runcarosel();
    }, 5000);
  }

  get Bids() {
    return this.bids;
  }
}
