import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
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
  next(): void {
    this.currentnum = this.currentnum + 1;
    this.show();
  }
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
}
