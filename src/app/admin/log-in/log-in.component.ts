import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
   loginForm: FormGroup = null;
   islogged = false
  constructor(private service:AdminServiceService, private location: Router) { 
    this.loginForm = new FormGroup({
        'Email': new FormControl(null,[Validators.email, Validators.required]),
        'Password': new FormControl(null,Validators.required)
    })
  }

  ngOnInit() {
  }

  login(){
    this.service.postdata('http://localhost:4000/admin/login',this.loginForm.value)
    .subscribe(
      (res) => {localStorage.setItem('User',JSON.stringify(res)); this.islogged=true}, 
      err => {alert("error logging in");}
    )
    if(this.islogged){
      this.location.navigateByUrl('/admin/home');
    }
  }

  

}
