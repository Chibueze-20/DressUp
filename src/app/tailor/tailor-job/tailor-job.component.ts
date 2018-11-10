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
  skip = 0;
  constructor(private bidservice: RequestserviceService) { 
    Navigation.Title = "Jobs"
  }

  ngOnInit() {
    this.bidservice.GetOrder('0', 'bids').subscribe(
      (res: any[]) => { this.bids = res; }, error => window.toastr['error']('Failed to get bids')
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
  morePosts(){
    this.skip = this.skip+20
    this.bidservice.GetOrder(String(this.skip),'bids').subscribe(
      (res:any[]) => {
        if(res.length>0){
         this.bids = this.bids.concat(res);
        }else{
          window.toastr['info']('No more bids')
        }
      }, error =>{window.toastr['error']('Failed to get bids')}
    );
  }
}
