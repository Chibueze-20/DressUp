import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {V} from '@angular/core/src/render3';
import {UserserviceService} from '../../userservice.service';
import {RequestserviceService} from '../../services/requestservice.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  localUrl: any;
  images: any[] = [];
  tags: string[] = [];
  RequestForm: FormGroup = null;
  constructor(private userservice: UserserviceService, private requestservice: RequestserviceService) {
    this.RequestForm = new FormGroup({
      'Tailor': new FormControl(null),
      'Title': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Type': new FormControl('Bid', [Validators.required, Validators.pattern('^Bid$|^Direct$')]),
      'Conditions': new FormGroup({
        'Fitness': new FormControl(null),
        'Delivery': new FormControl(null)
      }),
      'Schedule': new FormGroup({
        'Duration': new FormControl(null)
      })
    });
  }

  ngOnInit() {
  }

  get Tags() {
    return this.tags;
  }

  addTag(event) {
    const inputElement = (<HTMLInputElement>event.target);
    const value = inputElement.value;
    this.tags.push(value);
    event.target['value'] = '';
  }
  clearTags() {
    this.tags = [];
  }

  goback() {
    alert('go back');
  }
  get user() {
    return JSON.parse(localStorage.getItem('User'));
  }
  get show() {
    return JSON.stringify(this.RequestForm.value);
  }
  get isDirect() {
    return this.RequestForm.get('Type').value === 'Direct';
  }
  addImage(event: any) {
    if (event.target.files && event.target.files) {
      for ( let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
        this.images.unshift(event.target.result);
        // console.log(this.images);
      };
      reader.readAsDataURL(event.target.files[i]);
      }

    }
  }

  removeImage(i: number) {
    let temparr: any[];
    temparr = this.images;
    temparr = temparr.filter(image => this.images.indexOf(image) !== i);
    this.updatearr(temparr);
  }

  updatearr(imagearr: any[]) {
    this.images = imagearr;
  }

  get allimages() {
    return this.images;
  }

  uploadImages() {
    const arr_pic = [];
    for (let i = 0; i <  this.images.length; i++) {
      const  payload = {
        file: this.images[i],
        upload_preset: 'postdress',
        public_id: this.user._id + '/' + this.user.Role + '/' + this.images[i].toString().slice(0, 5)
      };
      this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
        .subscribe(
          (res) => {
            console.log(res);
            arr_pic.push(res);
          } , error1 => {
            console.log(error1);
          } );
    }
    return arr_pic;
  }

  SendRequest(withtags: boolean) {
    this.RequestForm.get('Tailor').setValue(this.user._id + '');
    const picture = this.uploadImages(); const default_pic: string[] = ['assets/images/pete-bellis-396528-unsplash.jpg'];
    let body;
    if (picture.length > 0) {
      body = withtags ? {
        request: this.RequestForm.value,
        pic: picture,
        tags: this.tags
      } : {
        request: this.RequestForm.value,
        pic: picture
      };
    } else {
      body = withtags ? {
        request: this.RequestForm.value,
        pic: default_pic,
        tags: this.tags
      } : {
        request: this.RequestForm.value,
        pic: default_pic
      };
    }
    this.requestservice.PostOrder(body, 'send').subscribe(
      (res) => {
        alert(JSON.stringify(res));
      }, err => {
        alert(err);
      }
    );
  }
}
