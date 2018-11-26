import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { IRaveOptions, ravePay } from 'src/app/shared/Payment';
import { Navigation } from 'src/app/shared/Navigation';
import { ViewserviceService } from 'src/app/services/viewservice.service';
import { PostserviceService } from 'src/app/services/postservice.service';
import { RequestserviceService } from 'src/app/services/requestservice.service';

interface MyWindow extends Window {
  getpaidSetup: (options: IRaveOptions) => void;
  toastr:any;
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
  delivery:string;fitness:string;
  constructor( private route: ActivatedRoute, private service: ViewserviceService, private requestservice: RequestserviceService,private router:Router) {
    Navigation.Title = 'Post';
    
  }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    this.service.viewPost(id)
      .subscribe(
        Post => {this.post = Post; }, error1 => alert('Error finding post details')
      );
  }

  
  gotoProfile(){
    if(this.post){
      this.router.navigateByUrl('/user/tailor/'+this.Post.Tailor._id);
    }
    
  }
get User(){
  return JSON.parse(localStorage.getItem('User'));
}
get Price(){
  if(this.Post && this.Post.Price){
    return this.Post.Price;
  }else{
    return 0;
  }
}
get Post() {
    return this.post;
}

selectSize(type: string, size: string) {
  this.selectedSize = {Name: type, Value: size};
  console.log(this.selectedSize);
}
setDelivery(type:string){
  this.delivery = type;
  console.log(this.delivery);
}
setFitness(type:string){
  this.fitness = type;
  console.log(this.fitness);
}
get Delivery(){
  if(this.delivery){
    return this.delivery
  }else{
    return 'None selected... please select'
  }
}
get Fitness(){
  if(this.fitness){
    return this.fitness
  }else{
    return 'None selected... please select'
  }
}
get Size(){
  if(this.selectedSize.Name && this.selectedSize.Value){
    return this.selectedSize.Name +' : '+this.selectedSize.Value
  }else{
    return 'No size selected... please select'
  }
}
get canOrder():boolean{
  if(this.delivery && this.fitness && this.selectedSize.Name && this.selectedSize.Value){
    return true;
  }else{
    return false;
  }
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
  let Request = {
    User:this.User._id,
    Title:this.post.Ttile,
    Description:this.post.Description,
    Sizes:[this.selectedSize],
    Conditions:{Delivery:this.delivery,Fitness:this.fitness},
    Type:'Direct'
  };
  let Body ={
    request:Request,
    pic:this.post.Picture,
    tags:this.post.Tags,
    tailor:this.post.Tailor._id,
    price:this.post.Price
  };
  this.requestservice.PostOrder(Body,'send')
  .subscribe(
    (res)=>{window.toastr['success']('Request Created and Sent')},err=>{window.toastr['error']('Error Contact Customer service');console.log(err)}
  )
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
