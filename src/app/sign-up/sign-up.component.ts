import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './confirm-password.directive';
import { UserserviceService } from '../userservice.service';
=======
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
<<<<<<< HEAD



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

  constructor( private userservice: UserserviceService) {
    // initialize reactive form
    this.signUpForm = new FormGroup({
      'role' : new FormControl('...', Validators.pattern('^Clients$|^Designers$')),
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
=======
export class SignUpComponent implements OnInit {
  currentnum: any;
  canprev: Boolean;
  cannext: Boolean;
  cansubmit: Boolean;
  constructor() { }

  ngOnInit() {
    this.currentnum = 0; // Current tab is set to be the first tab (0)
    this.show(); // Display the current tab
  }

  show(): void {
    if (this.currentnum === 0) {
      this.canprev = false;
      this.cannext = true;
      this.cansubmit = false;
    } else if (this.currentnum >= 1 && this.currentnum <= 2) {
      this.canprev = true;
      this.cannext = true;
      this.cansubmit = false;
    } else {
      this.cansubmit = true;
      this.canprev = false;
      this.cannext = false;
    }
  }
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e
  next(): void {
    this.currentnum = this.currentnum + 1;
    this.show();
  }
<<<<<<< HEAD
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
      } else {
        signUpDetails = { Role: this.realRole(this.getrole.value),
                          Contact: {State: this.getaddress.value},
                          Account: {
                                    Email: this.getaccount.get('email').value,
                                    Password: this.getaccount.get('password').value
                                    }
                        };
      }
    this.userservice.addUser(signUpDetails);
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


=======
  prev(): void {
    this.currentnum = this.currentnum - 1;
    this.show();
  }
// function showTab(n: any) {
//   // This function will display the specified tab of the form ...
//   var x = document.getElementsByClassName("tab");
//   x[n].style.display = "block";
//   // ... and fix the Previous/Next buttons:
//   if (n == 0) {
//     document.getElementById("prevBtn").style.display = "none";
//   } else {
//     document.getElementById("prevBtn").style.display = "inline";
//   }
//   if (n == (x.length - 1)) {
//     document.getElementById("nextBtn").innerHTML = "Submit";
//   } else {
//     document.getElementById("nextBtn").innerHTML = "Next";
//   }
//   // ... and run a function that displays the correct step indicator:
//   fixStepIndicator(n)
// }

// function nextPrev(n : Number) {
//   // This function will figure out which tab to display
//   var x = document.getElementsByClassName("tab");
//   // Exit the function if any field in the current tab is invalid:
//   if (n == 1 && !validateForm()) return false;
//   // Hide the current tab:
//   x[this.currentTab].style.display = "none";
//   // Increase or decrease the current tab by 1:
//   this.currentTab = this.currentTab + n;
//   // if you have reached the end of the form... :
//   if (this.currentTab >= x.length) {
//     //...the form gets submitted:
//     document.getElementById("regForm").submit();
//     return false;
//   }
//   // Otherwise, display the correct tab:
//   showTab(this.currentTab);
// }

// function validateForm() {
//   // This function deals with validation of the form fields
//   var x, y, i, valid = true;
//   x = document.getElementsByClassName("tab");
//   y = x[this.currentTab].getElementsByTagName("input");
//   // A loop that checks every input field in the current tab:
//   for (i = 0; i < y.length; i++) {
//     // If a field is empty...
//     if (y[i].value == "") {
//       // add an "invalid" class to the field:
//       y[i].className += " invalid";
//       // and set the current valid status to false:
//       valid = false;
//     }
//   }
//   // If the valid status is true, mark the step as finished and valid:
//   if (valid) {
//     document.getElementsByClassName("step")[this.currentTab].className += " finish";
//   }
//   return valid; // return the valid status
// }

// function fixStepIndicator(n : Number) {
//   // This function removes the "active" class of all steps...
//   var i, x = document.getElementsByClassName("step");
//   for (i = 0; i < x.length; i++) {
//     x[i].className = x[i].className.replace(" active", "");
//   }
//   //... and adds the "active" class to the current step:
//   x[n].className += " active";
// }
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e
}
