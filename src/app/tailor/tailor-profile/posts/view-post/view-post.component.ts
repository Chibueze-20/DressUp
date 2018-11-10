import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ViewserviceService} from '../../../../services/viewservice.service';
import {PostserviceService} from '../../../../services/postservice.service';
import { IRaveOptions, ravePay } from 'src/app/shared/Payment';
import { Navigation } from 'src/app/shared/Navigation';

interface MyWindow extends Window {
  getpaidSetup: (options: IRaveOptions) => void;
}
declare let window: MyWindow

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})

export class ViewPostComponent implements OnInit {
  post: any = null;
  selectedSize: any = {Name: null, Value: null};
  constructor( private route: ActivatedRoute, private service: ViewserviceService, private postservice: PostserviceService) {
    Navigation.Title = 'Post';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.viewPost(id)
      .subscribe(
        Post => {this.post = Post; }, error1 => alert('Error finding post details')
      );
  }

  

get User(){
  return JSON.parse(localStorage.getItem('User'));
}
get Price(){
  if(this.Post && this.Post.Price){
    return this.Post.Price;
  }else{
    return 100;
  }
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
confirmPayment(response: object): void {
  console.log(response);
}

cancelledPayment(): void {
    console.log('close');
}

generateReference(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

showPayment(){
  ravePay.setPaymentOptions('FLWPUBK-b852b5867b62c938d499adf9a75f6502-X',this.generateReference(),this.Post.Price,this.User.Account.Email,
  'pay for order',this.confirmPayment,this.cancelledPayment,null,null,'Peter','Phillips','Dress Up direct order');
  if(ravePay.getPaymentOptions) {
    window.getpaidSetup(ravePay.getPaymentOptions);
  } else {
    alert('no payment options');
  }
}

}
