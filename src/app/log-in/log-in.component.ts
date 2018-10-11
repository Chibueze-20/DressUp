import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import {Response} from '../shared/Response';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
// toggle password characters
  password = true;
  clientForm: FormGroup;
  designerForm: FormGroup;
  designer = false;
  constructor( private userservice: UserserviceService, private route: Router) {

    this.clientForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });

    this.designerForm = new FormGroup({
      'designeremail': new FormControl(null, [Validators.email, Validators.required]),
      'designerpassword': new FormControl(null, Validators.required),
      'designerbrand': new FormControl(null, Validators.required)
    });
   }

  ngOnInit() {

  }
  design() {
    this.designer = !this.designer;
  }
  public get isdesigner() {
    return this.designer;
  }

  public get client_email()  {
    return this.clientForm.get('email');
  }

  public get client_password()  {
    return this.clientForm.get('password');
  }

  public get designer_email()  {
    return this.designerForm.get('designeremail');
  }

  public get designer_password()  {
    return this.designerForm.get('designerpassword');
  }

  public get designer_brand()  {
    return this.designerForm.get('designerbrand');
  }
  // get current state of password bool
  public get isShown() {
    return this.password;
  }
  // show password characters
  showpass() {
    this.password = !this.password;
    if (this.password) {
      document.getElementById('logpass').setAttribute('type', 'password');
      document.getElementById('logeye').innerHTML = 'show';
    } else {
      document.getElementById('logpass').setAttribute('type', 'text');
      document.getElementById('logeye').innerHTML = 'hide';
    }
  }
  userLogin() {
    const logInDetails = {email: this.client_email.value, password: this.client_password.value};
    this.userservice.postData(this.userservice.uri + '/user/login', logInDetails).subscribe(
      (res: Response) => {
        if (res.User && res.type !== 'Error') {
          localStorage.setItem('User', JSON.stringify(res.User));
          this.route.navigateByUrl('/home')
            .then(sm => console.log('routed' + sm));
        }
      }, (err: HttpErrorResponse) => {
        alert(err.error.Message);
      }
    );
  }

  designerLogin() {
    const logInDetails = {email: this.designer_email.value, password: this.designer_password.value, brand: this.designer_brand.value};
    this.userservice.postData(this.userservice.uri + '/designer/login', logInDetails).subscribe(
      (res: Response) => {
        if (res.User && res.type !== 'Error') {
          localStorage.setItem('User', JSON.stringify(res.User));
          this.route.navigateByUrl('/tailor/home/profile')
            .then(sm => console.log('routed' + sm));
        }
      }, (err: HttpErrorResponse) => {
        alert(err.error.Message);
      }
    );
  }
}
