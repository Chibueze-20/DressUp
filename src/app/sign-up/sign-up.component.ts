import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/confirm-password.directive';
import { UserserviceService } from '../userservice.service';
import { MyWindow } from '../shared/windowAlert';
import {  Router } from '@angular/router';

declare let window:MyWindow;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})



export class SignUpComponent implements OnInit {
  // toggle password characters
  password = false;
  // track submission of brand form section
   welcome = false;
   // track current step in sign up flow
  currentnum: any;
  // track if next button is active
  cannext: Boolean;
  // track if submit button is active
  cansubmit: Boolean;
  // the whole reactive form
  signUpForm: FormGroup;
  // the role of the prospective user
  public static Role:string = 'select one'

  constructor( private userservice: UserserviceService,private Navigation:Router) {
    // initialize reactive form
    this.signUpForm = new FormGroup({
      'role' : new FormControl(SignUpComponent.Role, Validators.pattern('^Clients$|^Designers$')),
      'state': new FormControl('Choose state', Validators.pattern('^Abuja$|^Ibadan$|^Lagos$|^Kaduna$')),
      'account': new FormGroup({
        'email': new FormControl(null, [Validators.email, Validators.required] ),
        'password': new FormControl(null, [Validators.required, Validators.minLength(10), passwordValidator()])
      }),
      'brand': new FormGroup({
        'workAddress': new FormControl(null, Validators.minLength(10)),
        'brandName': new FormControl(null, Validators.minLength(3))
      })
    });
  }

  ngOnInit() {

    this.currentnum = 0; // Current tab is set to be the first tab (0)
    this.show(); // Display the current tab
    // this.passwordElement = document.getElementById('password');
  }
// toggle states of prev, next and submit buttons based on cuurent steps in flow
  show(): void {
    if (this.currentnum === 0) {
      this.cannext = true;
      this.cansubmit = false;
    } else {
      this.done();
      this.cansubmit = true;
      this.cannext = false;
    }
  }
  // to go to next flow
  next(): void {
    this.currentnum = this.currentnum + 1;
    this.show();
  }
// show password characters
  showpass() {
    this.password = !this.password;
    if (this.password) {
      document.getElementById('pass').setAttribute('type', 'password');
      document.getElementById('eye').innerHTML = 'show';
    } else {
      document.getElementById('pass').setAttribute('type', 'text');
      document.getElementById('eye').innerHTML = 'hide';
    }
  }
  // get current state of password bool
  public get isShown() {
    return this.password;
  }
// for submitting the brand section of the form
  done() {
    this.welcome = true;
  }
  // transform role to designer or user
  realRole(role: any) {
    if (role === 'Clients') {
      return 'Designer';
    } else if (role === 'Designers') {
      return 'User';
    }
  }
  // to submit form
  addUser() {
    let signUpDetails;
      if (this.getbrand.get('workAddress').value !== null && this.getbrand.get('brandName').value !== null) {
      signUpDetails = { Role: this.realRole(this.getrole.value),
                        Contact: {State: this.getaddress.value},
                        Account: {
                                  Email: this.getaccount.get('email').value,
                                  Password: this.getaccount.get('password').value
                                  },
                        Brand: {
                                BrandName: this.getbrand.get('brandName').value,
                                WorkAddress: this.getbrand.get('workAddress').value
                                }
                      };
        this.userservice.postData(this.userservice.uri + '/designer/new', signUpDetails)
          .subscribe(
            (res) => {window.toastr["success"]("Welcome to the DressUp community"); this.Navigation.navigateByUrl('/login') }, 
            error1 => {window.toastr["error"]("Trouble signing you up"); alert(error1);}
          );
      } else {
        signUpDetails = { Role: this.realRole(this.getrole.value),
                          Contact: {State: this.getaddress.value},
                          Account: {
                                    Email: this.getaccount.get('email').value,
                                    Password: this.getaccount.get('password').value
                                    }
                        };
        this.userservice.postData(this.userservice.uri + '/user/new', signUpDetails)
          .subscribe(
            (res) => {window.toastr["success"]("Welcome to the DressUp community"); this.Navigation.navigateByUrl('/login') },
            error1 => {window.toastr["error"]("Trouble signing you up"); alert(error1); }
          );
      }
      return;

  }
  // checks if the sign up form is currently filled as a seller
 public get isbuyer() {return this.signUpForm.get('role').value === 'Clients'; }

public get signup() {return this.signUpForm; }

// gets the role form control
 public get getrole() {
   return this.signUpForm.get('role');
 }

// gets the account form control  [group]
 public get getaccount() {
  return this.signUpForm.get('account');
 }
// gets the state form control
 public get getaddress() {
  return this.signUpForm.get('state');
 }
// gets the brand form control [group]
  public get getbrand() {
    return this.signUpForm.get('brand');
  }

  // true when the brand form section has no values
 public get brandvalid() {
    return this.signUpForm.get('brand').get('workAddress').value === null || this.signUpForm.get('brand').get('brandName').value === null;
 }

 // check if brand form values have something
  public get haschar() {
    const name = '' + this.getbrand.get('brandName').value;
    const location = '' + this.getbrand.get('workAddress').value;
    return name.length > 0 && location.length > 0;
  }

 // true when the role is seller{clients} and either the brand form section is empty or it has not been submitted
 public  get sellervalid() {
    return this.isbuyer && (this.brandvalid);
 }
 // to toggle the disabled class in next button
 public get activate() {
   switch (this.currentnum) {
     case 0:
       if (this.signup.valid) {
         return !this.sellervalid;
       }
       break;
   }
   return false;
 }
 // to check if a flow is completely filled correctly and controls state of indicators
  validate(n: any) {
    switch (n) {
      case 0:
      if (this.signup.valid) {
        return !this.sellervalid;
      }
      break;
    }
    return false;
  }


}
