import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit() {
  }

goBack() : void{
  this.location.back();
}

selectedSize: any = 'Small';

show(e){
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
