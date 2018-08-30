import { Component, OnInit } from '@angular/core';
import {Sizes} from './sizes';
import {Size} from './sizes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
show(e){
  console.log(e)
}

sizesArray =  new Sizes();
type:String;
addSize(event:Event){
  event.target["ownerDocument"].all["sizeForm"].style.visibility = 'visible';
  event.target["ownerDocument"].all["sizeInputGroup"].name = event.target["id"];
  this.type = event.target["id"];
}
showSize(event:Event){
  this.type = event.target["id"];
  event.target["ownerDocument"].all["sizeForm"].style.visibility = 'visible';
}

discardSize(event:Event){
  event.target["ownerDocument"].all["sizeForm"].style.visibility = 'hidden';
}
saveSize(name:String, value:Number, sizeType:String){
  this.type = sizeType;
  this.sizesArray[`${sizeType}`].push(new Size({name: name, value: value}));
  console.log(this.sizesArray)

}
clear(event:Event){
  event.target["previousSibling"].value = '';
  event.target["value"] = '';
}
get getArray(){
  return this.sizesArray[`${this.type}`]
}
}