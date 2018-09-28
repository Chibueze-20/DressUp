import { Component, OnInit } from '@angular/core';
import {RequestserviceService} from '../services/requestservice.service';

@Component({
  selector: 'app-tailor-job',
  templateUrl: './tailor-job.component.html',
  styleUrls: ['./tailor-job.component.css']
})
export class TailorJobComponent implements OnInit {
  bids: any[] = [];
  constructor(private bidservice: RequestserviceService) { }

  ngOnInit() {
    this.bidservice.GetOrder('0', 'all').subscribe(
      (res: any[]) => { this.bids = res; }, error => alert(error)
    );
  }

  get Bids() {
    return this.bids;
  }
}
