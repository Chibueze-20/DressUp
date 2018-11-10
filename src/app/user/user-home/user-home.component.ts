import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
   gotoBid(){
    this.router.navigateByUrl('/user/new/order')
   }
   gotoSearch(){
    this.router.navigateByUrl('/search')
   }
   gotoOrder(){

   }
   gotoNotification(){

   }
   logout(){
      localStorage.removeItem('User');
      this.router.navigateByUrl('/login');
   }
}
