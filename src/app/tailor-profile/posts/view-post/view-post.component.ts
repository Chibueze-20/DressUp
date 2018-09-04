import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private location:Location) {}

  ngOnInit() {
  }

goBack() : void{
  this.location.back();
}

selectedSize:any = 'Small';

show(e){
  console.log(e);
}

testSize: any;

toggleEdit(e:Event){
  if(document.getElementsByClassName('size-input')[0]['readOnly']){
    document.getElementsByClassName('size-input')[0]['readOnly'] = false;
    // console.log(document.getElementsByClassName('size-input')[0]['readOnly'])
    e.target["innerText"] = 'done';
  }else{
    document.getElementsByClassName('size-input')[0]['readOnly'] = true;
    e.target["innerText"] = 'edit';
  }



}
}
