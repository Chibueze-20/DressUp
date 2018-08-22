import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  email = false;
  password = false;

  constructor() {
  }

  ngOnInit() {
  }

changeemail() {
    this.email = !this.email;
}

changepassword() {
    this.password = !this.password;
}

}
