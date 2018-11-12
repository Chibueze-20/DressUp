import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service';
import { UserserviceService } from '../../userservice.service';
import {MyWindow} from '../../shared/windowAlert';

declare let window:MyWindow;

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  localDisplayUrl = null;
  localHeaderUrl = null;
  localTags: any[] = [];
  details = null;
  constructor(public _settingsService: SettingsService, private userservice: UserserviceService) { }
  ngOnInit() {
    this.details = this.Tailor();
    this.localTags = this.details.Profile.Tags;
  }
  Tailor() {
    return JSON.parse(localStorage.getItem('User'));
  }
  get Details() {
    if (this.details) {
      return this.details;
    }
  }
  changeTheme(i) {
    this._settingsService.changeTheme(i);
  }
  updateTheme(theme) {
    const body = {Theme: theme.name};
    this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
      .subscribe(
        (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
          this.updateLocalStorage(this.details.Profile); },
        err => {window.toastr['error']('Update unsuccessful'); }
      );
  }
  previewDisplay(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readevent: any) => {
        this.localDisplayUrl = readevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeDisplay() {
    this.localDisplayUrl = null;
  }

  updateDisplay() {
    const picture = this.uploadImage(this.localDisplayUrl);
    if (picture) {
      const body = {Display: this.localDisplayUrl};
      this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
        .subscribe(
          (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
          this.updateLocalStorage(this.details.Profile); },
          err => {window.toastr['error']('Update unsuccessful'); }
        );
    } else {
      window.toastr['error']('Update unsuccessful');
    }
  }
  previewHeader(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readevent: any) => {
        this.localHeaderUrl = readevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeHeader() {
    this.localHeaderUrl = null;
  }
  updateLocalStorage(newProfile) {
    const tailor = this.Tailor();
    tailor.Profile = newProfile;
    localStorage.setItem('User', JSON.stringify(tailor));
  }
  updateHeader() {
    const picture = this.uploadImage(this.localHeaderUrl);
    if (picture) {
      const body = {Background: this.localHeaderUrl};
      this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
        .subscribe(
          (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
          this.updateLocalStorage(this.details.Profile); },
          err => {window.toastr['error']('Update unsuccessful'); }
        );
    } else {
      window.toastr['error']('Update unsuccessful');
    }
  }

  addTags(value: any) {
    if (this.localTags.length < 5) {
      this.localTags.push(value);
    } else {
      this.localTags.shift();
      this.localTags.push(value);
    }
  }

  updateTags() {
   const body = {Tags: this.localTags };
    this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
    .subscribe(
      (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
      this.updateLocalStorage(this.details.Profile); },
      err => {window.toastr['error']('Update unsuccessful'); }
    );
  }

  uploadImage(localUrl: any) {
    const  payload = {
      file: localUrl,
      upload_preset: 'postdress',
      public_id: this.Tailor()._id + '/' + this.Tailor().Role + '/' + localUrl.toString().slice(0, 5)
    };
    this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
      .subscribe(
        (res) => {
          return res;
        } , error1 => {
          console.log(error1);
          return null;
        } );
  }

}
