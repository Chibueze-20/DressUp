import { Component, OnInit } from '@angular/core';
import {PostserviceService} from '../../services/postservice.service';

@Component({
  selector: 'app-tailor-posts',
  templateUrl: './tailor-posts.component.html',
  styleUrls: ['./tailor-posts.component.css']
})
export class TailorPostsComponent implements OnInit {
  posts: any[] = [];
  constructor(private postservice: PostserviceService) { }

  ngOnInit() {
    this.postservice.Getpost('0', 'all').subscribe(
      (res: any[]) => {this.posts = res; } , error1 => {alert(error1); }
    );
  }

  get Posts() {
    return this.posts;
  }
}
