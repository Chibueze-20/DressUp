import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  clientForm: FormGroup;
  designerForm: FormGroup;
  designer = false;
  constructor( private userservice: UserserviceService) {

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

  userLogin() {
    const logInDetails = {email: this.client_email.value, password: this.client_password.value};
    this.userservice.userLogin(logInDetails);
  }

  designerLogin() {
    const logInDetails = {email: this.designer_email.value, password: this.designer_password.value, brand: this.designer_brand.value};
    this.userservice.designerLogin(logInDetails);
  }
}
