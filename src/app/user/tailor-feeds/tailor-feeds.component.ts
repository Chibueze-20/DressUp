import { Component, OnInit } from '@angular/core';
import {PostserviceService} from '../../services/postservice.service';

@Component({
  selector: 'app-tailor-feeds',
  templateUrl: './tailor-feeds.component.html',
  styleUrls: ['./tailor-feeds.component.css']
})
export class TailorFeedsComponent implements OnInit {
 posts: any[] = [];
 tailors = ['5b72baf2bd81530ed0de7aaf'];
  constructor(private postservice: PostserviceService) { }

  ngOnInit() {
    this.postservice.PostpostParam(this.tailors, 'following', '0').subscribe(
      (res: any[]) => {this.posts = res; } , error1 => {alert(error1); }
    );
  }

  get Posts() {
    return this.posts;
  }

}
