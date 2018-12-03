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
  upload=false;dupload=false;
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
  get Upload(){return this.upload}
  get Dupload(){return this.dupload}
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

  async updateDisplay() {
    this.dupload=true; 
    let picture = null;
    const  payload = {
      file: this.localDisplayUrl,
      upload_preset: 'postdress',
    };
   await this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload).toPromise()
   .then((res:any)=>{
     picture = String(res.secure_url);
   })
   .catch((err)=> picture=null);
   console.log('http over');
    if (picture) {
      const body = {Display: picture};
      this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
        .subscribe(
          (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
          this.updateLocalStorage(this.details.Profile); this.dupload=false;},
          err => {window.toastr['error']('Update unsuccessful'); this.dupload=false;}
        );
    } else {
      window.toastr['error']('Update unsuccessful');
      this.dupload=false;
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
 async updateHeader() {
   this.upload=true;
    let picture = null;
    const  payload = {
      file: this.localHeaderUrl,
      upload_preset: 'postdress',
    };
   await this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload).toPromise()
   .then((res:any)=>{
     picture = String(res.secure_url);
   })
   .catch((err)=> picture=null);
   console.log('http over');
    if (picture) {
      const body = {Background: picture};
      this.userservice.postData(this.userservice.uri + '/profile/update/' + this.details.Profile._id, body)
        .subscribe(
          (res) => {this.details.Profile = res; window.toastr['success']('Update successful');
          this.updateLocalStorage(this.details.Profile); this.upload=false},
          err => {window.toastr['error']('Update unsuccessful'); this.upload=false;}
        );
    } else {
      window.toastr['error']('Update unsuccessful');
      this.upload=false
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
    };
    let url = null;
    this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
      .subscribe(
        (res:any) => {
          url = String(res.secure_url);
        } , error1 => {
          console.log(error1);
          url = null;
        } );
     return url 
  }

}
