import { Component, OnInit } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../../assets/css/social_icons.css','./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Top(){
    window.scrollTo(0,0);
  }
  SignUp(role:string){
    SignUpComponent.Role = role;
    this.router.navigateByUrl('/register');
  }
}
