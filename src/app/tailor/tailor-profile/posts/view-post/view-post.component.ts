import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ViewserviceService} from '../../../services/viewservice.service';
import {PostserviceService} from '../../../services/postservice.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: any = null;
  selectedSize: any = {Name: null, Value: null};
  constructor( private route: ActivatedRoute, private service: ViewserviceService, private postservice: PostserviceService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.viewPost(id)
      .subscribe(
        Post => {this.post = Post; }, error1 => alert('Error finding post details')
      );
  }


get Post() {
    return this.post;
}

selectSize(type: string, size: string) {
  this.selectedSize = {Name: type, Value: size};
  console.log(this.selectedSize);
}
show(e) {
  console.log(e);
}

testSize: any;

toggleEdit(e: Event) {
  let parent;
  let parentsibling;
  parent = e.target['parentElement'];
  parentsibling = parent['nextElementSibling'];
  const children = (<HTMLCollection> parentsibling['children']);
  children.item(0).classList.toggle('hide');
  children.item(1).classList.toggle('hide');
  (<HTMLInputElement>children.item(1)).focus();
  if (e.target['innerText'] === 'edit') {
    e.target['innerText'] = 'done';
  } else {
    e.target['innerText'] = 'edit';
  }

}
}
