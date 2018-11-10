import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from '../shared/confirm-password.directive';
import {UserserviceService} from '../userservice.service';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import { MyWindow } from '../shared/windowAlert';

declare let window:MyWindow

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
get Account() {
    return this.settingsForm.get('Account');
}
get Name() {
    return this.settingsForm.get('Name');
}
get Contact() {
    return this.settingsForm.get('Contact');
}
get Brand() {
    return this.settingsForm.get('Brand');
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

get nameformbool() {
    return this.nameform;
}
get namebool() {
    return this.name;
}

get brandformbool() {
    return this.brandform;
}
get brandbool() {
    return this.brand;
}

get userRole() {
return this.User.Role;
}
updateAccountClick() {
     if (!this.accountformbool) {
       this.settingsForm.get('Account').get('CurrentEmail').setValue(this.UserEmail);
       this.accountform = true;
       this.service.postData(this.service.uri + '/update/account/' + this.Userid, this.settingsForm.get('Account').value)
         .subscribe( (res: any) => {
           this.accountform = false;
           this.settingsForm.get('Account').reset();
           localStorage.setItem('User', JSON.stringify(res));
           window.toastr['success']('update successfull');
         }, (err: HttpErrorResponse) => {
          //  alert(err.error.Message);
           this.accountform = false;
           window.toastr['error']('update unsuccessfull');
         });
       this.Account.get('Email').setValue(this.UserEmail);
     }
}
discardAccountUpdateclick() {
    this.password = false;
    this.accountform = false;
    this.settingsForm.get('Account').reset();
    this.Account.get('Email').setValue(this.UserEmail);
}
updateContactClick() {
  if (this.contactform === false) {
    this.contactform = true;
    this.service.postData(this.service.uri + '/update/contact/' + this.Userid, this.settingsForm.get('Contact').value)
      .subscribe( (res: any) => {
        this.contactform = false;
        localStorage.setItem('User', JSON.stringify(res));
        window.toastr['success']('update successfull');
      }, (err: HttpErrorResponse) => {
        // alert(err.error.Message);
        this.contactform = false;
        window.toastr['error']('update unsuccessfull');
      });
    this.settingsForm.get('Contact').setValue(this.User.Contact);
  }
}
discardContactUpdateClick() {
    this.contact = true;
    this.Contact.setValue(this.User.Contact);

}
updateNameClick() {
  if (this.nameform === false) {
    this.nameform = true;
    this.service.postData(this.service.uri + '/update/names/' + this.Userid, this.settingsForm.get('Name').value)
      .subscribe( (res: Response) => {
        this.nameform = false;
        localStorage.setItem('User', JSON.stringify(res));
        window.toastr['success']('update successfull');
      }, (err: HttpErrorResponse) => {
        // alert(err.error.Message);
        this.nameform = false;
        window.toastr['error']('update unsuccessfull');
      });
    this.Name.setValue(this.User.Name);
  }
  }
  discardNameUpdateClick() {
    this.name = true;
    this.Name.setValue(this.User.Name);
  }
updateBrandClick() {
  if (this.brandform === false) {
    this.brandform = true;
    this.service.postData(this.service.uri + '/update/brand/' + this.Userid, this.settingsForm.get('Brand').value)
      .subscribe( (res: any) => {
        this.brandform = false;
        localStorage.setItem('User', JSON.stringify(res));
        window.toastr['success']('update successfull');
      }, (err: HttpErrorResponse) => {
        // alert(err.error.Message);
        this.brandform = false;
        window.toastr['success']('update unsuccessfull');
      });
    this.Brand.setValue(this.User.Brand);
  }

}
discardBrandUpdateClick() {
    this.brand = true;
    this.Brand.setValue(this.User.Brand);
}
}
