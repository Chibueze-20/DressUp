import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {PostserviceService} from '../../../services/postservice.service';
import { Navigation } from 'src/app/shared/Navigation';
import { TailorProfileComponent } from '../tailor-profile.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  tailor: any = '5b72bcedbd81530ed0de7ab0';
  constructor(private postservice: PostserviceService) { 
    
  }

  ngOnInit() {
    const body = {tailor: TailorProfileComponent.Tailor };
    this.postservice.PostpostParam(body, 'posts', '0').subscribe(
      (res: any[]) => {this.posts = res; } , error1 => {alert(error1); }
    );
  }

  get Posts() {
    return this.posts;
  }
  get User(){
    return AppComponent.User;
  }


}
