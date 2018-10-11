import { Component, OnInit } from '@angular/core';
import {PostserviceService} from '../../services/postservice.service';

@Component({
  selector: 'app-tailor-feeds',
  templateUrl: './tailor-feeds.component.html',
  styleUrls: ['./tailor-feeds.component.css']
})
export class TailorFeedsComponent implements OnInit {
  loader = false;
  posts: any[] = [];
 tailors = ['5b72baf2bd81530ed0de7aaf'];
  constructor(private postservice: PostserviceService) { }

  ngOnInit() {
   const body = {Tailor: this.tailors};
    this.postservice.PostpostParam(body, 'following', '0').subscribe(
      (res: any[]) => {this.posts = res; this.loader = true; } , error1 => {alert(error1); this.loader = true; }
    );
    this.loader = true;
  }

  get Posts() {
    return this.posts;
  }
  get Loader() {
    return this.loader;
  }
}
