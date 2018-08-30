import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from '../shared/confirm-password.directive';
import {UserserviceService} from '../userservice.service';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  email = false;
  password = false;
  contact = true; name = true; brand = true;
  accountform = false; contactform = false; nameform = false;  brandform = false;
  settingsForm: FormGroup;
  constructor(private service: UserserviceService) {
    this.makeform();
  }

  ngOnInit() {
     // this.user = JSON.parse(localStorage.getItem('User'));
  }

  makeform() {
    this.settingsForm = new FormGroup({
      'Account': new FormGroup({
        'CurrentEmail': new FormControl(),
        'Email': new FormControl(null, Validators.email),
        'Password': new FormControl(null, [Validators.minLength(10), passwordValidator()]),
        'CurrentPassword': new FormControl(null)
      }),
      'Name': new FormGroup({
        'FirstName': new FormControl(null, Validators.minLength(3)),
        'MiddleName': new FormControl(null),
        'LastName': new FormControl(null, Validators.minLength(3))
      }),
      'Contact': new FormGroup({
        'State': new FormControl(null),
        'City': new FormControl(null),
        'HomeAddress': new FormControl(null),
        'PostAddress': new FormControl(null),
        'PhoneNumber': new FormControl(null)
      }),
      'Brand': new FormGroup({
        'BrandDescription': new FormControl(null),
        'WorkAddress': new FormControl(null)
      })
    });
  }
changeemail() {
    this.email = !this.email;
}
get User() {
  const user = JSON.parse(localStorage.getItem('User'));
   return user;
}
get UserEmail() {
    return this.User.Account.Email;
}
get Userid() {
    return this.User._id;
  }
changepassword() {
    this.password = !this.password;
}

get accountformbool() {
    return this.accountform;
}
get contactformbool() {
    return this.contactform;
}
get contactbool() {
    // alert(this.contact);
    return this.contact;
}
contacttoggle() {
    this.contact  = false;
}
get nameformbool() {
    return this.nameform;
}
get namebool() {
    return this.name;
}
nametoggle() {
    this.name = false;
}
get brandformbool() {
    return this.brandform;
}
get brandbool() {
    return this.brand;
}
brandtoggle() {
    this.brand = false;
}
get userRole() {
return this.User.Role;
}
updateAccountClick() {
     if (!this.accountformbool) {
       this.settingsForm.get('Account').get('CurrentEmail').setValue(this.UserEmail);
       this.accountform = true;
       this.service.postData(this.service.uri + '/update/account/' + this.Userid, this.settingsForm.get('Account').value)
         .subscribe( (res: Response) => {
           this.accountform = false;
           this.settingsForm.get('Account').reset();
         }, (err: HttpErrorResponse) => {
           alert(err.error.Message);
           this.accountform = false;
         });

     }
}
discardAccountUpdateclick() {
    this.email = false;
    this.nameform = false;
    this.settingsForm.get('Account').reset();
}
updateContactClick() {
    this.contactform = true;
  this.service.postData(this.service.uri + '/update/contact/' + this.Userid, this.settingsForm.get('Contact').value)
    .subscribe( (res: Response) => {
      this.contactform = false;
      this.settingsForm.get('Contact').reset();
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
      this.contactform = false;
    });
}
discardContactUpdateClick() {
    this.contact = true;
    this.settingsForm.get('Contact').reset();

}
updateNameClick() {
    this.nameform = true;
  this.service.postData(this.service.uri + '/update/names/' + this.Userid, this.settingsForm.get('Name').value)
    .subscribe( (res: Response) => {
      this.nameform = false;
      this.settingsForm.get('Contact').reset();
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
      this.nameform = false;
    });
  }
  discardNameUpdateClick() {
    this.name = true;
    this.settingsForm.get('Name').reset();
  }
updateBrandClick() {
    this.brandform = true;
  this.service.postData(this.service.uri + '/update/brand/' + this.Userid, this.settingsForm.get('Brand').value)
    .subscribe( (res: Response) => {
      this.brandform = false;
      this.settingsForm.get('Contact').reset();
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
      this.brandform = false;
    });

}
discardBrandUpdateClick() {
    this.brand = true;
    this.settingsForm.get('Brand').reset();
}
}
