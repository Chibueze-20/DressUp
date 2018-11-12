import { Component, OnInit, AfterViewInit } from '@angular/core';
import {PostserviceService} from '../../services/postservice.service';
import { AppComponent } from 'src/app/app.component';
import { MyWindow } from 'src/app/shared/windowAlert';
import { Navigation } from 'src/app/shared/Navigation';
declare let window:MyWindow
@Component({
  selector: 'app-tailor-feeds',
  templateUrl: './tailor-feeds.component.html',
  styleUrls: ['./tailor-feeds.component.css']
})
export class TailorFeedsComponent implements OnInit,AfterViewInit {
  loader = false;
  posts: any[] = [];
  skip=0;
//  tailors = ['5b72baf2bd81530ed0de7aaf'];
  constructor(private postservice: PostserviceService) {
    Navigation.Title= 'Home';
   }

  ngOnInit() {
   const body = {Tailor: AppComponent.User.Following};
    this.postservice.PostpostParam(body, 'following', '0').subscribe(
      (res: any[]) => {this.posts = res; this.loader = true; } , error1 => {window.toastr['error']('Unable to get Posts'); this.loader = true; }
    );
    this.loader = true;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      window.runcarosel();
    }, 5000);
  }
  get Posts() {
    return this.posts;
  }
  get Loader() {
    return this.loader;
  }
  morePosts(){
    const body = {Tailor: AppComponent.User.Following};
    this.skip = this.skip+20
    this.postservice.PostpostParam(body, 'following', String(this.skip)).subscribe(
      (res:any[]) => {
        if(res.length>0){
         this.posts = this.posts.concat(res);
        }else{
          window.toastr['info']('No more bids')
        }
      }, error =>{window.toastr['error']('Failed to get bids')}
    );
  }
}
